import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import Swal from "sweetalert2";

export const errohandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      console.log("SI ENTRO :D",error.error.error)
      switch (error.status) {
        case 400:
          errorMessage = `Falta datos ${error.error.error}`;
          break;
        case 401:
          errorMessage = `${error.error.error}`;
          break;
        case 404:
          errorMessage = `Error:  ${error.error.error}`;
          break;
        case 500:
          errorMessage = `Error del servidor ${error.message}`;
          break;
        default:
          errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
          break;
      }
    }
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage,
    });
    return throwError(() => new Error(errorMessage));
  }));
};
