"use client";

import styles from "./navbar.module.scss";

// @ts-ignore
import logo from "@/public/logo.svg";
import Image from "next/image";
import NavMenuButton from "@/components/navigation/NavMenuButton";
import { useEffect, useState } from "react";
import LocaleSwitcher from "@/components/navigation/LocaleSwitcher";
import { Locale } from "@/helpers/locales";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "use-intl";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Navbar() {
  const activeLocale = useLocale() as keyof typeof Locale;
  const t = useTranslations("navigation");

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
      title: t("primary.contact"),
      url: "#contact",
    },
  ];

  const secondaryMenu = [
    {
      id: 1,
      title: t("secondary.blog"),
      url: "https://www.radobley.com/blog",
    },
    {
      id: 2,
      title: t("secondary.bleyboard"),
      url: "https://bleyboard.radobley.com",
    },
    {
      id: 3,
      title: t("secondary.ava"),
      url: "https://ava.radobley.com",
    },
  ];

  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<Locale>(Locale[activeLocale]);
  const [option, setOption] = useState<number>(1);

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

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
    <nav className={styles.global}>
      <div className={styles.mainContent}>
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>
        <div className={styles.rightSide}>
          <LocaleSwitcher current={language} action={switchLanguage} />
          <NavMenuButton isOpen={isOpen} action={toggleOpen} />
        </div>
      </div>

      {isOpen && (
        <div className={styles.fullscreenContent}>
          <div>{option}</div>
          <div>
            <ul className={styles.primaryList}>
              {primaryMenu.map((item) => (
                <li
                  onClick={toggleOpen}
                  onMouseEnter={() => setOption(item.id)}
                  key={item.id}
                >
                  <Link href={item.url}>{item.title}</Link>{" "}
                </li>
              ))}
            </ul>

            <ul className={styles.secondaryList}>
              {secondaryMenu.map((item) => (
                <li onClick={toggleOpen} key={item.id}>
                  {item.url.startsWith("https://www.radobley") ? (
                    <Link href={item.url}>{item.title}</Link>
                  ) : (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.title}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
