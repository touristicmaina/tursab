import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  CollectionReference,
  DocumentReference
} from '@angular/fire/firestore';
import { ActivityModel } from '../models/activities.model';
import { Observable } from 'rxjs';
import { collectionData } from '@angular/fire/firestore';
import { query, where } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class ServicesListService {
  constructor(private firestore: Firestore) {}

  private formatServiceId(index: number): string {
    return index.toString().padStart(4, '0');
  }

  private getCollection(): CollectionReference {
    return collection(this.firestore, 'activities');
  }

  // =========================
  // ADD
  // =========================
  async addService(
    data: Omit<ActivityModel, 'activityserviceId'>
  ): Promise<DocumentReference> {
    const servicesCollection = this.getCollection();
    const snapshot = await getDocs(servicesCollection);
    const count = snapshot.size;

    const newActivity: ActivityModel = {
      ...data,
      activityserviceId: this.formatServiceId(count + 1),
      activityTotalIncome: data.activityTotalIncome ?? 0,
      activityTotalClients: data.activityTotalClients ?? 0,
      activityTotalCommision: data.activityTotalCommision ?? 0,
      createdAt: new Date(),
    };

    return addDoc(servicesCollection, newActivity);
  }

  // =========================
  // GET ALL (Observable)
  // =========================
  getActivities(): Observable<ActivityModel[]> {
    const activitiesCollection = collection(this.firestore, 'activities');
    return collectionData(activitiesCollection, {
      idField: 'id',
    }) as Observable<ActivityModel[]>;
  }

  // alias (اختياري – حتى ما ينكسر كود قديم)
  getAllServices(): Observable<ActivityModel[]> {
    return this.getActivities();
  }

  // =========================
  // UPDATE
  // =========================
  async updateService(
    docId: string,
    updatedData: Partial<ActivityModel>
  ): Promise<void> {
    const ref = doc(this.firestore, `activities/${docId}`);
    return updateDoc(ref, updatedData);
  }

  // =========================
  // DELETE by activityserviceId
  // =========================
  async deleteService(activityId: string): Promise<void> {
    const q = query(
      collection(this.firestore, 'activities'),
      where('activityserviceId', '==', activityId)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docId = snapshot.docs[0].id;
      return deleteDoc(doc(this.firestore, `activities/${docId}`));
    }

    throw new Error(`No activity found with ID ${activityId}`);
  }
}
