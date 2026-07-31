import type { Metadata } from "next";
import {
  generateProductMetadata,
  ProductPage,
} from "@/lib/product-page";

type Props = { params: Promise<{ locale: string }> };
const slug = "sovuq-ombor";

export async function generateMetadata(props: Props): Promise<Metadata> {
  return generateProductMetadata({ ...props, slug });
}

export default async function Page(props: Props) {
  return <ProductPage {...props} slug={slug} />;
}
