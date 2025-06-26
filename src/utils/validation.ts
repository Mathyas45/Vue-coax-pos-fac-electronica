// utils/validation.ts
import type { Ref } from 'vue';
import { showAlert } from './alert';

interface Field {
  value: { value: any }; // esto asume que estás usando ref()
  label: string;
}

/**
 * Valida un conjunto de campos requeridos.
 * Muestra una alerta si uno está vacío.
 */
export const validateRequiredFields = (fields: Field[]): boolean => {
  for (const field of fields) {
    if (!field.value.value || String(field.value.value).trim() === '') {
      showAlert('Upps!', `El campo ${field.label} es obligatorio`, 'error', true);
      return false;
    }
  }
  return true;
};


/**
 * Valida un campo de correo electrónico.
 * Muestra una alerta si el correo no es válido.
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showAlert('Upps!', 'El correo electrónico no es válido', 'error', true);
    return false;
  }
  return true;

}
/**
 * Limpia múltiples campos ref() asignándoles un valor vacío.
 * @param fields - Lista de campos (refs) a limpiar
 */
export const clearFields = (fields: Ref<any>[], defaultValue: any = '') => {
  fields.forEach(field => {
    field.value = defaultValue;
  });
};
