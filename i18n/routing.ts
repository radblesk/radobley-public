import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "sk"],

  // Displays prefix on non-default locales (e.g., "/about ... /sk/about")
  localePrefix: "as-needed",

  // Used when no locale matches
  defaultLocale: "sk",

  pathnames: {
    "/": "/",
  },
});
