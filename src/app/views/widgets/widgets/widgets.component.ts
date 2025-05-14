import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ProgressBarDirective, ProgressComponent, TemplateIdDirective, WidgetStatCComponent } from '@coreui/angular';

@Component({
    selector: 'app-widgets',
    templateUrl: './widgets.component.html',
    styleUrls: ['./widgets.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    imports: [TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent,
        ProgressBarDirective, ProgressComponent,
         TemplateIdDirective, IconDirective, WidgetStatCComponent]
})
export class WidgetsComponent implements AfterContentInit {
  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }
}
