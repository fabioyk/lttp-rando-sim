import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionsComponent } from './options/options.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OptionsComponent],
  exports: [OptionsComponent]  
})
export class OptionsModule { }
