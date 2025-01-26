export type FormFields = "name" | "email" | "password";

export type FormValues = Record<FormFields, string>;

export type FormErrors = Partial<Record<FormFields, string>>;
