import { Injectable } from '@angular/core';
import Swal, {SweetAlertIcon, SweetAlertOptions, SweetAlertPosition, SweetAlertResult} from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlretsService {
  constructor() {}

  showSuccess(title: string, text: string): void {
    Swal.fire({
      icon: 'success',
      title: title,
      text: text,
    });
  }

  ShowErrorAlert(message: string): void {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK!',
    });
  }

  MinShowSucces(
    message: string,
    icon: SweetAlertIcon,
    title?: string,
    positions?: SweetAlertPosition
  ) {
    const options: SweetAlertOptions = {
      icon: icon,
      title: title || 'Success',
      text: message,
      toast: true,
      position: positions || 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    };

    Swal.fire(options);
  }

  showConfirmationAlert(
    title: string,
    text: string,
    icon: SweetAlertIcon,
    cancel: boolean,
    buttonConfirm?: string,
    buttonCancel?:string
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: cancel,
      confirmButtonText: buttonConfirm ||'Sí, finalizar',
      cancelButtonText: buttonCancel||'No, cancelar',
    });

  }
}
