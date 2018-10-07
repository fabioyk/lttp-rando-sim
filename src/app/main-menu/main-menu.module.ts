import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AlertModule, ButtonsModule, TooltipModule, PopoverModule, AccordionModule } from "ngx-bootstrap";
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    AccordionModule.forRoot(),
    RouterModule
  ],
  declarations: [MainMenuComponent],
  exports: [
    MainMenuComponent
  ],
})
export class MainMenuModule { }
