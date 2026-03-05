import type { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import "@/styles/globals.scss";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Maven_Pro } from "next/font/google";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/navigation/Navbar";
import { ogLocaleMap } from "@/helpers/locales";

const globalFont = Maven_Pro({
  subsets: ["latin"],
});

// Types
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Viewport
export function generateViewport(): Viewport {
  return {
    themeColor: "#000000",
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    viewportFit: "cover",
    userScalable: true,
  };
}

// Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Detect locale from params and get translations for metadata
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    // Base
    metadataBase: new URL("https://www.radobley.com"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "en-US": "/en",
      },
    },
    title: {
      template: "%s | Radoslav Bley",
      default: t("title"),
    },
    description: t("description"),
    generator: "Next.js",
    applicationName: "Radoslav Bley",
    referrer: "origin-when-cross-origin",
    keywords: t("keywords").split(","),
    authors: [{ name: "Radoslav Bley", url: "https://www.radobley.com/" }],
    creator: "Radoslav Bley",
    publisher: "Vercel",
    category: "Website",

    // Format Detection
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    // Open Graph
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://www.radobley.com",
      siteName: t("title"),
      images: [
        {
          url: "/opengraph-image.jpg",
          width: 800,
          height: 600,
        },
      ],
      locale: ogLocaleMap[locale] || "sk_SK",
      type: "website",
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/twitter-image.jpg"],
    },

    // Verification
    verification: {
      google: "",
      other: {
        me: [
          "mailto:support@radobley.com",
          "mailto:info@radobley.com",
          "mailto:support@radobley.sk",
          "mailto:info@radobley.sk",
          "https://www.radobley.sk",
        ],
      },
    },
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={globalFont.className}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = "manual"`,
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
