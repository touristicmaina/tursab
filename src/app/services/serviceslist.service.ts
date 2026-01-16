import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { collectionData } from '@angular/fire/firestore';
import { query, where } from 'firebase/firestore';

export interface ActivityModel {
  id?: string;
  activityserviceId?: string;
  name?: string;
}

@Injectable({ providedIn: 'root' })
export class ServicesListService {

  constructor(private firestore: Firestore) {}

  getActivities(): Observable<ActivityModel[]> {
    const ref = collection(this.firestore, 'activities');
    return collectionData(ref, { idField: 'id' }) as Observable<ActivityModel[]>;
  }

  async getActivityById(activityId: string): Promise<ActivityModel | null> {
    const ref = collection(this.firestore, 'activities');
    const q = query(ref, where('activityserviceId', '==', activityId));
    const snap = await getDocs(q);

    if (snap.empty) return null;

    const docSnap = snap.docs[0];
    return { id: docSnap.id, ...docSnap.data() } as ActivityModel;
  }
}
