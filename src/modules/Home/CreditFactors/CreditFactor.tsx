import { Card } from "@/common/components/Card";
import { ChevronRightIcon, DiamondIcon } from "@/common/components/CustomIcon";

interface Props {
  variant: "dark green" | "green" | "yellow" | "red" | "orange" | "light green";
  primaryText: string;
  secondaryText: string;
  link?: string;
}

const CreditFactor = ({
  variant,
  primaryText,
  secondaryText,
  link = undefined,
}: Props) => {
  const variantsClassName = {
    "dark green": {
      highLightColorClassName: "bg-cred-dark-green",
      borderColor: "border-cred-dark-green-opacity-0.1",
      iconColorClassName: "text-cred-dark-green",
    },
    "light green": {
      highLightColorClassName: "bg-cred-light-green",
      borderColor: "border-cred-light-green-opacity-0.1",
      iconColorClassName: "text-cred-light-green",
    },
    green: {
      highLightColorClassName: "bg-cred-green",
      borderColor: "border-cred-green-opacity-0.1",
      iconColorClassName: "text-cred-green",
    },
    yellow: {
      highLightColorClassName: "bg-cred-yellow",
      borderColor: "border-cred-yellow-opacity-0.1",
      iconColorClassName: "text-cred-yellow",
    },
    red: {
      highLightColorClassName: "bg-cred-red",
      borderColor: "border-cred-red-opacity-0.1",
      iconColorClassName: "text-cred-red",
    },
    orange: {
      highLightColorClassName: "bg-cred-orange",
      borderColor: "border-cred-orange-opacity-0.1",
      iconColorClassName: "text-cred-orange",
    },
  };

  const requiredClassName = variantsClassName[variant];

  return (
    <Card
      borderColor={requiredClassName.borderColor}
      highLightColorClassName={requiredClassName.highLightColorClassName}
    >
      <div className="flex flex-col h-full">
        <div className="flex flex-col justify-between h-full">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <DiamondIcon className={requiredClassName.iconColorClassName} />
              <h3 className="text-lg font-bold leading-5">{primaryText}</h3>
            </div>

            <p className="mb-4 tracking-wide">{secondaryText}</p>
          </div>
        </div>
        {link ? (
          <a
            className="flex items-center gap-2 mt-2 font-semibold bottom-2 text-cred-light-blue group hover:text-cred-soft-blue"
            href={link}
          >
            Learn more
            <span className="group-hover:translate-x-0.5 transition-transform">
              <ChevronRightIcon />
            </span>
          </a>
        ) : null}
      </div>
    </Card>
  );
};

export default CreditFactor;
