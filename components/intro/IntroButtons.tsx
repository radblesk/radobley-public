"use client";

import styles from "@/sections/intro.module.scss";
import Button, {
  ButtonStyle,
  ButtonSymbolSide,
} from "@/components/interactive/Button";
import { useTranslations } from "next-intl";

export default function IntroButtons() {
  const t = useTranslations("homepage.intro");

  return (
    <div className={styles.buttonsRow}>
      <Button
        title={t("primaryButton")}
        action={() => document.getElementById("contact")?.scrollIntoView()}
        style={ButtonStyle.light}
      />

      <Button
        title={t("secondaryButton")}
        style={ButtonStyle.tertiary}
        action={() => window.open("https://ava.radobley.com", "_blank")}
      />
    </div>
  );
}
