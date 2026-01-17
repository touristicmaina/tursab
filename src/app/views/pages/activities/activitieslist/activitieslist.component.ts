import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesListService } from '../../../../services/serviceslist.service';

@Component({
  selector: 'app-activitieslist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activitieslist.component.html',
})
export class ActivitieslistComponent implements OnInit {

  activities: any[] = [];

  constructor(private serviceService: ServicesListService) {}

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities() {
    this.serviceService.getActivities().subscribe({
      next: (data: any[]) => {
        this.activities = data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
}
