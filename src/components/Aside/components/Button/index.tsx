import styles from "./index.module.css";

type Color = "danger" | "warning" | "success";

interface ButtonProps {
  children: React.ReactNode;
  color: Color;
  onClick: () => void;
}

const Button = ({ children, color, onClick }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${styles[color]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
