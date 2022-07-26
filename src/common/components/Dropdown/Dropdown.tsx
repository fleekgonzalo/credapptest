import classNames from "classnames";
import React, { HTMLAttributes, useState } from "react";

import { ChevronDownIcon } from "../CustomIcon";

type DropDownOptions = {
  label: string;
  value: string;
};
type DropdownProps = HTMLAttributes<HTMLSelectElement> & {
  options: DropDownOptions[];
  onChange?: (item: DropDownOptions) => void;
  value?: string;
};
export const Dropdown = ({
  options,
  className,
  value,
  onChange = () => {},
}: DropdownProps) => {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState(value || options[0].value);

  const handleClickOption = (item: DropDownOptions) => () => {
    setSelected(item.value);
    onChange(item);
    setActive(false);
  };
  return (
    <div
      className={classNames("relative", className)}
      onBlur={() => setActive(false)}
      onFocus={() => setActive(true)}
      onMouseOut={() => setActive(false)}
      onMouseOver={() => setActive(true)}
    >
      <div>
        <button
          aria-expanded="true"
          aria-haspopup="true"
          className="inline-flex relative min-w-[100px] gap-x-4 justify-start rounded-[4px] border border-cred-dark-gray px-2 py-1 pr-3 shadow-sm text-sm font-normal leading-[22px] focus:outline-none focus:ring-2 focus:ring-offset-2"
          id="menu-button"
          type="button"
        >
          {options.find((i) => i.value === selected).label || ""}
          <ChevronDownIcon
            className="absolute right-3 top-1"
            fill="none"
            stroke="white"
          />
        </button>
      </div>
      <div
        aria-labelledby="menu-button"
        aria-orientation="vertical"
        className={classNames(
          "absolute hidden w-full shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none z-50",
          active ? "!block" : ""
        )}
        role="menu"
      >
        <div className="py-1" role="none">
          {options.map((item) => {
            return (
              <span
                key={item.value}
                className="block hover:bg-cred-dark-gray p-2 hover:text-gray-300 text-sm cursor-pointer"
                role="menuitem"
                onClick={handleClickOption(item)}
              >
                {item.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
