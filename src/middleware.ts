import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Keep the deprecated `middleware` convention: `proxy.ts` runs on the Node.js
// runtime, which @opennextjs/cloudflare rejects at build time.
export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(uz|ru|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
