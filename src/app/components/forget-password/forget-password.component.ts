import { Component, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoginNavComponent } from '../login-nav/login-nav.component';
import { RegNavComponent } from '../reg-nav/reg-nav.component';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule,CommonModule,RegNavComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  constructor(private _AuthService:AuthService,private _Router:Router){}
  // props
  isLoading:boolean=false;
  errMsg:string='';
  step0:boolean=true;
  step1:boolean=false;
  step2:boolean=false;
  // forms
  forgetForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.email,Validators.required]),
  })
  verifyForm:FormGroup=new FormGroup({
    resetCode:new FormControl('')
  })
  resetForm:FormGroup=new FormGroup({
    email:new FormControl(this.forgetForm.get('email')),
    newPassword:new FormControl(''),
  })
  



// methods
  forget():void
  {
      this.isLoading=true;
      this._AuthService.forget(this.forgetForm.value).subscribe({
        next:({statusMsg,message})=>{
          this.isLoading=false;
          this.step0=false;
          this.step1=true;
        },
        error:({error})=>{
          this.isLoading=false;
          this.errMsg=error.message
        }
      })
  }
  verify():void
  {
    this.isLoading=true;
    this.errMsg='';
    this._AuthService.verify(this.verifyForm.value).subscribe({
      next:(res)=>{
        this.step1=false;
        this.step2=true;
        this.isLoading=false;
        console.log(res);
      },
      error:({error})=>{
        this.isLoading=false;
        this.errMsg=error.message
      }
    })
  }
  reset():void
  {
    this.isLoading=true;
    this._AuthService.reset(this.resetForm.value).subscribe({
      next:(res)=>{
        this.isLoading=false;
        this._Router.navigate(['/login']);
      },
      error:({error})=>{
        this.isLoading=false;
        this.errMsg=error.message;
      }
    })
  }
}
