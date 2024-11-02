import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { TruvityService, VerifiableCredential } from '../truvity.service';


import { 
  Truvity,
  TruvityClient,
  VcContext, 
  VcClaim,
  VcLinkedFileClaim,
  VcNotEmptyClaim,
  LinkedFile,
  VcLinkedCredentialClaim,
  LinkedCredential
} from "truvity";

import { Base64 } from 'js-base64';


const client = new TruvityClient({
  environment: "https://api.truvity.cloud",
  apiKey: "CYEIXGLMlhLNjwOwnOvbpd8MDc16wVgQtM9KoSk0za5iniV-prBPybhQ2IH_9SZQ3WFCOwR3ERBDpU7E33zSoq35SCVwI7eq-kNtkcQ7Ir3sz-ws_UIlv4mSqiGn0829HZRSodFPmHtpsOVVPS-4Dxb5eQaPCHyS1ZC94DU6x6t3PXyy2sLqX8s90SB2V4gJOg5FKWrU0f_97HwZo96z9uDKLQefw_KpkgHWYNeW-DbyUiqTQtXULCOytYpDB5D_NGebDiDYDxnk3SKp87crdlV9w8A71RqQmfQqfizTuiQ_NIRZORhmhLwuAVzjaZkPaZhfNOV-Qeas3EmKs0W6Pw"
});  


@Component({
  selector: 'app-admin',
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
    MatListModule,
    MatExpansionModule,
    MatSnackBarModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit, AfterViewInit {
  EntityDID?: string;
  WalletDID?: string;
  VCs?: VerifiableCredential[];
  VC?: string;

  constructor (
    public _matSnackBar: MatSnackBar,
    private _truvityService: TruvityService
  ) {}



  async ngOnInit() {
    await this.GetVCs();

    const options0 = {
  method: 'GET',
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
}
};

await fetch(`https://api.truvity.com/api/wallet/v1/entities`, options0)
  .then( async (response: any) =>  {
    const data =  await response.json();
    
    window.localStorage.setItem('AdminEntityDiD', data[0]['EntityDid']);
    this.EntityDID = data[0]['EntityDid'];
  })
  .catch(err => console.error(err));



  const options = {
  method: 'GET',
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
  },
};

await fetch(`https://api.truvity.com/api/wallet/v1/wallets?entityDid=${ window.localStorage.getItem('AdminEntityDiD') }`, options)
  .then(async (response: any) =>  {
    const data = await response.json();

    window.localStorage.setItem('AdminWalletDiD', `${ data[0]['WalletDid']}`);
  })
  .catch(err => console.error(err));


  //console.log(result);


  /*
  const options = {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "gKh2C_fotIM8KZ73hXpHztDP3NDeZRnLLUFiy8L0O05X4A2HC-q2wvaPKnP1TxmwCV1IOxCwMm9jSCpBtC1tRGLr695iwLiQFF7I89bU3Zr9yQIAMy_lMN8A6PP1UsJSJMT3bbG6KqAKD8wX2-zMf8WqhxiUXz9roNpwaIVixsSuoEyRqDzyO8gnGD4RmDM1h8YCpXNH5vBrV1P3z-NlM8GgJY1RAJMM5KXzn8nlu8GHMaxxDDSNNp9X8trLI9WtV6NumY0PKIFonRR2OykeDotyqdNzEGmx0Z7bAs3fkmOVa1NYO7UrerAElsFsnccHbOx6lgUwNlv4lSdVgFcbNA"
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
  .then(async (response: any) =>  {
    const data = await response.json();

    console.log(data);
  })
  .catch(err => console.error(err));

  */

  }

  async ngAfterViewInit() {
    if(window.localStorage.getItem('AdminWalletDiD') == null || window.localStorage.getItem('AdminWalletDiD') == undefined ) {
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
  
      await fetch(`https://api.truvity.com/api/wallet/v1/wallet?entityDid=${ window.localStorage.getItem('AdminEntityDiD') }`, options)
        .then(async (response: any) =>  {
          const data = await response.json();

          window.localStorage.setItem('AdminWalletDiD', `${ data['WalletDid'] }`);
          this.WalletDID = data['WalletDid'];      
      })
      .catch(err => console.error(err));


    } else {
      this.WalletDID = `${ window.localStorage.getItem('AdminWalletDiD') }`;
    }
  }



  async GetVC(vc: VerifiableCredential) {
    const getVCOptions = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
      }
    };

    await fetch(`https://api.truvity.com/api/wallet/v1/credential/${ vc.CredentialDid }?walletDid=${ vc.WalletDid }&entityDid=${ vc.EntityDid }&getBodies=true`, getVCOptions)
      .then(async (response: any) => {
        const data = await response.json();

        this.VC =  Base64.decode(data.JsonLd);
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

    await fetch(`https://api.truvity.com/api/wallet/v1/credential/${ vc.CredentialDid }?walletDid=${ window.localStorage.getItem('AdminWalletDiD') }&entityDid=${ window.localStorage.getItem('AdminEntityDiD') }&getBodies=true`, deleteVCOptions)
      .then(async (response: any) => {
        this._matSnackBar.open(`${ JSON.stringify(await response)}`, 'Dismiss');
      })
      .catch(err => console.error(err));

  }


  async CreateEmploymentVC() {

    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "IonuDb7RVQykSDTs9IXkGctCRT6rfjkKg8cZajVCaWodHr_DbJSjq6jdMN3JfAKKIBr_uxXYxX63Ba2FNC-LEtuN0uIEcJISDGzk59LWTs6EHF8aS1kZ1ov_89K0Qg-3BAKtykZCAx_SWK8_kYHryBDSHPb_p1DgqGwTJSCZ6Z9jGOIa0uSXJDxTaunVGWJ6rAMfVjJFj62A3zQ_LyWxQe3fRXc8Xv5srgYkaUPXT6DAHt9P4VlD0EnMz9Quugx3LF35_8jzUpkqj6AdE4bh2ZUzLN1UMIT9vthiJnzgNUkOhn2LANJm5MbJs_qLI2TJvgxAlYEdQYlphPHhwhKk-w"
    },
    body: JSON.stringify({
        JsonLd: "VHJ1dml0eSBsZWFkZXJzIGluIFNTSSBhbmQgZGlnaXRhbCBpZGVudGl0eS4=",
        MetaData: {
          Labels: {
            
          },
          Annotations: {
             
          }
        }
    })
    };
    
    await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ window.localStorage.getItem('AdminWalletDiD') }&entityDid=${ window.localStorage.getItem('AdminEntityDiD') }`, options)
      .then(async (response: any) =>  {
        const data = await response.json();
    
        console.log(data);
      })
      .catch(err => console.error(err));
  }


  async startVCVerification(vc: VerifiableCredential) {
    this.VC = JSON.stringify(vc);

  }

  claimDataForm = new FormGroup({
    vc: new FormControl(),
    claimData: new FormControl(),
  })

  VerifyVC() {
    this._truvityService.ExpatriateCredential(this.claimDataForm.value.vc, this.claimDataForm.value.claimData);
  }

  
  async GetVCs() {

    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
    }
  };
    
    await fetch(`https://api.truvity.com/api/wallet/v1/credentials?walletDid=${ window.localStorage.getItem('AdminWalletDiD') }&entityDid=${ window.localStorage.getItem('AdminEntityDiD') }&revision=1&state=draft`, options)
      .then(async (response: any) =>  {
        const data = await response.json();

        console.log('VCs     ', data);
    
        this.VCs = data;
      })
      .catch(err => console.error(err));
  }

  
  

}

export interface VC {
    Created: string;
    CredentialDid: string;
    EntityDid: string;
    Revision: string;
    State: string;
    Updated: string;
    WalletDid: string;
}


declare module 'jsonld';

