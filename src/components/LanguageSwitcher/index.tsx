import Select, { SingleValue, StylesConfig } from 'react-select';
import { useTranslation } from 'react-i18next';

type LanguageOption = {
  value: string;
  label: string;
};

const languageOptions: LanguageOption[] = [
  { value: 'sr', label: '🇷🇸 Srpski' },
  { value: 'ru', label: '🇷🇺 Русский' },
  { value: 'en', label: '🇺🇸 English' }
];

const customStyles: StylesConfig<LanguageOption> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#eee' : 'white',
    minWidth: 150,
    margin: '0 10px',
    borderRadius: '10px',
    fontSize: '1rem',
  }),
  singleValue: (base) => ({
    ...base,
    display: 'flex',
    alignItems: 'center',
  }),
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChange = (selectedOption: SingleValue<LanguageOption>) => {
    if (selectedOption) {
      i18n.changeLanguage(selectedOption.value);
    }
  };

  return (
    <Select<LanguageOption>
      options={languageOptions}
      defaultValue={languageOptions[0]}
      onChange={handleChange}
      styles={customStyles}
    />
  );
};

export default LanguageSwitcher;
