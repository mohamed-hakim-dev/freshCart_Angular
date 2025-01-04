import { HttpInterceptorFn } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
  

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
 const loading = inject(NgxSpinnerService)
 loading.show();
 return next(req).pipe(
  finalize(() => loading.hide())
 );
};