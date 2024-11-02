import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { PinataSDK } from "pinata";

import { Observable, catchError } from 'rxjs';


import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';


const pinata = new PinataSDK({
      pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmYmQxODlhMS00OTIwLTQ4MGItYWU1ZS1hZDUwMTMyOWNmODUiLCJlbWFpbCI6ImtlcGhvdGhvbWVkaWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjIxYzM1ZGZhM2NhZThkZmVkMzQ2Iiwic2NvcGVkS2V5U2VjcmV0IjoiZWQ4MTFkM2ZhMzdiNjI5ZWVkMDJlNWZhMGQ0ODFjMTI2OWJkNzQ3MDUyMGM4OThlODRlNzVmNDIzYTYxMDU2MCIsImV4cCI6MTc2MDk5NTY1OH0.ir293WSX6PMKEklTZBzgt7_6PY7saE--TuTNXprvOfI",
      pinataGateway: "amaranth-past-ladybug-860.mypinata.cloud"
    });


const PinataJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmYmQxODlhMS00OTIwLTQ4MGItYWU1ZS1hZDUwMTMyOWNmODUiLCJlbWFpbCI6ImtlcGhvdGhvbWVkaWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjIxYzM1ZGZhM2NhZThkZmVkMzQ2Iiwic2NvcGVkS2V5U2VjcmV0IjoiZWQ4MTFkM2ZhMzdiNjI5ZWVkMDJlNWZhMGQ0ODFjMTI2OWJkNzQ3MDUyMGM4OThlODRlNzVmNDIzYTYxMDU2MCIsImV4cCI6MTc2MDk5NTY1OH0.ir293WSX6PMKEklTZBzgt7_6PY7saE--TuTNXprvOfI"



@Component({
  selector: 'app-files',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './files.component.html',
  styleUrl: './files.component.css'
})
export class FilesComponent {

  formData = new FormData();

  constructor (
    public _matSnackBar: MatSnackBar
  ) {}


  async ngOnInit() {

    /*this.getCountryCodes().subscribe((response: any) => {
      this.Countries = response;
    });*/

    //bafkreicz5b6mqsgqy4xh2zlximdyd4y2h3uumulax3t7sh55deqljgqd5q
  }

  viewFile = new FormGroup({
      fileCID: new FormControl()
  });

  async ViewFile() {
    this._matSnackBar.open('Opening File.......', 'Dismiss');
    try {
      const fileUrl = await pinata.gateways.createSignedURL({
        cid: `${ this.viewFile.value.fileCID }`,
        expires: 1800
      });
       window.location.href =  fileUrl;

    } catch (error) {
      console.log(error);
    }
  }

  async uploadFileToPinata(event: any) {
    if (event.target.files && event.target.files.length) {

      const _file = event.target.files[0];


      const res = await pinata.upload.file(_file);

      console.log('Res    ', res);
         
    }

  } 

}

