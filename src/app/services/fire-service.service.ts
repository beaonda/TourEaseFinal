import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable, map, switchMap } from 'rxjs';
import * as auth from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { FieldValue, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class FireServiceService {
  user:any;
  destiItem:any;
  desti:any;
  postItem:any;
  post:any;
  commentItem:any;
  comment:any;
  


  constructor(
    public auth: AngularFireAuth, 
    public firestore: AngularFirestore,
    public load: LoaderService
  ) { 

    this.usersCollection = firestore.collection<User>('users');
    this.items = this.usersCollection.valueChanges();
    auth.authState.subscribe(user => {
      this.user = user;
    });

    this.destinationCollection = firestore.collection<Destination>('tourist_spots', (ref) =>ref.orderBy('estName').limit(50));
    this.destiItems = this.destinationCollection.valueChanges();

    this.postsCollection = firestore.collection<Post>('posts', (ref) =>ref.limit(50));
    this.postItems = this.postsCollection.valueChanges();

    this.commentsCollection = firestore.collection<Comment>('posts').doc('docID').collection("comments");
    this.commentItems = this.commentsCollection.valueChanges();
    this.counterDoc = this.firestore.collection('counter').doc('counts');
  }

  //Collections

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

  private postsCollection: AngularFirestoreCollection<Post>;
  postItems: Observable<Post[]>;
  addPostItem(postItem: Post) {
    this.postsCollection.add(postItem);
  }

  private commentsCollection: AngularFirestoreCollection<Comment>;
  commentItems: Observable<Comment[]>;
  addCommentItem(commentItem: Comment) {
    this.commentsCollection.add(commentItem);
  }

  //End of Collections


  //Authentication Functions

  getAuth(){
    return this.auth;
  }

  loginWithEmail(data:any) {
    return this.auth.signInWithEmailAndPassword(data.email, data.password);
  }

  signup(data:any) {
    return this.auth.createUserWithEmailAndPassword(data.email, data.pword);
  }

  signOut() {
    return this.auth.signOut();
  }

  saveDetails(data:any) {
    return this.firestore.collection("users").doc(data.uid).set(data);
  }

  async getUnameExisting(uname:any): Promise<any> {
    const collectionRef = this.firestore.collection("users");
    const query = collectionRef.ref
      .where('uname', '==', uname)
      .limit(1);
    const querySnapshot = await query.get();
    if (querySnapshot.empty) {
      return null;
    } else {
      // Extract and return the first document from the query
      const firstDocument = querySnapshot.docs[0].data();
      return firstDocument;
    }
  }

  async getUnameFromID(uid:any): Promise<any> {
    const collectionRef = this.firestore.collection("users");
    const query = collectionRef.ref
      .where('uid', '==', uid)
      .limit(1);
    const querySnapshot = await query.get();
    if (querySnapshot.empty) {
      return null;
    } else {
      // Extract and return the first document from the query
      const firstDocument = querySnapshot.docs[0].data();
      return firstDocument;
    }
  }

  suspendUser(user:any, data:any){
    return this.firestore.collection("users").doc(user.uid).collection("suspension").doc(data.id).set(data);
  }

  collectionExists(documentPath: string, subcollectionName: string): Observable<boolean> {
    const docRef = this.firestore.doc(documentPath);
    
    return docRef.snapshotChanges().pipe(
      switchMap(doc => {
        if (doc.payload.exists) {
          // The document exists, check if the subcollection exists
          const subcollectionRef = docRef.collection(subcollectionName);
          return subcollectionRef.snapshotChanges().pipe(
            map(subcollection => subcollection.length > 0) // Subcollection exists if length is greater than 0
          );
        } else {
          // The document doesn't exist, subcollection cannot exist
          return new Observable<boolean>(observer => observer.next(false));
        }
      })
    );
  }

  moveDocumentToNewCollection(
    sourceCollection: string,
    targetCollection: string,
    documentId: string
  ) {
    // 1. Read the Document
    const sourceDocRef = this.firestore.collection(sourceCollection).doc(documentId);
    sourceDocRef.get().subscribe((docSnapshot) => {
      if (docSnapshot.exists) {
        const data = docSnapshot.data();
        // 2. Write to the New Collection
        const targetDocRef = this.firestore.collection(targetCollection).doc(documentId);
        targetDocRef.set(data)
          .then(() => {
            console.log('Document moved to the target collection.');
           
          })
          .catch((error) => {
            this.load.closeLoadingDialog();
            console.error('Error writing to the new collection:', error);
          });

        // 3. Delete the Original Document
        sourceDocRef.delete()
          .then(() => {
            console.log('Original document deleted from the source collection.');
            alert("Archived Successfully")
            this.load.closeLoadingDialog();
          })
          .catch((error) => {
            this.load.closeLoadingDialog();
            console.error('Error deleting original document:', error);
          });
      } else {
        this.load.closeLoadingDialog();
        console.log('Document does not exist in the source collection.');
      }
    }, (error) => {
      this.load.closeLoadingDialog();
      console.error('Error reading the document:', error);
    });
  }

  async addNewFieldToDocument(
    collectionName: string,
    documentId: string,
    newFieldKey: string,
    newFieldValue: any
  ) {
    try {
      // Reference to the document
      const docRef = this.firestore.collection(collectionName).doc(documentId);

      // Use set with merge: true to add the new field without overwriting existing fields
      await docRef.set({ [newFieldKey]: newFieldValue }, { merge: true });
    } catch (error) {
      console.error('Error adding a new field to the document:', error);
    }
  }


  //End of auth

  /* incre(){
    const docRef = this.firestore.collection('counter').doc('counts');

    // Increment the 'count' field by 1
    docRef.update({ users: firebase.firestore.FieldValue.serverTimestamp() })
      .then(() => {
        console.log('Document updated successfully');
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      });
  } */

  updateDocument(collectionName: string, docId: string, data: any): Promise<void> {
    const docRef = this.firestore.collection(collectionName).doc(docId);

    return docRef.update(data);
  }

  saveTouristDestion(data:any){
    return this.firestore.collection("tourist_spots").doc(data.tourismID).set(data);
  }
  savePost(data:any){
    return this.firestore.collection("posts").doc(data.postID).set(data);
  }
  resetPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email);
  }


  getDocumentCount(collectionName: string): Promise<number> {
    const collectionRef = this.firestore.collectionGroup(collectionName);

    return collectionRef.get().toPromise().then((querySnapshot) => {
      return querySnapshot!.size; // Get the number of documents in the collection
    });
  }

  async getTspotDocument(value: any): Promise<any> {
    const collectionRef = this.firestore.collection("tourist_spots");

    // Create a query that counts documents based on the specified condition
    const query = collectionRef.ref
      .where('estName', '==', value)
      .limit(1); // Limit the query to a single document

    // Perform the query and get the result
    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      // No matching documents found, return null or handle it as needed
      return null;
    } else {
      // Extract and return the first document from the query
      const firstDocument = querySnapshot.docs[0].data();
      return firstDocument;
    }
  }

  async getHomeDocuments(value: any): Promise<any> {
    const collectionRef = this.firestore.collection("posts");

    // Create a query that counts documents based on the specified condition
    const query = collectionRef.ref
      .where('category', '==', value)
      .limit(15); // Limit the query to a single document

    // Perform the query and get the result
    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      // No matching documents found, return null or handle it as needed
      return null;
    } else {
      // Extract and return the first document from the query
      const natureList = querySnapshot.docs;
      return natureList;
    }
  }

  async getUserPosts(uname:any): Promise<any> {
    const collectionRef = this.firestore.collection("posts");

    // Create a query that counts documents based on the specified condition
    const query = collectionRef.ref
      .where('user', '==', uname)
      .limit(3); // Limit the query to a single document

    // Perform the query and get the result
    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      // No matching documents found, return null or handle it as needed
      return null;
    } else {
      // Extract and return the first document from the query
      const userPostList = querySnapshot.docs;
      return userPostList;
    }
  }

  async getPhotoDocument(value: any): Promise<any> {
    const collectionRef = this.firestore.collection("post_photos");

    // Create a query that counts documents based on the specified condition
    const query = collectionRef.ref
      .where('postID', '==', value)
      .limit(1); // Limit the query to a single document

    // Perform the query and get the result
    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      // No matching documents found, return null or handle it as needed
      return null;
    } else {
      // Extract and return the first document from the query
      const photo = querySnapshot.docs[0].data();
      return photo;
    }
  }

  async getPostDocument(value: string): Promise<any> {
    const collectionRef = this.firestore.collection("posts");

    // Create a query that counts documents based on the specified condition
    const query = collectionRef.ref
      .where('postID', '==', value)
      .limit(1); // Limit the query to a single document

    // Perform the query and get the result
    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      alert("Document Not Found");
      // No matching documents found, return null or handle it as needed
      return null;
    } else {
      // Extract and return the first document from the query
      const post = querySnapshot.docs[0].data();
      return post;
    }
  }

  searchResults: any[] = [];

  loginGoogle(){
    //alert("clicked");
    const provider = new auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider).then(
      (userCredential) => {
        // User is signed in using Google.
        const user = userCredential.user;
        console.log(user);
        // You can access user information here
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getAllTouristDestinations(){
    return this.destinationCollection;
  }

  getAllPosts(){
    return this.postsCollection;
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

  counterDoc: AngularFirestoreDocument<MyDocumentType>;
  getDocumentCounter(): Promise<any> {
    const docRef = this.firestore.collection("counter").doc("counts").ref;
  
    return docRef.get()
      .then((doc:any) => {
        if (doc.exists) {
          return doc.data();
        } else {
          return null; // Document doesn't exist
        }
      })
      .catch((error:any) => {
        throw error;
      });
  }

  postData:any;
  addOneView(docID:any): Promise<any> {
    const docRef = this.firestore.collection("posts").doc(docID).ref;
    return docRef.get()
      .then((doc:any) => {
        if (doc.exists) {
          this.postData = doc.data();
          this.postData.views++;
          
          this.updateViews(docID, this.postData);
          return doc.data();
          
        } else {
          alert("Document was not found");
          return null; // Document doesn't exist
        }
      })
      .catch((error:any) => {
        throw error;
      });
  }
  userProfileData:any;
  addOneUserProfileView(uname:string) {
    this.getUnameExisting(uname).then(doc => {
      if(doc != null){
        this.userProfileData = doc;
        this.userProfileData.views++;
        this.updateUserProfileView(this.userProfileData.uid, this.userProfileData);
      }
    }).catch(err =>{
      console.error(err);
    })
  }

  getMostRecentPosts(): Promise<any[]> {
    
    return this.firestore
      .collection("posts", (ref) =>
        ref
          .orderBy('year', 'desc')
          .orderBy('month', 'desc')
          .orderBy('date', 'desc')
          .orderBy('hour', 'desc')
          .orderBy('mins', 'desc')
          .limit(6)
      )
      .get()
      .toPromise()
      .then((querySnapshot) => querySnapshot!.docs.map((doc) => doc.data()));
  }

  getTopDocuments(collectionName: string, fieldToSortBy: string, limit: number): Promise<any[]> {
    return this.firestore
      .collection(collectionName, (ref) =>
        ref.orderBy(fieldToSortBy, 'desc').limit(limit)
      )
      .get()
      .toPromise()
      .then((querySnapshot) => querySnapshot!.docs.map((doc) => doc.data()));
  }

  addOneUserProfilePost(uname:any) {
    this.getUnameExisting(uname).then(doc => {
      if(doc != null){
        this.userProfileData = doc;
        this.userProfileData.posts++;
        this.updateUserProfileView(this.userProfileData.uid, this.userProfileData);
      }
    }).catch(err =>{
      console.error(err);
    })
     /*  .then((doc:any) => {
        if (doc.exists) {
          this.userProfileData = doc.data();
          this.userProfileData.posts++;
          
          this.updateUserProfileView(uname, this.userProfileData);
          return doc.data();
          
        } else {
          alert("Document was not found");
          return null; // Document doesn't exist
        }
      })
      .catch((error:any) => {
        throw error;
      }); */
  }
  updateViews(docID:any, data:any): Promise<void> {
    return this.firestore.collection("posts").doc(docID).update(data);
  }
  updateCount(data:any): Promise<void> {
    return this.firestore.collection("counter").doc("counts").update(data);
  }
  updateUserProfileView(uid:any, data:any): Promise<void> {
    return this.firestore.collection("users").doc(uid).update(data);
  }



  postComment(postID:any, commentID:any, data:any){
    return this.firestore.collection("posts").doc(postID).collection("comments").doc(commentID).set(data);
  }

  getComments(docID:any){
    return this.firestore.collection('posts')
    .doc(docID)
    .collection('comments')
    .valueChanges();
  }

  


  /* getOneTSpot(documentId:string): Observable<any> {
    const documentRef = this.firestore.collection("touristSpots").doc().where('estName', '==', '');
    return documentRef.valueChanges();
  } */

}


export interface User{

}

export interface Destination{

}

export interface MyDocumentType {
  users: number;
  recent_users: number;
  tspots: number;
  posts:number;
  local_users:number;
  foreign_users:number;
  // Define other properties as needed
}

export interface Post
{

}

export interface Comment
{

}