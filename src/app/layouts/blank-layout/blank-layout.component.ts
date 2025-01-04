import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlankNavComponent } from '../../components/blank-nav/blank-nav.component';
import { FooterComponent } from '../../components/footer/footer.component';



@Component({
  selector: 'app-blank-layout',
  imports: [RouterOutlet,BlankNavComponent,FooterComponent],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.scss'
})
export class BlankLayoutComponent {

  upToTop(toUp:HTMLButtonElement): void {
    if(window.scrollY>200)
    window.scrollTo(0, 0);
  }
}
