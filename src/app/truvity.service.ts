import { Injectable } from '@angular/core';

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

@VcContext({ name: 'ExpatriateCredential', namespace: 'https://www.w3.org/ns/credentials/issuer-dependent' })
class ExpatriateCredential {
    @VcClaim
    data?: any;
}

@VcContext({ name: "EmploymentOffer", namespace: "https://www.w3.org/ns/credentials/issuer-dependent" })
class EmploymentOffer {
    @VcNotEmptyClaim
    pinataCID!: string;
}



@VcContext({ name: "ProofOfIdentity", namespace: "https://www.w3.org/ns/credentials/issuer-dependent" })
class ProofOfIdentity {
    @VcNotEmptyClaim
    pinataCID!: string;
}

@VcContext({ name: "BirthRecord", namespace: "https://www.w3.org/ns/credentials/issuer-dependent" })
class BirthRecord {
    @VcNotEmptyClaim
    pinataCID!: string;
}

@VcContext({ name: "BankingAccount", namespace: "https://www.w3.org/ns/credentials/issuer-dependent" })
class BankAccount {
    @VcNotEmptyClaim
    pinataCID!: string;
}


@VcContext({ name: "EmploymentContract", namespace: "https://www.w3.org/ns/credentials/issuer-dependent" })
class EmploymentContract {
    @VcNotEmptyClaim
    pinataCID!: string;
}

@VcContext({ name: "CreditReport", namespace: "https://www.w3.org/ns/credentials/issuer-dependent" })
class CreditReport {
    @VcNotEmptyClaim
    pinataCID!: string;
}




@VcContext({ name: "MunicipalityReg", namespace: "https://www.w3.org/ns/credentials/issuer-dependent" })
class MunicipalReg {
    @VcNotEmptyClaim
    pinataCID!: string;
}






@VcContext({ name: "VisaApplication", namespace: "https://www.w3.org/ns/credentials/issuer-dependent" })
class VisaApplication {
    @VcLinkedCredentialClaim(ProofOfIdentity)
    @VcNotEmptyClaim
    proofOfIdentity?: LinkedCredential<ProofOfIdentity>; 


    @VcLinkedCredentialClaim(EmploymentContract)
    @VcNotEmptyClaim
    employmentContract!: LinkedCredential<EmploymentContract>; 


    @VcLinkedCredentialClaim(CreditReport)
    @VcNotEmptyClaim
    creditReport!: LinkedCredential<CreditReport>;
}



@VcContext({ name: "MunicipalityRegistration", namespace: "https://www.w3.org/ns/credentials/issuer-dependent" })
class MunicipalRegistration {
  @VcLinkedCredentialClaim(ProofOfIdentity)
  @VcNotEmptyClaim
  proofOfIdentity?: LinkedCredential<ProofOfIdentity>; 


  @VcLinkedCredentialClaim(EmploymentContract)
  @VcNotEmptyClaim
  employmentContract!: LinkedCredential<EmploymentContract>; 


  @VcLinkedCredentialClaim(BirthRecord)
  @VcNotEmptyClaim
  birthRecord!: LinkedCredential<BirthRecord>;
}

@VcContext({ name: "OpenBankAccount", namespace: "https://www.w3.org/ns/credentials/issuer-dependent" })
class OpenBankAccount {
  @VcLinkedCredentialClaim(ProofOfIdentity)
  @VcNotEmptyClaim
  proofOfIdentity!: LinkedCredential<ProofOfIdentity>; 


  @VcLinkedCredentialClaim(EmploymentContract)
  @VcNotEmptyClaim
  employmentContract!: LinkedCredential<EmploymentContract>; 


  @VcLinkedCredentialClaim(MunicipalReg)
  @VcNotEmptyClaim
  municipalReg!: LinkedCredential<MunicipalReg>;
}

@VcContext({ name: "RentalAgreement", namespace: "https://www.w3.org/ns/credentials/issuer-dependent" })
class RentalAgreement {
  @VcLinkedCredentialClaim(ProofOfIdentity)
  @VcNotEmptyClaim
  proofOfIdentity?: LinkedCredential<ProofOfIdentity>; 


  @VcLinkedCredentialClaim(EmploymentContract)
  @VcNotEmptyClaim
  employmentContract!: LinkedCredential<EmploymentContract>; 


  @VcLinkedCredentialClaim(BankAccount)
  @VcNotEmptyClaim
  bankAccount!: LinkedCredential<BankAccount>;
}





const expatriateCredential = client.createVcDecorator(ExpatriateCredential);
const employmentOffer = client.createVcDecorator(EmploymentOffer);
const proofOfIdentity = client.createVcDecorator(ProofOfIdentity);
const employmentContract = client.createVcDecorator(EmploymentContract);
const creditReport = client.createVcDecorator(CreditReport);
const birthRecord = client.createVcDecorator(BirthRecord);
const municipalReg = client.createVcDecorator(MunicipalReg);
const bankAccount = client.createVcDecorator(BankAccount);

const visaApplication = client.createVcDecorator(VisaApplication);
const municipalRegistration = client.createVcDecorator(MunicipalRegistration);
const openBankAccount = client.createVcDecorator(OpenBankAccount);
const rentalAgreement = client.createVcDecorator(RentalAgreement);




@Injectable({
  providedIn: 'root'
})
export class TruvityService {

  constructor() { }

  async GetEmploymentOfferLetterVC() {
    const key = await client.keys.keyGenerate({ data: { type: 'ED25519' } });


    const draftVC = await employmentOffer.create({
      claims: {
        pinataCID: 'bafkreidlrtfge6mtpiybgeyevtjrxev6icmbwaxbcvdrxzvvwnqdm2kjt'
      }
    });
 
    const issuedVC = await draftVC.issue(key.id);

    const verificationResult = await issuedVC.verify();
    const employmentVCOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
      },
      body: JSON.stringify({
        JsonLD:  Base64.encode(JSON.stringify(issuedVC)),
        MetaData: {
          Labels: {
            "Employment Offer Letter VC": "Employment Offer Letter VC"
          },
          Annotations: {
            "Employment Offer Letter VC": "Employment Offer Letter VC"
          }
        }
      })
    };

    await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ window.localStorage.getItem('UserWalletDiD')}&entityDid=${ window.localStorage.getItem('UserEntityDiD')  }`, employmentVCOptions)
      .then(async (response: any) => {
        const data = await response.json();
      })
      .catch(err => console.error(err));  


  }



  async VisaApplication(identificationDoc: string, creditReportDoc: string, employmentContractDoc: string ) {
    const key = await client.keys.keyGenerate({ data: { type: 'ED25519' } });

    const proofOfIdentityDraft = await proofOfIdentity.create({
      claims: {
        pinataCID: identificationDoc
      }
    });

    const proofOfIdentityDraftVCOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
      },
      body: JSON.stringify({
        JsonLD:  Base64.encode(JSON.stringify(proofOfIdentityDraft)),
        MetaData: {
          Labels: {
            "Proof of Identity VC": "Proof Of Identity VC"
          },
          Annotations: {
            "Proof of Identity VC": "Proof Of Identity VC"
          }
        }
      })
    };

    await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ window.localStorage.getItem('UserWalletDiD')}&entityDid=${ window.localStorage.getItem('UserEntityDiD')  }`, proofOfIdentityDraftVCOptions)
      .then(async (response: any) => {
        const data = await response.json();
      })
      .catch(err => console.error(err));

    const creditReportDraft = await creditReport.create({
      claims: {
        pinataCID: creditReportDoc
      }
    });

    const creditReportDraftVCOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
      },
      body: JSON.stringify({
        JsonLD:  Base64.encode(JSON.stringify(creditReportDraft)),
        MetaData: {
          Labels: {
            "Credit Report VC": "Credit Report VC"
          },
          Annotations: {
            "Credit Report VC": "Credit Report VC"
          }
        }
      })
    };

    await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ window.localStorage.getItem('UserWalletDiD') }&entityDid=${ window.localStorage.getItem('UserEntityDiD')  }`, creditReportDraftVCOptions)
      .then(async (response: any) => {
        const data = await response.json();
      })
      .catch(err => console.error(err));

    const employmentContractDraft = await employmentContract.create({
      claims: {
        pinataCID: employmentContractDoc
      }
    });

    const employmentContractDraftVCOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
      },
      body: JSON.stringify({
        JsonLD:  Base64.encode(JSON.stringify(employmentContractDraft)),
        MetaData: {
          Labels: {
            "Employment Contract VC": "Employment Contract VC"
          },
          Annotations: {
            "Employment Contract VC": "Employment Contract VC"
          }
        }
      })
    };

    await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ window.localStorage.getItem('UserWalletDiD') }&entityDid=${ window.localStorage.getItem('UserEntityDiD')  }`, employmentContractDraftVCOptions)
      .then(async (response: any) => {
        const data = await response.json();
      })
      .catch(err => console.error(err));


      const proofOfIdentityVC: any = await proofOfIdentityDraft.issue(key.id);
      const creditReportVC: any = await creditReportDraft.issue(key.id)
      const employmentContractVC: any = await employmentContractDraft.issue(key.id)

      const visaApplicationDraftVC = await visaApplication.create({
        claims: {
          proofOfIdentity: proofOfIdentityVC,
          creditReport: creditReportVC,
          employmentContract: employmentContractVC
        }
      });


      await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ window.localStorage.getItem('AdminWalletDiD')  }&entityDid=${ window.localStorage.getItem('AdminEntityDiD')  }`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
        },
        body: JSON.stringify({
          JsonLD:  Base64.encode(JSON.stringify({
            proofOfIdentity: proofOfIdentityVC,
            creditReport: creditReportVC,
            employmentContract: employmentContractVC
          })),
          MetaData: {
            Labels: {
              "Visa Application VCs": "Visa Application  VCs"
            },
            Annotations: {
              "Visa Application VCs": "Visa Application VCs"
            }
          }
        })
      })
        .then(async (response: any) => {
          const data = await response.json(); 
  
        })
        .catch(err => console.error(err));

      const visaApplicationDraftVCOptions = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
        },
        body: JSON.stringify({
          JsonLD:  Base64.encode(JSON.stringify(visaApplicationDraftVC)),
          MetaData: {
            Labels: {
              "Visa Application Draft VC": "Visa Application Draft VC"
            },
            Annotations: {
              "Visa Application Draft VC": "Visa Application Draft VC"
            }
          }
        })
      };
  
      await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ window.localStorage.getItem('AdminWalletDiD')  }&entityDid=${ window.localStorage.getItem('AdminEntityDiD')  }`, visaApplicationDraftVCOptions)
        .then(async (response: any) => {
          const data = await response.json();  
        })
        .catch(err => console.error(err));

  }



  async RegisterWithMunicipality(identificationDoc: string, employmentContractDoc: string, birthRecordDoc: string ) {
    const key = await client.keys.keyGenerate({ data: { type: 'ED25519' } });

    const proofOfIdentityDraft = await proofOfIdentity.create({
      claims: {
        pinataCID: identificationDoc
      }
    });

    const proofOfIdentityDraftOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
      },
      body: JSON.stringify({
        JsonLD:  Base64.encode(JSON.stringify(proofOfIdentityDraft)),
        MetaData: {
          Labels: {
            "Proof of Identity VC": "Proof Of Identity VC"
          },
          Annotations: {
            "Proof of Identity VC": "Proof Of Identity VC"
          }
        }
      })
    };

    await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ window.localStorage.getItem('UserWalletDiD') }&entityDid=${ window.localStorage.getItem('UserEntityDiD')  }`, proofOfIdentityDraftOptions)
      .then(async (response: any) => {
        const data = await response.json();
      })
      .catch(err => console.error(err));

    const birthRecordDraft = await birthRecord.create({
      claims: {
        pinataCID: birthRecordDoc
      }
    });

    const birthRecordsDraftOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
      },
      body: JSON.stringify({
        JsonLD:  Base64.encode(JSON.stringify(birthRecordDraft)),
        MetaData: {
          Labels: {
            "Birth Records VC": "Birth Records VC"
          },
          Annotations: {
            "Birth Records VC": "Birth Records VC"
          }
        }
      })
    };

    await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ window.localStorage.getItem('UserWalletDiD') }&entityDid=${ window.localStorage.getItem('UserEntityDiD')  }`, birthRecordsDraftOptions)
      .then(async (response: any) => {
        const data = await response.json();
      })
      .catch(err => console.error(err));

    const employmentContractDraft = await employmentContract.create({
      claims: {
        pinataCID: employmentContractDoc
      }
    });

    const employmentContractDraftOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
      },
      body: JSON.stringify({
        JsonLD:  Base64.encode(JSON.stringify(employmentContractDraft)),
        MetaData: {
          Labels: {
            "Employment Contract VC": "Employment Contract VC"
          },
          Annotations: {
            "Employment Contract VC": "Employment Contract VC"
          }
        }
      })
    };

    await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ window.localStorage.getItem('UserWalletDiD') }&entityDid=${ window.localStorage.getItem('UserEntityDiD')  }`, employmentContractDraftOptions)
      .then(async (response: any) => {
        const data = await response.json();
      })
      .catch(err => console.error(err));


      const proofOfIdentityVC: any = await proofOfIdentityDraft.issue(key.id);
      const birthRecordVC: any = await birthRecordDraft.issue(key.id)
      const employmentContractVC: any = await employmentContractDraft.issue(key.id)

      const municipalRegistrationDraftVC = await municipalRegistration.create({
        claims: {
          proofOfIdentity: proofOfIdentityVC,
          birthRecord: birthRecordVC,
          employmentContract: employmentContractVC
        }
      });

      await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ window.localStorage.getItem('AdminWalletDiD')  }&entityDid=${ window.localStorage.getItem('AdminEntityDiD')  }`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
        },
        body: JSON.stringify({
          JsonLD:  Base64.encode(JSON.stringify({
            proofOfIdentity: proofOfIdentityVC,
          birthRecord: birthRecordVC,
          employmentContract: employmentContractVC
          })),
          MetaData: {
            Labels: {
              "Municipality Registration VCs": "Municipality Registration  VCs"
            },
            Annotations: {
              "Municipality Registration VCs": "Municipality Registration  VCs"
            }
          }
        })
      })
        .then(async (response: any) => {
          const data = await response.json();   
        })
        .catch(err => console.error(err));

      const municipalRegistrationDraftVCOptions: any = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
        },
        body: JSON.stringify({
          JsonLD:  Base64.encode(JSON.stringify(municipalRegistrationDraftVC)),
          MetaData: {
            Labels: {
              "Municipality Registration Draft VC": "Municipality Registration Draft VC"
            },
            Annotations: {
              "Municipality Registration Draft VC": "Municipality Registration Draft VC"
            }
          }
        })
      };
  
      await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ window.localStorage.getItem('AdminWalletDiD')  }&entityDid=${ window.localStorage.getItem('AdminEntityDiD')  }`, municipalRegistrationDraftVCOptions)
        .then(async (response: any) => {
          const data = await response.json(); 
        })
        .catch(err => console.error(err));    
  }


  async OpenBankAccount(identificationDoc: string, employmentContractDoc: string, municipalRegDoc: string ) {
    const key = await client.keys.keyGenerate({ data: { type: 'ED25519' } });

    const proofOfIdentityDraft = await proofOfIdentity.create({
      claims: {
        pinataCID: identificationDoc
      }
    });

    const proofOfIdentityDraftOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
      },
      body: JSON.stringify({
        JsonLD:  Base64.encode(JSON.stringify(proofOfIdentityDraft)),
        MetaData: {
          Labels: {
            "Proof of Identity VC": "Proof Of Identity VC"
          },
          Annotations: {
            "Proof of Identity VC": "Proof Of Identity VC"
          }
        }
      })
    };

    await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ window.localStorage.getItem('UserWalletDiD') }&entityDid=${ window.localStorage.getItem('UserEntityDiD')  }`, proofOfIdentityDraftOptions)
      .then(async (response: any) => {
        const data = await response.json();
      })
      .catch(err => console.error(err));

    const municipalRegDraft = await municipalReg.create({
      claims: {
        pinataCID: municipalRegDoc
      }
    });

    const municipalRegDraftOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
      },
      body: JSON.stringify({
        JsonLD:  Base64.encode(JSON.stringify(municipalRegDraft)),
        MetaData: {
          Labels: {
            "Birth Records VC": "Birth Records VC"
          },
          Annotations: {
            "Birth Records VC": "Birth Records VC"
          }
        }
      })
    };

    await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ window.localStorage.getItem('UserWalletDiD') }&entityDid=${ window.localStorage.getItem('UserEntityDiD')  }`, municipalRegDraftOptions)
      .then(async (response: any) => {
        const data = await response.json();
      })
      .catch(err => console.error(err));

    const employmentContractDraft = await employmentContract.create({
      claims: {
        pinataCID: employmentContractDoc
      }
    });

    const employmentContractDraftOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
      },
      body: JSON.stringify({
        JsonLD:  Base64.encode(JSON.stringify(employmentContractDraft)),
        MetaData: {
          Labels: {
            "Employment Contract VC": "Employment Contract VC"
          },
          Annotations: {
            "Employment Contract VC": "Employment Contract VC"
          }
        }
      })
    };

    await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ window.localStorage.getItem('UserWalletDiD') }&entityDid=${ window.localStorage.getItem('UserEntityDiD')  }`, employmentContractDraftOptions)
      .then(async (response: any) => {
        const data = await response.json();
      })
      .catch(err => console.error(err));


      const proofOfIdentityVC: any = await proofOfIdentityDraft.issue(key.id);
      const municipalRegVC: any = await municipalRegDraft.issue(key.id)
      const employmentContractVC: any = await employmentContractDraft.issue(key.id)

      const openBankAccountDraftVC = await openBankAccount.create({
        claims: {
          proofOfIdentity: proofOfIdentityVC,
          employmentContract: employmentContractVC,
          municipalReg: municipalRegVC,
        }
      });

      await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ window.localStorage.getItem('AdminWalletDiD')  }&entityDid=${ window.localStorage.getItem('AdminEntityDiD')  }`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
        },
        body: JSON.stringify({
          JsonLD:  Base64.encode(JSON.stringify({
            proofOfIdentity: proofOfIdentityVC,
          employmentContract: employmentContractVC,
          municipalReg: municipalRegVC
          })),
          MetaData: {
            Labels: {
              "Bank Account Opening VCs": "Bank Account Opening  VCs"
            },
            Annotations: {
              "Bank Account Opening VCs": "Bank Account Opening  VCs"
            }
          }
        })
      })
        .then(async (response: any) => {
          const data = await response.json(); 
  
        })
        .catch(err => console.error(err));

      const openBankAccountDraftVCOptions: any = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
        },
        body: JSON.stringify({
          JsonLD:  Base64.encode(JSON.stringify(openBankAccountDraftVC)),
          MetaData: {
            Labels: {
              "Bank Account Opening Draft VC": "Bank Account Opening Draft VC"
            },
            Annotations: {
              "Bank Account Opening Draft VC": "Bank Account Opening Draft VC"
            }
          }
        })
      };
  
      await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ window.localStorage.getItem('AdminWalletDiD')  }&entityDid=${ window.localStorage.getItem('AdminEntityDiD')  }`, openBankAccountDraftVCOptions)
        .then(async (response: any) => {
          const data = await response.json(); 
        })
        .catch(err => console.error(err));    
  }


  async RentalAgreement(identificationDoc: string, employmentContractDoc: string, bankAccountDoc: string ) {
    const key = await client.keys.keyGenerate({ data: { type: 'ED25519' } });

    const proofOfIdentityDraft = await proofOfIdentity.create({
      claims: {
        pinataCID: identificationDoc
      }
    });

    const proofOfIdentityDraftOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
      },
      body: JSON.stringify({
        JsonLD:  Base64.encode(JSON.stringify(proofOfIdentityDraft)),
        MetaData: {
          Labels: {
            "Proof of Identity VC": "Proof Of Identity VC"
          },
          Annotations: {
            "Proof of Identity VC": "Proof Of Identity VC"
          }
        }
      })
    };

    await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ window.localStorage.getItem('UserWalletDiD') }&entityDid=${ window.localStorage.getItem('UserEntityDiD')  }`, proofOfIdentityDraftOptions)
      .then(async (response: any) => {
        const data = await response.json();
      })
      .catch(err => console.error(err));

    const bankAccountDraft = await bankAccount.create({
      claims: {
        pinataCID: bankAccountDoc
      }
    });

    const bankAccountDraftOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
      },
      body: JSON.stringify({
        JsonLD:  Base64.encode(JSON.stringify(bankAccountDraft)),
        MetaData: {
          Labels: {
            "Birth Records VC": "Birth Records VC"
          },
          Annotations: {
            "Birth Records VC": "Birth Records VC"
          }
        }
      })
    };

    await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ window.localStorage.getItem('UserWalletDiD') }&entityDid=${ window.localStorage.getItem('UserEntityDiD')  }`, bankAccountDraftOptions)
      .then(async (response: any) => {
        const data = await response.json();
      })
      .catch(err => console.error(err));

    const employmentContractDraft = await employmentContract.create({
      claims: {
        pinataCID: employmentContractDoc
      }
    });

    const employmentContractDraftOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
      },
      body: JSON.stringify({
        JsonLD:  Base64.encode(JSON.stringify(employmentContractDraft)),
        MetaData: {
          Labels: {
            "Employment Contract VC": "Employment Contract VC"
          },
          Annotations: {
            "Employment Contract VC": "Employment Contract VC"
          }
        }
      })
    };

    await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ window.localStorage.getItem('UserWalletDiD') }&entityDid=${ window.localStorage.getItem('UserEntityDiD')  }`, employmentContractDraftOptions)
      .then(async (response: any) => {
        const data = await response.json();
      })
      .catch(err => console.error(err));

      const proofOfIdentityVC: any = await proofOfIdentityDraft.issue(key.id);
      const bankAccountVC: any = await bankAccountDraft.issue(key.id)
      const employmentContractVC: any = await employmentContractDraft.issue(key.id)

      const rentalAgreementDraftVC = await rentalAgreement.create({
        claims: {
          proofOfIdentity: proofOfIdentityVC,
          employmentContract: employmentContractVC,
          bankAccount: bankAccountVC          
        }
      });

      await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ window.localStorage.getItem('AdminWalletDiD')  }&entityDid=${ window.localStorage.getItem('AdminEntityDiD')  }`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
        },
        body: JSON.stringify({
          JsonLD:  Base64.encode(JSON.stringify({
            proofOfIdentity: proofOfIdentityVC,
          employmentContract: employmentContractVC,
          bankAccount: bankAccountVC
          })),
          MetaData: {
            Labels: {
              "Rental Agreement VCs": "Rental Agreement  VCs"
            },
            Annotations: {
              "Rental Agreement VCs": "Rental Agreement  VCs"
            }
          }
        })
      })
        .then(async (response: any) => {
          const data = await response.json(); 
  
        })
        .catch(err => console.error(err));

      const rentalAgreementDraftVCOptions: any = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
        },
        body: JSON.stringify({
          JsonLD:  Base64.encode(JSON.stringify(rentalAgreementDraftVC)),
          MetaData: {
            Labels: {
              "Rental Agreement Draft VC": "Rental Agreement Draft VC"
            },
            Annotations: {
              "Rental Agreement Draft VC": "Rental Agreement Draft VC"
            }
          }
        })
      };
  
      await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ window.localStorage.getItem('AdminWalletDiD')  }&entityDid=${ window.localStorage.getItem('AdminEntityDiD')  }`, rentalAgreementDraftVCOptions)
        .then(async (response: any) => {
          const data = await response.json();   
        })
        .catch(err => console.error(err));  
  }


  async ExpatriateCredential(vc: VerifiableCredential, data: any) {
    console.log('VC     ', vc);
    console.log('Data    ', data);


    const privateKey = await client.keys.keyGenerate({ data: { type: 'ED25519' } });

    console.log(privateKey);

    const expatriateCredentialDraftVC = await expatriateCredential.create({
      claims: {
        data: data
      }
    });


    const credential = await expatriateCredentialDraftVC.issue(privateKey.id); 
    const verificationResult = await credential.verify();

    const proofOfIdentityDraftOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "NQ4Kh3IdI3mHC0LiOf24qBa8p6CbT4qKffAwjcP6i7TIdRN_g19Hcm2Uo8az2x_ZkCKPVIDC3FyQFaK0N46hvTWG85ouyjG-20-MJ0k76Z-N9s4fPv_-j0nvkiORQvVMmt9GkFFjFhkH7-tqYdAF_11JbINjK1tqZXEmqUzQ_JpfTSv7ug0ZV9mMLT1fwy40I7BCIXiXXq5x0-Pk50uAqIZh92Baft707s73NmyH9gBhyVnSlNBvx6lBo4OlFonLIpkdg9aLB16NuPnGfy2tu2lXvn5VbWbGDQcoK1-XLkhWEswdsW9Z4RLD8YlvzCalXSUmx83vwgXZ1H2-4X6_8A"
      },
      body: JSON.stringify({
        JsonLD:  Base64.encode(JSON.stringify(verificationResult)),
        MetaData: {
          Labels: {
            "Expatriate VC": "Expatriate VC"
          },
          Annotations: {
            "Expatriate VC": "Expatriate VC"
          }
        }
      })
    };

    await fetch(`https://api.truvity.com/api/wallet/v1/credential?walletDid=${ vc.WalletDid }&entityDid=${ vc.EntityDid  }`, proofOfIdentityDraftOptions)
      .then(async (response: any) => {
        const data = await response.json();

        console.log('Expatriate Verification Credential:  ', data);
      })
      .catch(err => console.error(err));


  }
}



export interface VerifiableCredential {
    Created: string;
    CredentialDid: string;
    EntityDid: string;
    JsonLd: string;
    MetaData: {
        Annotations: string[];
        Labels: string[];
    },
    Revision: number;
    State: string;
    Updated: string;
    WalletDid: string;
}