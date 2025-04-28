import { useTranslation } from "react-i18next";

export const AboutUsPage = () => {
    const { t } = useTranslation();
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-[#6892d5]">{t('about-us')}</h1>
        </div>
    );
};
