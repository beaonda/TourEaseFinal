import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from '../components/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private dialog: MatDialog) {}

  openLoadingDialog(): void {
    this.dialog.open(LoadingComponent, {
      disableClose: true, // Prevent closing by clicking outside the dialog
    });
  }

  closeLoadingDialog(): void {
    this.dialog.closeAll();
  }
}
