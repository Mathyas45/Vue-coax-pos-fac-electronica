import Swal from 'sweetalert2/dist/sweetalert2.js';

type AlertType = 'success' | 'error' | 'warning' | 'info' | 'question';

export const showAlert = (
  title: string,
  text: string = '',
  icon: AlertType = 'info',
  autoClose: boolean = false,
  duration: number = 2500
) => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: autoClose ? undefined : 'Aceptar',
    timer: autoClose ? duration : undefined,
    showConfirmButton: !autoClose,
    timerProgressBar: autoClose,
  });
};

export const showConfirm = (
  title: string,
  text: string,
  confirmButtonText = 'Sí, estoy seguro',
  cancelButtonText = 'No, cancelar'
) => {
  return Swal.fire({
    title,
    text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
  });
};
