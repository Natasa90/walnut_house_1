import { Link, useLocation } from "react-router-dom";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";

export const Navbar = () => {

const { t } = useTranslation();
    const location = useLocation();

    const links = [
        { name: t("navbar.home"), path: "/" },
        { name: t("navbar.about"), path: "/about-us" },
        { name: t("navbar.gallery"), path: "/gallery" },
        { name: t("navbar.booking"), path: "/booking" },
        { name: t("navbar.contact"), path: "/contact" },
    ];

    return (
        <nav className="bg-[#dfd3c3] p-4 shadow-sm">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`relative text-lg font-semibold ${
                                location.pathname === link.path
                                    ? "text-[#494949]"
                                    : "text-[#494949]"
                            } hover:text-[#596e79] transition-colors duration-300`}
                        >
                            {link.name}
                            {location.pathname === link.path && (
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#494949]"></span>
                            )}
                        </Link>
                    ))}
                    <LanguageSwitcher />
                </div>
            </div>
        </nav>
    );
};
