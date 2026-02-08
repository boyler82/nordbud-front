import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ContactSection() {
  const { t, i18n } = useTranslation();
  const [status, setStatus] = useState<"idle"|"loading"|"sent"|"error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget as typeof e.currentTarget & {
      name: { value: string };
      email: { value: string };
      phone: { value: string };
      message: { value: string };
      consent: { checked: boolean };
      website: { value: string }; // honeypot
    };

    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim(),
      consent: form.consent.checked,
      website: form.website.value,             // honeypot — backend to sprawdza
      lang: i18n.resolvedLanguage ?? "pl",     // opcjonalnie: do tematu maila
    };

    try {
      const res = await fetch(
        (import.meta.env.VITE_API_URL || "http://localhost:8080") + "/api/lead",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        setStatus("sent");
        // wyczyść formularz
        form.name.value = "";
        form.email.value = "";
        form.phone.value = "";
        form.message.value = "";
        form.consent.checked = false;
        form.website.value = ""; // honeypot (i tak niewidoczne)
      } else {
        // 400 (brak zgody), 429 (rate-limit) itp.
        const err = await res.json().catch(() => ({}));
        alert(err.error || t("contact.error"));
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <section id="kontakt" className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-3xl border bg-white/60 backdrop-blur p-6 sm:p-8">
        <h1 className="text-3xl font-bold">{t("contact.heading")}</h1>
        <p className="mt-4 text-gray-600">
          {t("contact.emailText")}{" "}
          <a href="mailto:post@valheimbygg.no" className="text-brand-600">
            post@valheimbygg.no
          </a>
        </p>
        <p className="mt-2 text-gray-600">
          {t("contact.phoneText")}{" "}
          <a href="tel:+4747729371" className="text-brand-600">
            +47 477 293 71
          </a>
        </p>
        <p className="mt-2 text-gray-600">
          {t("contact.addressText")}{" "}
          <span>Vårvegen 3, 9023 Krokelvdalen</span>
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4" noValidate>
        <input
          name="name"
          placeholder={t("contact.name")!}
          required
          className="rounded-xl border p-3"
          aria-label={t("contact.name")!}
        />
        <input
          name="email"
          type="email"
          placeholder={t("contact.email")!}
          required
          className="rounded-xl border p-3"
          aria-label={t("contact.email")!}
        />
        <input
          name="phone"
          placeholder={t("contact.phone")!}
          className="rounded-xl border p-3"
          aria-label={t("contact.phone")!}
        />
        <textarea
          name="message"
          placeholder={t("contact.message")!}
          required
          className="min-h-[120px] rounded-xl border p-3"
          aria-label={t("contact.message")!}
        />

        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="consent" required />
          <span>{t("contact.consent")}</span>
        </label>

        {/* HONEYPOT — ukryte pole, zawsze puste */}
        <input
          type="text"
          name="website"
          defaultValue=""
          readOnly
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-10000px",
            top: "auto",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-xl bg-brand-500 px-5 py-3 font-medium text-white hover:bg-brand-600 disabled:opacity-60"
        >
          {status === "loading" ? t("contact.sending") ?? "Wysyłanie..." : t("contact.send")}
        </button>

        {status === "sent" && (
          <p className="text-sm text-green-700">{t("contact.sent")}</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-700">{t("contact.error")}</p>
        )}
        </form>
      </div>
    </section>
  );
}
