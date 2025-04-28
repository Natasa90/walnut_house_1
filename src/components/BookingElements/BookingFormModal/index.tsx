import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';
import { supabase } from '@/lib/supabase';

interface BookingFormModalProps {
  dateRange: { startDate: Date; endDate: Date }; 
  onClose: () => void;
}

interface FormValues {
  fullName: string;
  email?: string;
  phone: string;
  message?: string;
}

export const BookingFormModal = ({ dateRange, onClose }: BookingFormModalProps) => {
  const initialValues: FormValues = {
    fullName: '',
    email: '',
    phone: '',
    message: '',
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email address').nullable(),
    phone: Yup.string().required('Phone number is required'),
    message: Yup.string().nullable(),
  });

  const handleSubmit = async (values: FormValues) => {
    const { data, error } = await supabase.from('bookings').insert([
      {
        full_name: values.fullName,
        email: values.email,
        phone: values.phone,
        message: values.message,
        start_date: dateRange.startDate,
        end_date: dateRange.endDate,
      },
    ]);

    if (error) {
      console.error('Error inserting booking:', error);
      alert('Booking failed. Please try again.');
    } else {
      console.log('Booking successful:', data);
      alert('Booking successful!');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Booking Details</h2>

        <div className="mb-6 text-center text-gray-700">
          <div>
            <strong>From:</strong> {format(dateRange.startDate, 'yyyy-MM-dd')}
          </div>
          <div>
            <strong>To:</strong> {format(dateRange.endDate, 'yyyy-MM-dd')}
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div>
              <label className="block mb-1">Full Name*</label>
              <Field name="fullName" className="input" />
              <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1">Email</label>
              <Field name="email" type="email" className="input" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1">Phone*</label>
              <Field name="phone" className="input" />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block mb-1">Message</label>
              <Field name="message" as="textarea" className="input" rows={3} />
              <ErrorMessage name="message" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex justify-between items-center mt-6">
              <button
                type="button"
                className="px-4 py-2 bg-gray-400 text-white rounded"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2 bg-[#596e79] hover:bg-[#596e45] text-white rounded"
              >
                Book
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
