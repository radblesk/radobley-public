import styles from "./intro.module.scss";
import { Bodoni_Moda } from "next/font/google";
import { getTranslations } from "next-intl/server";
import IntroButtons from "@/components/intro/IntroButtons";

const headlineFont = Bodoni_Moda({
  subsets: ["latin"],
});

export default async function Intro() {
  const t = await getTranslations("homepage.intro");

  function openURL(url: string): void {
    window.open(url, "_blank")?.focus();
  }

  return (
    <section id="intro" className={styles.intro}>
      <div className={`container ${styles.mainContent}`}>
        <h1 className={headlineFont.className}>
          <div data-side="top" className={styles.dashLine} />
          <div data-side="left" className={styles.dashLine} />
          <div data-side="bottom" className={styles.dashLine} />
          <div data-side="right" className={styles.dashLine} />
          {t("headline")}
        </h1>
        <h2>
          {t.rich("subheadline", {
            highlight: (chunks) => (
              <span className={styles.highlighted}>{chunks}</span>
            ),
          })}
        </h2>

        <IntroButtons />
      </div>
    </section>
  );
}
