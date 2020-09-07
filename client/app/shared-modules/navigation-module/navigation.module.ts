import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserNavMenuComponent } from './user-nav-menu/user-nav-menu.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, SidenavComponent, UserNavMenuComponent],
  exports: [HeaderComponent, SidenavComponent, UserNavMenuComponent],
  imports: [CommonModule, RouterModule],
})
export class NavigationModule {}
