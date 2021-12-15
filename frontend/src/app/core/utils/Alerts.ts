import Swal from 'sweetalert2'

// Opciones básicas para toast de alerta.
const toastOptions = {
  toast: true,
  position: 'top-right',
  iconColor: 'white',
  customClass: { popup: 'colored-toast' },

  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true
}

// Opciones basicas para ventana de alerta.
const alertOptions = {
  showConfirmButton: true,
  showCancelButton: true,
  timerProgressBar: true,
  
  cancelButtonText: 'No, cancelar',
  confirmButtonText: 'Si, aceptar',
  confirmButtonColor: 'var(--clr-sucess)',
  cancelButtonColor: 'var(--clr-danger)',
}

// Muestra un toast de exito
export const ToastSucess = (title:string) => {
  const options:any = toastOptions;
  
  options.icon = 'success';
  options.title = title;

  Swal.fire(options);
}

// Muestra un toast de error
export const ToastDanger = (title:string) => {
  const options:any = toastOptions;
  
  options.icon = 'error';
  options.title = title;

  Swal.fire(options);
}

// Retorna una alerta con promesa 
export const AlertPromiseSucess = (title:string, message:string) => {
  const options:any = alertOptions;

  options.icon = 'success';
  options.title = title;
  options.text = message;
  options.iconColor = 'var(--clr-sucess)';

  return Swal.fire(options);
}

// Retorna una alerta con promesa 
export const AlertPromiseDanger = (title:string, message:string) => {
  const options:any = alertOptions;

  options.icon = 'warning';
  options.title = title;
  options.text = message;
  options.iconColor = 'var(--clr-danger)';

  return Swal.fire(options);
}