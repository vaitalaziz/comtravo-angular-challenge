import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingIndicatorComponent } from './loading-indicator.component';


@NgModule({
  declarations: [
    LoadingIndicatorComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [LoadingIndicatorComponent],
//   providers: [],
  entryComponents: [LoadingIndicatorComponent],
})
export class LoadingIndicatorModule { }
