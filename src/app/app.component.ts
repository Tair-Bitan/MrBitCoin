import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'MrBitCoin';
  isMenuOpen: boolean = false

  toggleMenu() {
    console.log('hi');
    this.isMenuOpen = !this.isMenuOpen
  }

}
