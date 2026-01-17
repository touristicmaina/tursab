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
