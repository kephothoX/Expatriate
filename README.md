# Expatriate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.9 and [Google IDX](https://idx.google.com/).

## Development server

Run `npm install && npm run start` for a dev server. Navigate to `http://localhost:4201/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


To run from [Google IDX](https://idx.google.com) clone `https://github.com/kephothoX/Expatriate` and import the project directly to your workspace.

## Truvity SDK
Use NPM file protocol to install `Truvity.tgz` and make sure the folder is named `Truvity`

## Important Links:
- User wallet:  `http://localhost:4201/wallet`
    Create Wallet and complete to-do list to get all verifiable credentials. Also get to view all VCs 
     attached to your wallet.
- Admin wallet: `http://localhost:4201/admin`
    Approve or reject submitted verifiable credentials
- Pinata File vault `http://localhost:4201/file-vault`
- Send Bank Account details to user's wallet by clicking `Verify Credential` on admin wallet `VCs` fill out the form with `accountHolder, accountName and accountType` and send. This generates an VC with bank account details and sends it back to a users wallet.

## API Keys
- Replace `PinataJwt` and `Truvity` API keys.

