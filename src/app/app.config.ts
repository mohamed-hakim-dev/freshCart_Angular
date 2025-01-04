import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './interceptor/header.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './interceptor/loading.interceptor';
import { CarouselModule } from 'ngx-owl-carousel-o';



export const appConfig: ApplicationConfig = {
  providers: [
    CarouselModule,
    provideAnimations(), provideToastr(), NgxSpinnerModule,
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withInterceptors([headerInterceptor,loadingInterceptor])),
    provideStore()
]
};
  