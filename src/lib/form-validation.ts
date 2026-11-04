/** Browser-only validation helpers. Values are neither changed nor transmitted. */
export interface FieldValidationRules {
  required?: boolean;
  type?: string;
  maxLength?: number;
}

export function fieldValidationMessage(value: string, rules: FieldValidationRules): string {
  if (rules.required && !value.trim()) return "Please complete this field.";
  if (value && rules.type === "email" && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value)) {
    return "Please enter a valid email address.";
  }
  if (rules.maxLength !== undefined && value.length > rules.maxLength) {
    return `Please use ${rules.maxLength} characters or fewer.`;
  }
  return "";
}

type FormControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function isFormControl(target: EventTarget | null): target is FormControl {
  return target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement;
}

/** Clear a previous custom error so browser-native validation can run again. */
export function clearFieldValidation(event: { target: EventTarget | null }): void {
  if (isFormControl(event.target)) event.target.setCustomValidity("");
}

export function reportFormValidity(form: HTMLFormElement): boolean {
  const controls = Array.from(form.elements).filter(isFormControl);
  for (const control of controls) {
    const serverLimit = control instanceof HTMLTextAreaElement ? 5000 : 254;
    const nativeLimit = "maxLength" in control ? control.maxLength : -1;
    control.setCustomValidity(fieldValidationMessage(control.value, {
      required: control.required,
      type: control.type,
      maxLength: nativeLimit >= 0 ? Math.min(nativeLimit, serverLimit) : serverLimit,
    }));
  }
  const valid = form.reportValidity();
  if (!valid) controls.find(control => control.willValidate && !control.validity.valid)?.focus();
  return valid;
}
