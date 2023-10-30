import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmationComponent>) {}

  onCancelClick(): void {
    this.dialogRef.close(false); // Close the dialog with a "false" result for cancel
  }

  onOkClick(): void {
    this.dialogRef.close(true); // Close the dialog with a "true" result for OK
  }
}
