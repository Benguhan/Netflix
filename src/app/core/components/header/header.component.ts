import { Component, Input } from '@angular/core';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userImage = JSON.parse(sessionStorage.getItem('loggedInUser')!).picture;
  loading = true;
  navList: any[];

  constructor() { 
    this.navList = ['Home', 'TV Shows', 'New & Popular', 'My List', 'Browse by Language'];
    console.log(this.userImage);
  }
}
