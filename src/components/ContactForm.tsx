"use client";

import { useLocale, useTranslations } from "next-intl";
import { FormEvent, useState } from "react";
import { PhoneField } from "@/components/PhoneField";
import { parseInternationalPhone } from "@/lib/phone-countries";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contactForm");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const phone = String(data.get("phone") ?? "");
    const parsed = parseInternationalPhone(phone);

    if (!parsed) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: parsed.e164,
          message: data.get("message"),
          locale,
          pageUrl: window.location.href,
          website: data.get("website"),
        }),
      });

      if (!response.ok) throw new Error("request_failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="contact-form" noValidate>
      <label className="field">
        <span className="field__label">{t("name")}</span>
        <input
          className="field__input"
          type="text"
          name="name"
          autoComplete="name"
          required
          disabled={status === "loading"}
        />
      </label>

      <PhoneField disabled={status === "loading"} />

      <label className="field">
        <span className="field__label">{t("message")}</span>
        <textarea
          className="field__input field__input--area"
          name="message"
          rows={4}
          required
          disabled={status === "loading"}
        />
      </label>

      <label className="sr-only" aria-hidden="true">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <button
        type="submit"
        className="btn btn-primary btn-block w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? t("sending") : t("submit")}
      </button>

      {status === "success" && (
        <p className="contact-form__status contact-form__status--success" role="status">
          {t("success")}
        </p>
      )}
      {status === "error" && (
        <p className="contact-form__status contact-form__status--error" role="alert">
          {t("error")}
        </p>
      )}
    </form>
  );
}
