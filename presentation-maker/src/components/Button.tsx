import styles from './Button.module.css'

type ButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
};

function Button({ onClick, children }: ButtonProps) {
  return (
    <button type="button" onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}

export default Button;