import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/FileUpload';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  private basePath = '/tspot_photos';
  photo:any = {
    url: '',
    name: '',
    postId: ''
  };


  constructor(
    private firestore: AngularFirestore, 
    private storage: AngularFireStorage
  ) { }

  uploadPostPhoto(fileUpload: FileUpload, data:any): Observable<number | undefined> {
    const currentDate = Date.now();
    const filePath = this.basePath + "/" + currentDate ;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          this.photo.url = downloadURL;
          this.photo.name = fileUpload.file.name;
          this.photo.postId = data.id;
          this.savePhoto(this.photo);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  savePhoto(data:any){
    return this.firestore.collection("post_photos").doc(data.postID).set(data);
  }

  saveTspotPhoto(data:any){
    return this.firestore.collection("tourist_spots").doc(data.tourismID).update(data)  ;
  }
}
