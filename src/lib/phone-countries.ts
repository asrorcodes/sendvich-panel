export type PhoneCountry = {
  id: string;
  dial: string;
  label: string;
  digits: number;
  groups: number[];
  placeholder: string;
};

/** O‘rta Osiyo va qo‘shni bozorlar uchun telefon formatlari */
export const phoneCountries: PhoneCountry[] = [
  {
    id: "uz",
    dial: "998",
    label: "+998",
    digits: 9,
    groups: [2, 3, 2, 2],
    placeholder: "90 123 45 67",
  },
  {
    id: "kz",
    dial: "7",
    label: "+7",
    digits: 10,
    groups: [3, 3, 2, 2],
    placeholder: "701 234 56 78",
  },
  {
    id: "kg",
    dial: "996",
    label: "+996",
    digits: 9,
    groups: [3, 3, 3],
    placeholder: "555 123 456",
  },
  {
    id: "tj",
    dial: "992",
    label: "+992",
    digits: 9,
    groups: [2, 3, 4],
    placeholder: "91 234 5678",
  },
  {
    id: "tm",
    dial: "993",
    label: "+993",
    digits: 8,
    groups: [2, 2, 2, 2],
    placeholder: "65 12 34 56",
  },
];

export const defaultPhoneCountryId = "uz";

export function getPhoneCountry(id: string) {
  return phoneCountries.find((c) => c.id === id) ?? phoneCountries[0];
}

export function formatNationalNumber(digits: string, groups: number[]) {
  const parts: string[] = [];
  let index = 0;

  for (const size of groups) {
    if (index >= digits.length) break;
    parts.push(digits.slice(index, index + size));
    index += size;
  }

  if (index < digits.length) {
    parts.push(digits.slice(index));
  }

  return parts.join(" ");
}

export function buildInternationalPhone(country: PhoneCountry, nationalDigits: string) {
  return `+${country.dial}${nationalDigits}`;
}

export function isValidNationalNumber(country: PhoneCountry, nationalDigits: string) {
  return nationalDigits.length === country.digits;
}

export function parseInternationalPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const country = [...phoneCountries]
    .sort((a, b) => b.dial.length - a.dial.length)
    .find((item) => digits.startsWith(item.dial));

  if (!country) return null;

  const national = digits.slice(country.dial.length);
  if (!isValidNationalNumber(country, national)) return null;

  return {
    country,
    national,
    e164: `+${country.dial}${national}`,
  };
}
