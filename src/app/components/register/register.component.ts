import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { RegNavComponent } from '../reg-nav/reg-nav.component';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule,RegNavComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService,private _Router:Router){}
  registerForm:FormGroup=new FormGroup({
    name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required]),
    rePassword:new FormControl('',[Validators.required]),
    phone:new FormControl(''),
  })
  errMsg:string='';
  isLoading:boolean=false;
  register():void
  {
    if(this.registerForm.valid)
      {
    this.isLoading=true;
    this._AuthService.register(this.registerForm.value).subscribe({
      next:(res)=>{
        this.isLoading=false;
        if(res.message=='success')
          {
          this._Router.navigate(['/login']),
          localStorage.setItem('userToken',res.token);
        }
      },
      error:({error})=>{
        this.isLoading=false;
        this.errMsg=error.message
      },
    })
    }
  }
}
