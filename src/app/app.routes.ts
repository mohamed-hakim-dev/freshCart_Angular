import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [

    {path:'',loadComponent:()=>import('./layouts/auth-layout/auth-layout.component').then((m)=>m.AuthLayoutComponent),children:[
        {path:'',loadComponent:()=>import('./components/login/login.component').then((m)=>m.LoginComponent)},
        {path:'login',loadComponent:()=>import('./components/login/login.component').then((m)=>m.LoginComponent)},
        {path:'register',loadComponent:()=>import('./components/register/register.component').then((m)=>m.RegisterComponent)},
        {path:'forget-password',loadComponent:()=>import('./components/forget-password/forget-password.component').then((m)=>m.ForgetPasswordComponent)},
    ]},
    {path:'',loadComponent:()=>import('./layouts/blank-layout/blank-layout.component').then((m)=>m.BlankLayoutComponent),children:[
        {path:'',loadComponent:()=>import('./components/home/home.component').then((m)=>m.HomeComponent),canActivate:[authGuard]},
        {path:'home',loadComponent:()=>import('./components/home/home.component').then((m)=>m.HomeComponent),canActivate:[authGuard]},
        {path:'cart',loadComponent:()=>import('./components/cart/cart.component').then((m)=>m.CartComponent),canActivate:[authGuard]},
        {path:'specificCat/:id',loadComponent:()=>import('./components/specific-cat/specific-cat.component').then((m)=>m.SpecificCatComponent),canActivate:[authGuard]},
        {path:'category',loadComponent:()=>import('./components/categories/categories.component').then((m)=>m.CategoriesComponent),canActivate:[authGuard]},
        {path:'brands',loadComponent:()=>import('./components/brands/brands.component').then((m)=>m.BrandsComponent),canActivate:[authGuard]},
        {path:'details/:id',loadComponent:()=>import('./components/details/details.component').then((m)=>m.DetailsComponent),canActivate:[authGuard]},
    ]},
];

