import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm2',
  templateUrl: './confirm2.component.html',
  styleUrls: ['./confirm2.component.css']
})
export class Confirm2Component {
  constructor(private dialogRef: MatDialogRef<Confirm2Component>){

  }
}
