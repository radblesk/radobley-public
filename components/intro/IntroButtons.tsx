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
        action={() => window.open("#contact", "_self")}
      />

      <Button
        title={t("secondaryButton")}
        symbol={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-box-arrow-up-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
            />
            <path
              fillRule="evenodd"
              d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
            />
          </svg>
        }
        symbolSide={ButtonSymbolSide.right}
        style={ButtonStyle.tertiary}
        action={() => window.open("https://ava.radobley.com", "_blank")}
      />
    </div>
  );
}
