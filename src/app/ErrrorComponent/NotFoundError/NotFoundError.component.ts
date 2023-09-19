/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-NotFoundError',
  templateUrl: './NotFoundError.component.html',
  styleUrls: ['./NotFoundError.component.css']
})
export class NotFoundErrorComponent implements OnInit{


  errormessage = "THE RESOURCE IS NOT FOUND";

  constructor() {
    //
   }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    console.log();
  }



}
