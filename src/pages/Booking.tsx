import { srLatn } from "date-fns/locale";
import enUS from "date-fns/locale/en-US";
import ru from "date-fns/locale/ru";
import { useState, useEffect } from "react";
import { addDays } from "date-fns";
import { useTranslation } from "react-i18next";
import { CalendarPicker } from "@/components/BookingElements/CalendarPicker";
import { BookingFormModal } from "@/components/BookingElements/BookingFormModal";
import { getBookedDates } from "@/lib/helpers/getBookedDates";

export const BookingPage = () => {
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection",
        },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [disabledDates, setDisabledDates] = useState<Date[]>([]);
    const [refreshBookings, setRefreshBookings] = useState(false);


    const { t, i18n } = useTranslation();

    const handleSelect = (ranges: any) => {
        setDateRange([ranges.selection]);
    };

    const localeMap: { [key: string]: Locale } = {
        en: enUS,
        sr: srLatn,
        ru: ru,
    };

    const selectedLocale = localeMap[i18n.language] || enUS;

    useEffect(() => {
        const fetchBookedDates = async () => {
            const data = await getBookedDates();

            const blockedDates = data.flatMap((booking) => {
                const start = new Date(booking.start_date);
                const end = new Date(booking.end_date);

                const datesBetween = [];
                let current = new Date(start);
                while (current <= end) {
                    datesBetween.push(new Date(current));
                    current.setDate(current.getDate() + 1); 
                }
                return datesBetween;
            });

            setDisabledDates(blockedDates);
        };

        fetchBookedDates();
    }, []);

    return (
        <div className="flex flex-col items-center p-8">
            <h1 className="text-2xl font-bold mb-6">
                {t("booking.selectDates")}
            </h1>

            <CalendarPicker
                dateRange={dateRange}
                handleSelect={handleSelect}
                selectedLocale={selectedLocale}
                disabledDates={disabledDates}
            />

            <button
                className="mt-6 px-6 py-3 rounded-xl bg-[#596e79] hover:bg-[#596e45] text-white disabled:bg-gray-900"
                disabled={!dateRange[0].startDate || !dateRange[0].endDate}
                onClick={() => setIsModalOpen(true)}
            >
                {t("booking.book")}
            </button>
            {isModalOpen && (
                <BookingFormModal
                    dateRange={dateRange[0]}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};
