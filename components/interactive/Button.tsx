"use client";

import styles from "./button.module.scss";
import React from "react";

export enum ButtonStyle {
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary",
}

export enum ButtonSymbolSide {
  left = "left",
  right = "right",
}

type ButtonProps = {
  title: string;
  symbol?: React.ReactElement;
  symbolSide?: ButtonSymbolSide;
  action?: () => void;
  style?: ButtonStyle;
};

export default function Button({
  title,
  symbol,
  symbolSide = ButtonSymbolSide.left,
  action,
  style = ButtonStyle.primary,
}: ButtonProps) {
  return (
    <button onClick={action} className={`${styles.button} ${styles[style]}`}>
      {symbol && symbolSide === ButtonSymbolSide.left && (
        <span data-side={symbolSide}>{symbol}</span>
      )}
      {title}
      {symbol && symbolSide === ButtonSymbolSide.right && (
        <span data-side={symbolSide}>{symbol}</span>
      )}
    </button>
  );
}
