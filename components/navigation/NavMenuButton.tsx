import styles from "./navmenubtn.module.scss";

type NavButtonProps = {
  isOpen: boolean;
  action: () => void;
};

export default function NavMenuButton({ isOpen, action }: NavButtonProps) {
  return (
    <button data-open={isOpen} onClick={action} className={styles.menuBtn}>
      <div></div>
      <div></div>
    </button>
  );
}
