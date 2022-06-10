import classNames from "classnames";
import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

interface Props extends ComponentPropsWithoutRef<"div"> {
  highLightColorClassName?: string;
  borderColor?: string;
  glow?: boolean;
  darker?: boolean;
}

export const Card = ({
  children,
  highLightColorClassName,
  borderColor,
  glow,
  darker,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <>
      <div
        className={classNames(
          "rounded-xl border-2",
          borderColor || "border-cred-light-blue-opacity-0.2",
          darker ? "bg-dark-blue" : "bg-cred-blue",
          props.className
        )}
        style={{
          boxShadow: glow
            ? "0px 8px 64px -24px rgba(93, 120, 255, 0.8)"
            : undefined,
          ...props.style,
        }}
        {...props}
      >
        {highLightColorClassName && (
          <div
            className={classNames(highLightColorClassName, "h-2  rounded-t-lg")}
          />
        )}
        <div className="p-6 h-[calc(100%-8px-24px-24px)]">{children}</div>
      </div>
    </>
  );
};

export default Card;
