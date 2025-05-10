import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  CollectionReference,
  DocumentReference
} from '@angular/fire/firestore';
import { ActivityModel } from '../models/activities.model';
import { Observable } from 'rxjs';
import { collectionData, docData } from '@angular/fire/firestore';
import { query, where } from 'firebase/firestore';
@Injectable({ providedIn: 'root' })
export class ServicesListService {
  constructor(private firestore: Firestore) {}

  private formatServiceId(index: number): string {
    return index.toString().padStart(4, '0'); // formats like 0001, 0002, etc.
  }

  private getCollection(): CollectionReference {
    return collection(this.firestore, 'activities');
  }

  /**
   * Add new activity
   */
  async addService(data: Omit<ActivityModel, 'activityserviceId'>): Promise<DocumentReference> {
    const servicesCollection = this.getCollection();

    // Get current count to create new ID
    const snapshot = await getDocs(servicesCollection);
    const count = snapshot.size;
    const nextId = this.formatServiceId(count + 1);

    const newActivity: ActivityModel = {
      ...data,
      activityserviceId: nextId,
      activityTotalIncome: data.activityTotalIncome ?? 0,
      activityTotalClients: data.activityTotalClients ?? 0,
      activityTotalCommision: data.activityTotalCommision ?? 0,
      createdAt: new Date(),
    };

    return addDoc(servicesCollection, newActivity);
  }

  /**
   * Get all activities
   */
  getAllServices(): Observable<ActivityModel[]> {
    const activitiesCollection= collection(this.firestore,'activities')
    return collectionData(activitiesCollection, { idField: 'id' }) as Observable<ActivityModel[]>;
  }

  /**
   * Get single activity by Firestore doc ID
   */
//   getServiceById(docId: string): Observable<ActivityModel> {
//     const ref = doc(this.firestore, `activities/${docId}`);
//     return docData(ref, { idField: 'id' }) as Observable<ActivityModel>;
//   }

  /**
   * Update activity by Firestore doc ID
   */
  async updateService(docId: string, updatedData: Partial<ActivityModel>): Promise<void> {
    const ref = doc(this.firestore, `activities/${docId}`);

    const dataToUpdate: Partial<ActivityModel> = {
      ...updatedData,
      activityTotalIncome: updatedData.activityTotalIncome ?? 0,
      activityTotalClients: updatedData.activityTotalClients ?? 0,
      activityTotalCommision: updatedData.activityTotalCommision ?? 0,
    };

    return updateDoc(ref, dataToUpdate);
  }

  /**
   * Delete activity by Firestore doc ID
   */

    async deleteService(activityId: string) {
      const activitiesCollection = collection(this.firestore, 'activities');
      const q = query(activitiesCollection, where('activityserviceId', '==', activityId));
      const snapshot = await getDocs(q);
    
      if (!snapshot.empty) {
        const docId = snapshot.docs[0].id;
        const activityDoc = doc(this.firestore, `activities/${docId}`);
        return deleteDoc(activityDoc);
      } else {
        throw new Error(`No activity found with activitysId: ${activityId}`);
      }
    }

     async getActivityById(activityId: string): Promise<{ id: string } & ActivityModel | null> {
        const ActivitiesCollection = collection(this.firestore, 'activities');
        const q = query(ActivitiesCollection, where('activityserviceId', '==', activityId));
        const snapshot = await getDocs(q);
      
        if (!snapshot.empty) {
          const docSnap = snapshot.docs[0];
          return {
            id: docSnap.id,
            ...docSnap.data(),
          } as { id: string } & ActivityModel;
        } else {
          return null;
        }
      }
}
