import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireServiceService {
  user:any;
  destiItem:any;
  desti:any;

  constructor(
    public auth: AngularFireAuth, 
    public firestore: AngularFirestore
  ) { 
    this.usersCollection = firestore.collection<User>('users');
    this.items = this.usersCollection.valueChanges();
    auth.authState.subscribe(user => {
      this.user = user;
    });

    this.destinationCollection = firestore.collection<Destination>('tourist_spots', (ref) =>ref.orderBy('estName'));
    this.destiItems = this.destinationCollection.valueChanges();
  }

  private usersCollection: AngularFirestoreCollection<User>;
  items: Observable<User[]>;
  addUserItem(item: User) { 
    this.usersCollection.add(item);
  }

  private destinationCollection: AngularFirestoreCollection<Destination>;
  destiItems: Observable<Destination[]>;
  addDestinationItem(destiItem: Destination) {
    this.destinationCollection.add(destiItem);
  }

  getAuth(){
    return this.auth;
  }
  loginWithEmail(data:any) {
    return this.auth.signInWithEmailAndPassword(data.email, data.password);
  }
  signup(data:any) {
    return this.auth.createUserWithEmailAndPassword(data.email, data.pword);
  }
  saveDetails(data:any) {
    return this.firestore.collection("users").doc(data.uId).set(data);
  }
  saveTouristDestion(data:any){
    return this.firestore.collection("tourist_spots").doc(data.tourismID).set(data);
  }

  getAllTouristDestinations(){
    return this.destinationCollection;
  }

  getUserDetails(data:any) {
    return this.firestore.collection("users").doc(data.uId).valueChanges();
  }
  getAllUsername(){
    return this.firestore.collection("users").doc().valueChanges();
  }
  getCurrentUser(){
    return this.user;
  }
  getAllUsers(){
    return this.usersCollection;
  }

}


export interface User{

}

export interface Destination{

}