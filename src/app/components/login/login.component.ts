import { Component } from '@angular/core';
import { LoginNavComponent } from "../login-nav/login-nav.component";
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [LoginNavComponent,LoginNavComponent,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private _AuthService:AuthService,private _Router:Router){}
  errMsg:string='';
  isLoading:boolean=false;
  loginForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required]),
  })

  login():void
  {
    if(this.loginForm.valid)
    {
      this.isLoading=true;
      this._AuthService.login(this.loginForm.value).subscribe({
        next:(res)=>{
          if(res.message==='success')
          {
            this.isLoading=false;
            this._Router.navigate(['/home']);
            localStorage.setItem('_token',res.token)
          }else{
            this.isLoading=false;
          }
        },
        error:({error})=>{
          this.isLoading=false;
          this.errMsg=error.message;
        }
      })
    }
  }
}
