import { useTranslation } from "react-i18next";
import { setLang } from "@/i18n";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage?.slice(0,2) || "no";
  const btn = (lng: "pl"|"en"|"no", label: string) => (
    <button
      key={lng}
      onClick={() => setLang(lng)}
      style={{
        padding: "6px 10px", borderRadius: 8, border: "1px solid #ddd",
        background: current===lng ? "#f0f6ff" : "white", cursor: "pointer", fontSize: 12
      }}
      aria-pressed={current===lng}
    >
      {label}
    </button>
  );
  return (
    <div style={{ display:"flex", gap:8 }}>
      {btn("pl","PL")}{btn("en","EN")}{btn("no","NO")}
    </div>
  );
}