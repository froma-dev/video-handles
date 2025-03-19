type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "danger"
  | "success"
  | "warning"
  | "info"
  | "rounded";

type ButtonProps = {
  onClick: () => void;
  variant: ButtonVariant;
  disabled?: boolean;
  children?: React.ReactNode;
  ariaLabel: string
};

const Button = ({
  onClick,
  variant,
  children,
  disabled,
  ariaLabel
}: ButtonProps) => {
  const baseClassName = "button";
  const variantClassName = `button--${variant}`;
  const className = `${baseClassName} ${variantClassName}`;
  const isDisabled = disabled;

  const handleClick = () => {
    onClick();
  };
  return (
    <button
      onClick={handleClick}
      aria-label={ariaLabel}
      className={className}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
