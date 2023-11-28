import React, { useState } from "react";
import classes from "./Switcher.module.css";

import Option from "./Option";

export interface IOption {
  label: string;
  value: string;
  onSelect: () => void;
}

interface IProps {
  options: IOption[];
}

const Switcher: React.FC<IProps> = ({ options }) => {
  const [currentSelectedOptionValue, setCurrentSelectedOptionValue] =
    useState<string>(options[0].value);
  function renderOptions(): React.ReactNode {
    return options.map((option) => {
      function handleOptionSelect() {
        setCurrentSelectedOptionValue(option.value);
        option.onSelect();
      }

      return (
        <Option
          key={option.value}
          selected={currentSelectedOptionValue === option.value}
          onClick={handleOptionSelect}
        >
          {option.label}
        </Option>
      );
    });
  }

  return <div className={classes.switcher}>{renderOptions()}</div>;
};

export default Switcher;
