interface ButtonProps {
  handleClick?: () => void;
  label: string | JSX.Element;
  customStyle?: any;
  disabled?: boolean;
  type?: 'submit' | 'button';
}

export const Button = ({
  customStyle = {},
  handleClick,
  label,
  disabled,
  type,
}: ButtonProps) => {
  const style = {
    button: {
      cursor: 'pointer',
    },
  };

  return (
    <button
      className={disabled ? 'btn-grad btn-grad--disabled' : 'btn-grad'}
      style={{ ...style.button, ...customStyle }}
      onClick={handleClick}
      disabled={disabled ?? false}
      type={type}
    >
      {label ?? 'click'}
    </button>
  );
};
