import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  NgxSpinnerModule } from 'ngx-spinner';
import { FooterComponent } from './components/footer/footer.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgxSpinnerModule,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private _Renderer2:Renderer2){}
  title = 'freshCart';



}
