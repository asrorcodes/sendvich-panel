"use client";

import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import {
  buildInternationalPhone,
  defaultPhoneCountryId,
  formatNationalNumber,
  getPhoneCountry,
  isValidNationalNumber,
  phoneCountries,
} from "@/lib/phone-countries";

type Props = {
  disabled?: boolean;
  required?: boolean;
};

export function PhoneField({ disabled = false, required = true }: Props) {
  const t = useTranslations("contactForm");
  const inputId = useId();
  const nationalRef = useRef<HTMLInputElement>(null);
  const [countryId, setCountryId] = useState(defaultPhoneCountryId);
  const [nationalDigits, setNationalDigits] = useState("");

  const country = getPhoneCountry(countryId);
  const formatted = formatNationalNumber(nationalDigits, country.groups);
  const isComplete = isValidNationalNumber(country, nationalDigits);
  const fullPhone =
    isComplete && nationalDigits
      ? buildInternationalPhone(country, nationalDigits)
      : "";

  useEffect(() => {
    const form = nationalRef.current?.form;
    if (!form) return;

    const onReset = () => {
      setCountryId(defaultPhoneCountryId);
      setNationalDigits("");
    };

    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, []);

  function onCountryChange(nextId: string) {
    setCountryId(nextId);
    setNationalDigits("");
    nationalRef.current?.focus();
  }

  function onNationalChange(raw: string) {
    const digits = raw.replace(/\D/g, "").slice(0, country.digits);
    setNationalDigits(digits);
  }

  return (
    <div className="field phone-field">
      <span className="field__label" id={`${inputId}-label`}>
        {t("phone")}
      </span>

      <div className="phone-field__row">
        <select
          className="field__input phone-field__country"
          value={countryId}
          onChange={(event) => onCountryChange(event.target.value)}
          disabled={disabled}
          aria-label={t("phoneCountry")}
        >
          {phoneCountries.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>

        <input
          ref={nationalRef}
          id={inputId}
          className="field__input phone-field__number"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder={country.placeholder}
          value={formatted}
          onChange={(event) => onNationalChange(event.target.value)}
          disabled={disabled}
          required={required}
          aria-labelledby={`${inputId}-label`}
          aria-invalid={nationalDigits.length > 0 && !isComplete}
        />
      </div>

      <input type="hidden" name="phone" value={fullPhone} />
    </div>
  );
}
