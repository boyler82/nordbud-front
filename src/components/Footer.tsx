import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t py-10 text-center text-sm text-gray-500">
      © {year} Nordbud. {t("footer.rights")}
    </footer>
  );
}