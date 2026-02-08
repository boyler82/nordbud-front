import { useTranslation } from "react-i18next";
import Logo from "@/components/Logo";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t py-10 text-center text-sm text-gray-500">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mb-6 rounded-2xl border bg-white/70 px-4 py-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://www.facebook.com/profile.php?id=61587799199529"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="inline-flex h-14 w-14 items-center justify-center rounded-full border transition hover:bg-gray-50 hover:scale-105"
          >
            <img
              src="https://api.iconify.design/simple-icons/facebook.svg?color=%231877F2"
              alt=""
              className="h-7 w-7"
              loading="lazy"
              decoding="async"
            />
          </a>
          <a href="#" aria-label="Instagram" className="inline-flex h-14 w-14 items-center justify-center rounded-full border transition hover:bg-gray-50 hover:scale-105">
            <img
              src="https://api.iconify.design/simple-icons/instagram.svg?color=%23E4405F"
              alt=""
              className="h-7 w-7"
              loading="lazy"
              decoding="async"
            />
          </a>
          <a href="#" aria-label="X" className="inline-flex h-14 w-14 items-center justify-center rounded-full border transition hover:bg-gray-50 hover:scale-105">
            <img
              src="https://api.iconify.design/simple-icons/x.svg?color=%23000000"
              alt=""
              className="h-7 w-7"
              loading="lazy"
              decoding="async"
            />
          </a>
          <a href="#" aria-label="LinkedIn" className="inline-flex h-14 w-14 items-center justify-center rounded-full border transition hover:bg-gray-50 hover:scale-105">
            <img
              src="https://api.iconify.design/simple-icons/linkedin.svg?color=%230A66C2"
              alt=""
              className="h-7 w-7"
              loading="lazy"
              decoding="async"
            />
          </a>
          <a href="#" aria-label="YouTube" className="inline-flex h-14 w-14 items-center justify-center rounded-full border transition hover:bg-gray-50 hover:scale-105">
            <img
              src="https://api.iconify.design/simple-icons/youtube.svg?color=%23FF0000"
              alt=""
              className="h-7 w-7"
              loading="lazy"
              decoding="async"
            />
          </a>
          <a href="#" aria-label="TikTok" className="inline-flex h-14 w-14 items-center justify-center rounded-full border transition hover:bg-gray-50 hover:scale-105">
            <img
              src="https://api.iconify.design/simple-icons/tiktok.svg?color=%23000000"
              alt=""
              className="h-7 w-7"
              loading="lazy"
              decoding="async"
            />
          </a>
        </div>
      </div>
        <div className="mb-3 flex justify-center">
          <Logo height={90} />
        </div>
        © {year} Valheimbygg. {t("footer.rights")}
      </div>
    </footer>
  );
}
