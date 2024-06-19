import "./Button.css";

interface ButtonProps  {
  name: string;
  clickHandler?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  name,
  clickHandler,
  disabled = false,
  className
}: ButtonProps) => {
  return (
    <button onClick={clickHandler} disabled={disabled} className={className}>
      {name}
    </button>
  );
};

export default Button;
