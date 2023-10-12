import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FireServiceService } from '../services/fire-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css','../../assets/css/homePages.css']
})
export class NewPostComponent {

  isModalOpen = false;
  popups:any;

  viewLoc(){
    var popups = document.querySelectorAll('.popup'); 
    var viewPopUp = document.querySelector("#viewPopUp");
    (viewPopUp as HTMLElement).style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  closeView(){
    var closeButtons = document.querySelector('.close');
    var viewPopUp = document.querySelector("#viewPopUp");
    (viewPopUp as HTMLElement).style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  post_title:any;
  tourist_spot:any;
  post_body:any;
  rating:any;
  day:any;
  month:any;
  year:any;
  time:any;
  currentUser:any;
  photo:any;

  //nested collections
  photos:any;
  comments:any;

  constructor(
    public fireService:FireServiceService,
    public router:Router
  ){

  }

  ngOnInit(){

  }

  savePost(){
    let postData = {
      title:this.post_title,
      location:this.tourist_spot,
      body:this.post_body,
      rating:this.rating,
      day:this.day,
      month: this.month,
      year: this.year,
      user: this.currentUser
    }
    this.fireService.saveTouristDestion(postData).then(
      res=>{
        console.log(res);
        alert("Posted Successfully.");
      }, err=>{
        alert(err.message);
        console.log(err);
      }
    );
  }

  @ViewChild('textArea') textArea!: ElementRef;

  formatText(format: string) {
    const textarea: HTMLTextAreaElement = this.textArea.nativeElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    // Apply formatting based on 'format' parameter
    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `<strong>${selectedText}</strong>`;
        break;
      case 'italic':
        formattedText = `<em>${selectedText}</em>`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
    }

    // Replace the selected text with the formatted text
    this.post_body = this.post_body.slice(0, start) + formattedText + this.post_body.slice(end);
  }

 

  textHistory: string[] = []; // Store text history
  currentIndex: number = -1; // Current position in text history

  
  @HostListener('window:keydown.control.z', ['$event'])
  onCtrlZ(event: KeyboardEvent) {
    event.preventDefault(); // Prevent the default browser undo behavior
    this.undo();
  }

  undo() {
    if (this.currentIndex > 0) {
        // Decrement the currentIndex
        this.currentIndex--;

        // Set the text to the previous state in history
        this.post_body = this.textHistory[this.currentIndex];
      }
    }

    plainText: string = '';
    formattedText: string = '';


    // This method is called whenever the text changes
    onTextChanged() {
      // Update the text history with the current text
      this.textHistory.push(this.post_body);
      // Update the currentIndex to the latest history position
      this.currentIndex = this.textHistory.length - 1;
    }

}
