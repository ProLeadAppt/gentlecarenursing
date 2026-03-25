import { useState, useCallback } from "react";

type Validator = (value: string) => string | null;

export const validators = {
  required: (label: string): Validator => (value) =>
    value.trim().length === 0 ? `${label} is required` : null,

  email: (): Validator => (value) =>
    value.trim().length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? "Please enter a valid email address"
      : null,

  phone: (): Validator => (value) => {
    if (value.trim().length === 0) return null;
    const digits = value.replace(/\D/g, "");
    return digits.length < 8 || digits.length > 12
      ? "Please enter a valid phone number"
      : null;
  },

  minLength: (min: number, label: string): Validator => (value) =>
    value.trim().length > 0 && value.trim().length < min
      ? `${label} must be at least ${min} characters`
      : null,
};

interface FieldState {
  touched: boolean;
  error: string | null;
  valid: boolean;
}

interface UseFormValidationOptions {
  /** Map of field name → array of validators */
  fields: Record<string, Validator[]>;
}

export function useFormValidation({ fields }: UseFormValidationOptions) {
  const [state, setState] = useState<Record<string, FieldState>>(() => {
    const initial: Record<string, FieldState> = {};
    for (const key of Object.keys(fields)) {
      initial[key] = { touched: false, error: null, valid: false };
    }
    return initial;
  });

  const validateField = useCallback(
    (name: string, value: string) => {
      const fieldValidators = fields[name];
      if (!fieldValidators) return;

      let error: string | null = null;
      for (const validate of fieldValidators) {
        error = validate(value);
        if (error) break;
      }

      setState((prev) => ({
        ...prev,
        [name]: {
          touched: true,
          error,
          valid: !error && value.trim().length > 0,
        },
      }));
    },
    [fields]
  );

  const touchField = useCallback(
    (name: string, value: string) => {
      validateField(name, value);
    },
    [validateField]
  );

  const isFormValid = useCallback(
    (values: Record<string, string>) => {
      for (const [name, fieldValidators] of Object.entries(fields)) {
        const value = values[name] ?? "";
        for (const validate of fieldValidators) {
          if (validate(value)) return false;
        }
      }
      return true;
    },
    [fields]
  );

  const getFieldProps = (name: string) => ({
    error: state[name]?.touched ? state[name]?.error ?? undefined : undefined,
    valid: state[name]?.touched ? state[name]?.valid : undefined,
  });

  return { state, validateField, touchField, isFormValid, getFieldProps };
}
