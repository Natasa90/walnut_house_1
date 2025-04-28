import { supabase } from '@/lib/supabase';

export const getBookedDates = async () => {
  const { data, error } = await supabase
    .from('bookings')
    .select('start_date, end_date');

  if (error) {
    console.error('Error fetching booked dates:', error);
    return [];
  }

  return data || [];
};
