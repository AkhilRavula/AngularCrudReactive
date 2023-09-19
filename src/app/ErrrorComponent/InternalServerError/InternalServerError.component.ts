/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-InternalServerError',
  templateUrl: './InternalServerError.component.html',
  styleUrls: ['./InternalServerError.component.css']
})
export class InternalServerErrorComponent implements OnInit  {


  errorMessage= "500 SERVER ERROR, CONTACT ADMINISTRATOR!!!!";
  constructor() {
    //
   }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    console.log();
  }

}
