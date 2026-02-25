import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  standalone: false,
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent implements OnInit {
  constructor(private auth_service: AuthenticationService) {}

  public ngOnInit(): void {}

  public onLogout(): void {
    this.auth_service.logout();
  }
}
