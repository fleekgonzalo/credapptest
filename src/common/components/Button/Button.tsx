import classNames from "classnames";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  variant?: "outline";
}

export const Button = ({
  children,
  leftIcon,
  rightIcon,
  variant,
  ...props
}: PropsWithChildren<Props>) => {
  const commonClassName =
    "flex gap-2 items-center transition-colors py-2.5 px-4";

  const variantsClassName = {
    outline:
      "border border-cred-soft-blue bg-black rounded-[4px] hover:border-cred-light-blue",
  };

  const className = classNames(
    commonClassName,
    variantsClassName[variant],
    props.className
  );

  return (
    <button {...props} className={classNames(className)}>
      {leftIcon && <span>{leftIcon}</span>}
      {children}
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};

export default Button;
