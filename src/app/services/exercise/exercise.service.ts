import {Injectable} from '@angular/core';

import {Exercise} from '../../common/exercise';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable, Subject} from 'rxjs';
import {map, filter, finalize, tap} from 'rxjs/operators';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {UploadTaskSnapshot} from '@angular/fire/storage/interfaces';


@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  // private varibles
  private dbPath = '/exercises';
  private selectedKey: string;
  private selectedUrl: string;

  // Observable object
  // firebase variables
  // db
  exercisesCollection: AngularFirestoreCollection<Exercise>;
  exercises: Observable<Exercise[]>;
  exerciseDoc: AngularFirestoreDocument<Exercise>;
  exercise: Observable<Exercise>;
  // storage
  percentage: Subject<number> = new Subject<number>();
  URL: Subject<UploadTaskSnapshot> = new Subject<UploadTaskSnapshot>();
  downloadURL: Observable<any>;
  fb: UploadTaskSnapshot;



  constructor(public afs: AngularFirestore,
              private storage: AngularFireStorage) {

    // fetch collection
    this.exercisesCollection = this.afs.collection(this.dbPath);

    // subscribe to db changes
    this.exercises = this.exercisesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Exercise;
        const key = a.payload.doc.id;
        return {key, ...data};
      }))
    );

  }


  // local getter and setter db
  getKey(): string {
    return this.selectedKey;
  }

  setKey(key: string) {
    this.selectedKey = key;
  }

  // local getter and setter db
  getURL(): string {
    return this.selectedUrl;
  }

  setURL(url: string) {
    this.selectedUrl = url;
  }

  // for db
  getExercises() {
    return this.exercises;
  }

  getExercise(key: string) {
    this.exerciseDoc = this.afs.doc<Exercise>(this.dbPath + '/' + key);
    this.setKey(key);
    return this.exercise = this.exerciseDoc.valueChanges();
  }

  addExercise(item: Exercise) {
    return this.exercisesCollection.add(item);
  }

  deleteExercise() {
    this.exerciseDoc = this.afs.doc(this.dbPath + '/' + this.getKey());
    // delete related video
    this.deleteFile(this.selectedUrl);
    return this.exerciseDoc.delete();
  }

  updateExercises(item: Exercise) {
    this.exerciseDoc = this.afs.doc(this.dbPath + '/' + this.getKey());
    this.exerciseDoc.update(item);
  }

  // for storage

  // uplaod video
  uploadFile(exercise) {

    const file = exercise;
    const filePath = `/exercise/` + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`/exercise/` + file.name, file,
      {
        customMetadata: {date: Date.now().toString(), name: file.name, contentType: file.contentType, size: file.size}
      });
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
              this.URL.next(this.fb);
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          this.percentage.next(url.bytesTransferred / url.totalBytes);
        }
      });

    }

  deleteFile(downloadUrl) {
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }

}
