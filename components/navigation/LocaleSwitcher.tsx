import styles from "./localeswitcher.module.scss";
import { Locale } from "@/helpers/locales";
import { useEffect, useRef, useState } from "react";

type LocaleSwitcherProps = {
  current: Locale;
  action: (value: Locale) => void;
};

export default function LocaleSwitcher({
  current,
  action,
}: LocaleSwitcherProps) {
  // States
  const [isOpen, setIsOpen] = useState(false);

  // Ref
  const ref = useRef<HTMLDivElement>(null);

  // Functions
  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={styles.switcher}>
      <button className={isOpen ? styles.isOpen : ""} onClick={toggleDropdown}>
        {current}
      </button>

      {isOpen && (
        <ul>
          {Object.entries(Locale).map(([key, value]) => (
            <li key={key}>
              <button
                disabled={value === current}
                onClick={() => {
                  action(value);
                  toggleDropdown();
                }}
              >
                {value}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
