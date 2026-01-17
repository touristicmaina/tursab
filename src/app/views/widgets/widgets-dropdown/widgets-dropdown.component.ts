import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { RowComponent, ColComponent, WidgetStatAComponent } from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';
import { TemplateIdDirective } from '@coreui/angular';

@Component({
  selector: 'app-widgets-dropdown',
  standalone: true,
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    RowComponent,
    ColComponent,
    WidgetStatAComponent,
    TemplateIdDirective,
    IconDirective,
    ChartjsComponent
  ]
})
export class WidgetsDropdownComponent implements OnInit, AfterContentInit {

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.cdr.detectChanges();
  }
}
