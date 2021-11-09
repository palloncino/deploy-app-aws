interface ButtonProps {
  handleClick?: () => void;
  label: string | JSX.Element;
  customStyle?: any;
  disabled?: boolean;
  type?: 'submit' | 'button';
  className?: string;
}

export const Button = ({
  customStyle = {},
  handleClick,
  label,
  disabled,
  type,
  className,
}: ButtonProps) => {
  const style = {
    button: {
      cursor: 'pointer',
    },
  };
  const getClassName = () => {
    return className ? `btn ${className}` : `btn`;
  }

  return (
    <button
      className={getClassName()}
      style={{ ...style.button, ...customStyle }}
      onClick={handleClick}
      disabled={disabled ?? false}
      type={type}
    >
      {label ?? 'click'}
    </button>
  );
};
