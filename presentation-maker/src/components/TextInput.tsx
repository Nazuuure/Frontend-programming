import styles from './TextInput.module.css';

interface TextInputProps {
  value: string | number;
  placeholder?: string;
  type?: 'text' | 'color' | 'number';
  onChange?: (value: string) => void;
  className?: string;
}

function TextInput({ value, placeholder, type = 'text', onChange, className }: TextInputProps) {
  const handleInputChange = (inputElement: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(inputElement.target.value);
    }
  };

  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      className={`${styles.inputField} ${className || ''}`}
      onChange={handleInputChange}
    />
  );
}

export default TextInput;