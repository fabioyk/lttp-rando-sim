import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportComponent } from './support/support.component';
import { ChangelogComponent } from './changelog/changelog.component';
import { AboutComponent } from './about/about.component';
import { AccordionModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    AccordionModule.forRoot(),
  ],
  declarations: [SupportComponent, ChangelogComponent, AboutComponent],
  exports: [SupportComponent, ChangelogComponent, AboutComponent]
})
export class InfoPagesModule { }
