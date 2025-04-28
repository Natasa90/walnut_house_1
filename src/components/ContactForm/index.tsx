import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "react-i18next";

export const ContactForm = () => {
    const { t } = useTranslation();

    const validationSchema = Yup.object({
        fullName: Yup.string().required(t("contactForm.requiredFullname")),
        email: Yup.string()
            .email(t("contactForm.invalidEmail"))
            .required(t("contactForm.requiredEmail")),
        phone: Yup.string().required(t("contactForm.requiredPhone")),
        message: Yup.string().required(t("contactForm.requiredMessage")),
    });

    const handleSubmit = async (
        values: any,
        { resetForm }: { resetForm: () => void }
    ) => {
        try {
            const { data, error } = await supabase.from("inquiries").insert([
                {
                    name: values.fullName,
                    email: values.email,
                    phone: values.phone,
                    message: values.message,
                },
            ]);

            if (error) {
                throw error;
            }

            alert(t("contactForm.successMessage"));
            resetForm();
        } catch (error) {
            alert(t("contactForm.errorMessage"));
        }
    };

    return (
        <div className="bg-[#dfd3c3] p-6 rounded-2xl space-y-4 w-11/12 md:w-1/2 mx-auto">
            <p className="text-xl font-semibold text-[#596e79] mb-2">
                {t("contactForm.contactUs")}
            </p>
            <Formik
                initialValues={{
                    fullName: "",
                    email: "",
                    phone: "",
                    message: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        <div>
                            <Field
                                type="text"
                                name="fullName"
                                placeholder={t("contactForm.fullName")}
                                className="bg-[#f0ece2] p-4 rounded-xl text-gray-700 w-full"
                            />
                            <ErrorMessage
                                name="fullName"
                                component="div"
                                className="text-red-500 text-xs mt-1"
                            />
                        </div>

                        <div>
                            <Field
                                type="email"
                                name="email"
                                placeholder={t("contactForm.email")}
                                className="bg-[#f0ece2] p-4 rounded-xl text-gray-700 w-full"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-xs mt-1"
                            />
                        </div>

                        <div>
                            <Field
                                type="text"
                                name="phone"
                                placeholder={t("contactForm.phone")}
                                className="bg-[#f0ece2] p-4 rounded-xl text-gray-700 w-full"
                            />
                            <ErrorMessage
                                name="phone"
                                component="div"
                                className="text-red-500 text-xs mt-1"
                            />
                        </div>

                        <div>
                            <Field
                                as="textarea"
                                name="message"
                                placeholder={t("contactForm.message")}
                                className="bg-[#f0ece2] p-4 rounded-xl text-gray-700 h-28 text-start w-full"
                            />
                            <ErrorMessage
                                name="message"
                                component="div"
                                className="text-red-500 text-xs mt-1"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#596e79] hover:bg-[#596e45] p-4 rounded-xl w-full"
                        >
                            <p className="text-center text-white font-semibold text-lg">
                                {isSubmitting
                                    ? t("contactForm.sendingButton")
                                    : t("contactForm.submitButton")}
                            </p>
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
