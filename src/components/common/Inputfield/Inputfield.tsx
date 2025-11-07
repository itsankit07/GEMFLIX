import React, { useState } from "react";

import * as styles from "./Inputfield.module.scss";

type InputFieldProps = {
  type: string;
  placeholder: string;
  defaultValue?: string;
  error?: string;
  className?: string;
  ref?: React.RefObject<HTMLInputElement>;
};

export const InputField = ({ type, placeholder, defaultValue, error, className, ref }: InputFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        ref={ref}
        defaultValue={defaultValue}
        type={type === "password" && isPasswordVisible ? "text" : type}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.errorBorder : ""} ${className}`}
      />
      {error && <p className={styles.error}>{error}</p>}
      {type === "password" && (
        <label className={styles.showPassword}>
          <input type="checkbox" checked={isPasswordVisible} onChange={togglePasswordVisibility} />
          {isPasswordVisible ? "Hide password" : "Show password"}
        </label>
      )}
    </div>
  );
};
