import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './activities.component.html',
})
export class ActivitiesComponent {}
