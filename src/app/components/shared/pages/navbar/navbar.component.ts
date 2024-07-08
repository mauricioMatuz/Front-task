import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import jwtDecode from 'jwt-decode'; // Import the correct function
import { UserService } from '../../../../services/user/user.service';
import { User } from '../../../../models/backend/User';
import { LoginService } from '../../../../services/login/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  taskcreate!: boolean;
 
  constructor(private loginService:LoginService) {}
  ngOnInit(): void {
    this.isAdmin();
  }

  isAdmin() {
    const rol = localStorage.getItem('rol');
    console.log(this.taskcreate);
    if (rol?.toLowerCase() !== 'admin') this.taskcreate = false;
    else this.taskcreate = true;
  }
  singOut() {
    this.loginService.logout();
  }
}
