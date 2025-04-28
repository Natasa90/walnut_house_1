import { useTranslation } from "react-i18next";
import { ContactForm } from "../components/ContactForm"

export const ContactPage = () => {

  const { t } = useTranslation(); 

    return (
        <div className="p-8">
            <ContactForm />
        </div>
    );
};
