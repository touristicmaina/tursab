export interface ActivityModel{
    activityserviceId: string; 
    activityName: string;
    activityDescription: string;
    activityTotalIncome: number;
    activityTotalClients: number;
    activityTotalCommision: number;
    isActive: boolean;
    createdAt: Date;
}