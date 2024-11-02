import { Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { FilesComponent } from './files/files.component';
import { WalletComponent } from './wallet/wallet.component';

export const routes: Routes = [
    { path: 'files', title: 'Files', component: FilesComponent },
    { path: 'admin', title: 'Admin', component: AdminComponent },
    { path: 'wallet', title: 'Expatriate Wallet', component: WalletComponent }
];
