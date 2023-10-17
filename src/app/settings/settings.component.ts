import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css', '../../assets/css/homePages.css', '../user-profile/user-profile.component.css']
})
export class SettingsComponent implements AfterViewInit {

  @ViewChild('fileInput') fileInput!: ElementRef;

  ngAfterViewInit() {
    if (this.fileInput) {
      this.fileInput.nativeElement.addEventListener('change', this.handleFileUpload.bind(this));
    }
  }

  triggerFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  handleFileUpload(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement?.files?.[0];
    if (file) {
      // Handle the uploaded file
    }
  }
}
