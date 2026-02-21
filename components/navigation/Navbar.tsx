"use client";

import styles from "./navbar.module.scss";

import logo from "@/public/logo.svg";
import Image from "next/image";
import NavMenuButton from "@/components/navigation/NavMenuButton";
import { useEffect, useState } from "react";
import LocaleSwitcher from "@/components/navigation/LocaleSwitcher";
import { Locale } from "@/helpers/locales";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "use-intl";

type NavBarProps = {
  params: Promise<{ locale: string }>;
};

export default function Navbar({ params }: NavBarProps) {
  const activeLocale = useLocale() as keyof typeof Locale;

  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<Locale>(Locale[activeLocale]);

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
        <Image src={logo} alt="logo" />
        <div className={styles.rightSide}>
          <LocaleSwitcher current={language} action={switchLanguage} />
          <NavMenuButton isOpen={isOpen} action={toggleOpen} />
        </div>
      </div>

      {isOpen && (
        <div className={styles.fullscreenContent}>
          <div></div>
          <div>
            <ul className={styles.primaryList}>
              <li>Stack</li>
              <li>Portfólio</li>
              <li>Lab</li>
              <li>Kontakt</li>
            </ul>
            <ul className={styles.secondaryList}>
              <li>Ava for Reddit</li>
              <li>BleyBoard</li>
              <li>Insider</li>
              <li>Podmienky Používania</li>
              <li>Ochrana osobných údajov</li>
              <li>Cookies</li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
