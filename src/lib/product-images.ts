import type { ProductSlug } from "@/lib/site";

export type ProductImage = {
  src: string;
  label: "EPS" | "Bazalt";
};

const wallImages: ProductImage[] = [
  { src: "/products/devor-eps.png", label: "EPS" },
  { src: "/products/devor-bazalt.png", label: "Bazalt" },
];

const roofImages: ProductImage[] = [
  { src: "/products/tom-eps.png", label: "EPS" },
  { src: "/products/tom-bazalt.png", label: "Bazalt" },
];

/** Product page / datasheet visuals — matched by panel type. */
export const productImages: Partial<Record<ProductSlug, ProductImage[]>> = {
  "devor-paneli": wallImages,
  "tom-paneli": roofImages,
  "z-lock": wallImages,
  "sovuq-ombor": wallImages,
  "tovuqxona-paneli": wallImages,
};

export function getProductImages(slug: string): ProductImage[] {
  return productImages[slug as ProductSlug] ?? [];
}
