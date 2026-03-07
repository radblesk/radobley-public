"use client";

// Next + React
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Styles
import styles from "./navbar.module.scss";

// Localizations
import { Locale } from "@/helpers/locales";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "use-intl";
import { useTranslations } from "next-intl";

// Components
import NavMenuButton from "@/components/navigation/NavMenuButton";
import LocaleSwitcher from "@/components/navigation/LocaleSwitcher";

// Assets
import logo from "@/public/logo.svg";

export default function Navbar() {
  // Locale
  const activeLocale = useLocale() as keyof typeof Locale;
  const t = useTranslations("navigation");

  // Menu Items
  const primaryMenu = [
    {
      id: 1,
      title: t("primary.stack"),
      url: "#stack",
    },
    {
      id: 2,
      title: t("primary.portfolio"),
      url: "#portfolio",
    },
    {
      id: 3,
      title: t("primary.services"),
      url: "#services",
    },
    {
      id: 4,
      title: t("primary.lab"),
      url: "#lab",
    },
    {
      id: 5,
      title: t("primary.blog"),
      url: "https://www.radobley.com/blog",
    },
    {
      id: 6,
      title: t("primary.contact"),
      url: "#contact",
    },
  ];
  const secondaryMenu = [
    {
      id: 1,
      title: t("secondary.bleyboard"),
      url: "https://bleyboard.radobley.com",
    },
    {
      id: 2,
      title: t("secondary.ava"),
      url: "https://ava.radobley.com",
    },
  ];

  // Pathname
  const router = useRouter();
  const pathname = usePathname();

  // States
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<Locale>(Locale[activeLocale]);

  // Functions
  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  /*Prevents website scroll when menu is open*/
  useEffect(() => {
    const body = document.body;

    if (isOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.removeProperty("overflow");
    }
  }, [isOpen]);

  function switchLanguage(language: Locale) {
    setLanguage(language);
    router.push(pathname, { locale: Locale[language] });
  }

  return (
    <header className={styles.global}>
      <nav>
        <div className={styles.content}>
          <div className={styles.primaryMenu}>
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>
            <ul>
              {primaryMenu.map((item) => (
                <li key={item.id}>
                  <Link href={item.url}>{item.title}</Link>{" "}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.secondaryMenu}>
            <LocaleSwitcher current={language} action={switchLanguage} />
            <NavMenuButton isOpen={isOpen} action={toggleOpen} />
          </div>

          {isOpen && (
            <div className={styles.mobileContent}>
              <ul>
                {primaryMenu.map((item) => (
                  <li
                    onClick={toggleOpen}
                    key={item.id}
                    style={{ animationDelay: `${item.id * 40}ms` }}
                  >
                    <Link href={item.url}>{item.title}</Link>{" "}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
