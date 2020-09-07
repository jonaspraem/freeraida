import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { SocialService } from './services/social.service';
import { ProfileService } from './services/profile.service';
import { NotEmptyDirective } from './directives/not-empty.directive';
import { PostService } from './services/post.service';
import { LineService } from './services/line.service';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [NotEmptyDirective],
  imports: [BrowserModule],
  providers: [
    AuthenticationService,
    AuthGuardService,
    ProfileService,
    PostService,
    LineService,
    SocialService,
    NotEmptyDirective,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('Core module already injected');
    }
  }
}
