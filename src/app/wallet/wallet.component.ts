import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { Base64 } from 'js-base64';
import { PinataSDK } from 'pinata';

import { TruvityService, VerifiableCredential } from '../truvity.service';


const pinata = new PinataSDK({
  pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmYmQxODlhMS00OTIwLTQ4MGItYWU1ZS1hZDUwMTMyOWNmODUiLCJlbWFpbCI6ImtlcGhvdGhvbWVkaWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjIxYzM1ZGZhM2NhZThkZmVkMzQ2Iiwic2NvcGVkS2V5U2VjcmV0IjoiZWQ4MTFkM2ZhMzdiNjI5ZWVkMDJlNWZhMGQ0ODFjMTI2OWJkNzQ3MDUyMGM4OThlODRlNzVmNDIzYTYxMDU2MCIsImV4cCI6MTc2MDk5NTY1OH0.ir293WSX6PMKEklTZBzgt7_6PY7saE--TuTNXprvOfI",
  pinataGateway: "amaranth-past-ladybug-860.mypinata.cloud"
});


const PinataJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmYmQxODlhMS00OTIwLTQ4MGItYWU1ZS1hZDUwMTMyOWNmODUiLCJlbWFpbCI6ImtlcGhvdGhvbWVkaWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjIxYzM1ZGZhM2NhZThkZmVkMzQ2Iiwic2NvcGVkS2V5U2VjcmV0IjoiZWQ4MTFkM2ZhMzdiNjI5ZWVkMDJlNWZhMGQ0ODFjMTI2OWJkNzQ3MDUyMGM4OThlODRlNzVmNDIzYTYxMDU2MCIsImV4cCI6MTc2MDk5NTY1OH0.ir293WSX6PMKEklTZBzgt7_6PY7saE--TuTNXprvOfI"

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatDividerModule,
    MatSnackBarModule,
    MatExpansionModule
  ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements OnInit, AfterViewInit {
  VCs?: VerifiableCredential[];
  VC?: string;
  IdentificationDocCID?: string;
  CreditReportDocCID?: string;
  EmploymentContractDocCID?: string;
  BirthRecordDocCID?: string;
  MunicipalRegDocCID?: string;
  BankAccountDocCID?: string;
  WalletDID?: string;
  EntityDID?: string;
  EmploymentVC?: string = 'did:uuid:ad13c53c-f593-4646-9c2b-25442d5a15bd';

  constructor(
    private _truvityService: TruvityService,
    public _matSnackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    await this.GetVCs();

    const entitiesOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
      }
    };

    await fetch(`https://api.truvity.com/api/wallet/v1/entities`, entitiesOptions)
      .then(async (response: any) => {
        const data = await response.json();

        console.log('Entities:    ', data);

        this.EntityDID = data[3]['EntityDid'];
        window.localStorage.setItem('UserEntityDiD', data[2]['EntityDid']);
      })
      .catch(err => console.error(err));


    const walletOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
      },
    };

    await fetch(`https://api.truvity.com/api/wallet/v1/wallets?entityDid=${window.localStorage.getItem('UserEntityDiD')}`, walletOptions)
      .then(async (response: any) => {
        const data = await response.json();

        console.log('Wallets:   ', data);
        window.localStorage.removeItem('UserWalletDiD');
        window.localStorage.setItem('UserWalletDiD', `${data[0]['WalletDid']}`);
      })
      .catch(err => console.error(err));


    //console.log(result);

    /*const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "pZ99fnnlQ8yC9dKky_Ql6RvyW56UqQwByIAnkarIgL0e5D5ttAkjd-_BPDPAM5bLto4JWVvyRxCr1Xj0RB6-wKABwfZ4FQsYAOM3Vnq6qdBb2YPlD1YD27Dud5tRgEjISJoZ9ZNTz7Q_GbAfzQ72KxabDLJLX2hlarGJa1tbsHiLcH1ORsXV2inSWm56df2thKJQCfR-l9qNptmNEoJA3W8hzBvh8dGBMln4kxarU0cy8bY8C_aKmdaMsbMenh3gasYfMsQ-DZTLnWZOGOanr_H6jmqKJmq2xiQ3i4lyiJkPXjM9-H35Vt6Hv8gJT9x-QBjDfxJ15eDwmaAK2lRn2g"
  },
  body: JSON.stringify({
      MetaData: {
        Labels: {
            "Employment Contract": "Get Employment Contract",
            "Visa Application": "Apply For Visa",
            "Municipality": "Register With Municipality",
            "Bank Account": "Open Bank Account",
            "Housing": "Get A House"
          },
          Annotations: {
              "Employment Contract": "Get Employment Contract",
              "Visa Application": "Apply For Visa",
              "Municipality": "Register With Municipality",
              "Bank Account": "Open Bank Account",
              "Housing": "Get A House"
          }
      }
  })
  };
  
  await fetch(`https://api.truvity.com/api/wallet/v1/entity`, options)
    .then((response: any) =>  {
      console.log(response.json());
    })
    .then((response: any) => {
      console.log('-----> ', response)
      result = response;
    })
    .catch(err => console.error(err));*/

  }



  async ngAfterViewInit() {
    if (window.localStorage.getItem('UserWalletDiD') == null || window.localStorage.getItem('UserWalletDiD') == undefined) {
      alert('You havent Created Wallet Yet');

      const options = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
        },
        body: JSON.stringify({
          MetaData: {
            Labels: {
            },
            Annotations: {

            }
          }
        })
      };

      await fetch(`https://api.truvity.com/api/wallet/v1/wallet?entityDid=${window.localStorage.getItem('UserEntityDiD')}`, options)
        .then(async (response: any) => {
          const data = await response.json();

          window.localStorage.setItem('UserWalletDiD', `${data['WalletDid']}`);
          this.WalletDID = data['WalletDid'];
        })
        .catch(err => console.error(err));

    } else {
      this.WalletDID = `${window.localStorage.getItem('UserWalletDiD')}`;
    }

  }

  submitFiles = new FormGroup({
    identificationDocCID: new FormControl(),
    creditReportDocCID: new FormControl(),
    employmentContractCID: new FormControl(),
  })

  createWallet = new FormGroup({
    name: new FormControl(),
  });

  employmentContract = new FormGroup({
    employmentLetterVC: new FormControl(),
  });



  applyForVisa = new FormGroup({
    identificationDocCID: new FormControl(),
    creditReportDocCID: new FormControl(),
    employmentContractCID: new FormControl()
  });

  municipalRegistration = new FormGroup({
    identificationDocCID: new FormControl(),
    birthRecordDocCID: new FormControl(),
    employmentContractCID: new FormControl()
  });

  openbankAccount = new FormGroup({
    identificationDocCID: new FormControl(),
    municipalRegDocCID: new FormControl(),
    employmentContractCID: new FormControl()
  });

  signRentalAgreement = new FormGroup({
    identificationDocCID: new FormControl(),
    bankAccountDocCID: new FormControl(),
    employmentContractCID: new FormControl()
  });


  async CreateWallet() {

    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
      },
      body: JSON.stringify({
        MetaData: {
          Labels: {

          },
          Annotations: {

          }
        }
      })
    };

    await fetch(`https://api.truvity.com/api/wallet/v1/wallet?entityDid=${window.localStorage.getItem('UserEntityDiD')}`, options)
      .then(async (response: any) => {
        const data = await response.json();

        window.localStorage.setItem('WalletDiD', `${data[0]}`);
      })
      .catch(err => console.error(err));

  }

  GetEmploymentOfferLetterVC() {
    this._truvityService.GetEmploymentOfferLetterVC();


    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }


  VisaApplication() {
    this._truvityService.VisaApplication(`${this.IdentificationDocCID}`,
      `${this.CreditReportDocCID}`, `${this.EmploymentContractDocCID}`);


    setTimeout(() => {
      window.location.reload();
    }, 5000);

  }

  MunicipalRegistration() {
    this._truvityService.RegisterWithMunicipality(`${this.IdentificationDocCID}`,
      `${this.EmploymentContractDocCID}`, `${this.BirthRecordDocCID}`);


    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }

  OpenBankAccount() {
    this._truvityService.OpenBankAccount(`${this.IdentificationDocCID}`,
      `${this.EmploymentContractDocCID}`, `${this.MunicipalRegDocCID}`);


    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }

  RentalAgreement() {
    this._truvityService.RentalAgreement(`${this.IdentificationDocCID}`,
      `${this.EmploymentContractDocCID}`, `${this.BankAccountDocCID}`);


    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }


  async GetVCs() {
    const VCsOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
      }
    };

    await fetch(`https://api.truvity.com/api/wallet/v1/credentials?walletDid=${window.localStorage.getItem('UserWalletDiD')}&entityDid=${window.localStorage.getItem('UserEntityDiD')}&getBodies=true&state=draft`, VCsOptions)
      .then(async (response: any) => {
        const data = await response.json();

        this.VCs = data;
        console.log(this.VCs)


      })
      .catch(err => console.error(err));

  }

  async GetVC(vc: VerifiableCredential) {
    const getVCOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
      }
    };

    await fetch(`https://api.truvity.com/api/wallet/v1/credential/${vc.CredentialDid}?walletDid=${vc.WalletDid}&entityDid=${vc.EntityDid}&getBodies=true`, getVCOptions)
      .then(async (response: any) => {
        const data = await response.json();

        this.VC = Base64.decode(data.JsonLd);
      })
      .catch(err => console.error(err));

  }


  async DeleteVC(vc: VerifiableCredential) {
    const deleteVCOptions = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
      }
    };

    await fetch(`https://api.truvity.com/api/wallet/v1/credential/${vc.CredentialDid}?walletDid=${vc.WalletDid}&entityDid=${vc.EntityDid}&getBodies=true`, deleteVCOptions)
      .then(async (response: any) => {
        this._matSnackBar.open(`${JSON.stringify(await response)}`, 'Dismiss');
      })
      .catch(err => console.error(err));

  }





  async uploadIdentificationDoc(event: any) {
    if (event.target.files && event.target.files.length) {

      const _file = event.target.files[0];

      const res = await pinata.upload.file(_file);
      this.IdentificationDocCID = res.cid;
    }

  }

  async uploadCreditReportDoc(event: any) {
    if (event.target.files && event.target.files.length) {

      const _file = event.target.files[0];

      const res = await pinata.upload.file(_file);
      this.CreditReportDocCID = res.cid;
    }

  }

  async uploadEmploymentContractDoc(event: any) {
    if (event.target.files && event.target.files.length) {

      const _file = event.target.files[0];

      const res = await pinata.upload.file(_file);
      this.EmploymentContractDocCID = res.cid;
    }

  }


  async uploadMunicipalRegDoc(event: any) {
    if (event.target.files && event.target.files.length) {

      const _file = event.target.files[0];

      const res = await pinata.upload.file(_file);
      this.MunicipalRegDocCID = res.cid;
    }

  }

  async uploadBirthRecordDoc(event: any) {
    if (event.target.files && event.target.files.length) {

      const _file = event.target.files[0];

      const res = await pinata.upload.file(_file);
      this.BirthRecordDocCID = res.cid;
    }

  }

  async uploadBankAccountDoc(event: any) {
    if (event.target.files && event.target.files.length) {

      const _file = event.target.files[0];

      const res = await pinata.upload.file(_file);
      this.BankAccountDocCID = res.cid;
    }

  }


  async deleteFile(file: string) {
    const deletedFiles = await pinata.files.delete([
      `${file}`
    ]);


  }

}



declare module 'jsonld';

