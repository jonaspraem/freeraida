import { NgModule } from '@angular/core';
import { PostWriterComponent } from './post-writer/post-writer.component';
import { PostLoaderComponent } from './post-loader/post-loader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [PostWriterComponent, PostLoaderComponent, PostComponent],
  exports: [PostWriterComponent, PostLoaderComponent, PostComponent],
  imports: [FontAwesomeModule, RouterModule, CommonModule, AngularSvgIconModule],
})
export class PostModule {}
