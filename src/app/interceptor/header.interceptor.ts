import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const myToken:any=localStorage.getItem(`_token`);
  if(myToken)
  {
    req=req.clone({
      setHeaders:{
        token:myToken
      }
    })
  }
  return next(req);
};
