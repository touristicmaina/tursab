export interface ActivityModel{
    activityserviceId: string; 
    activityName: string;
    activityDescription: string;
    activityTotalIncome: number;
    activityTotalClients: number;
    activityTotalCommision: number;
    isActive: "Yes" | "No"; // true if the activity is available for booking
    createdAt: Date;
}