import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  AfterContentInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { getStyle } from '@coreui/utils';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';
import {
  RowComponent,
  ColComponent,
  WidgetStatAComponent,
  TemplateIdDirective
} from '@coreui/angular';

@Component({
  selector: 'app-widgets-dropdown',
  standalone: true,
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    CommonModule,
    RowComponent,
    ColComponent,
    WidgetStatAComponent,
    TemplateIdDirective,
    IconDirective,
    ChartjsComponent
  ]
})
export class WidgetsDropdownComponent implements OnInit, AfterContentInit {

  constructor(private cd: ChangeDetectorRef) {}

  /** 👇 ضروريين للـ HTML */
  data: any[] = [];
  options: any[] = [];

  labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  datasets = [
    {
      label: 'Clients',
      backgroundColor: 'transparent',
      borderColor: getStyle('--cui-primary'),
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: 'Income',
      backgroundColor: 'transparent',
      borderColor: getStyle('--cui-info'),
      data: [28, 48, 40, 19, 86, 27, 90]
    },
    {
      label: 'Tickets',
      backgroundColor: 'transparent',
      borderColor: getStyle('--cui-danger'),
      data: [12, 23, 34, 45, 56, 67, 78]
    }
  ];

  baseOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    elements: {
      line: { tension: 0.4, borderWidth: 2 },
      point: { radius: 0 }
    }
  };

  ngOnInit(): void {
    this.initCharts();
  }

  ngAfterContentInit(): void {
    this.cd.detectChanges();
  }

  private initCharts(): void {
    for (let i = 0; i < this.datasets.length; i++) {
      this.data.push({
        labels: this.labels,
        datasets: [this.datasets[i]]
      });

      this.options.push({ ...this.baseOptions });
    }
  }
}
