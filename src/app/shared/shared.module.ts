import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorModalComponent } from './Modals/error-modal/error-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [ErrorModalComponent],
  imports: [
    CommonModule,ModalModule.forRoot()
  ],
  exports : [ErrorModalComponent]
})
export class SharedModule { }
