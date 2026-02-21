import styles from "./localeswitcher.module.scss";
import { Locale } from "@/helpers/locales";

type LocaleSwitcherProps = {
  current: Locale;
  action: (value: Locale) => void;
};

export default function LocaleSwitcher({
  current,
  action,
}: LocaleSwitcherProps) {
  return (
    <select
      className={styles.switcher}
      value={current}
      onChange={(e) => action(e.target.value as Locale)}
    >
      {Object.entries(Locale).map(([key, value]) => (
        <option key={key} value={key}>
          {value.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
