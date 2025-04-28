import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./CalendarStyles.css";

interface CalendarPickerProps {
    dateRange: Range[];
    handleSelect: (ranges: any) => void;
    selectedLocale: Locale;
    disabledDates?: Date[];
}

export const CalendarPicker = ({
    dateRange,
    handleSelect,
    selectedLocale,
    disabledDates,
}: CalendarPickerProps) => {
    return (
        <div className="flex justify-center bg-gray-50">
            <DateRange
                ranges={dateRange}
                onChange={handleSelect}
                minDate={new Date()}
                rangeColors={["#3b82f6"]}
                locale={selectedLocale}
                disabledDates={disabledDates}
            />
        </div>
    );
};
