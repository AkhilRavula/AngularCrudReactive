import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent implements OnInit{

  modalHeaderText: string
  modalBodyText: string
  okButtonText: string

  redirectOnOk: EventEmitter<any> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef) {

   }
  ngOnInit(): void {
    this.modalHeaderText= 'Unauthorized';
   this.modalBodyText= 'Log In To Continue';
    this.okButtonText='Login';
  }

   onOkClicked = () => {
    this.redirectOnOk.emit();
    this.bsModalRef.hide();
  }
}

