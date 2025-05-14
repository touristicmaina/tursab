import { DOCUMENT, NgStyle } from '@angular/common';
import {Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TextColorDirective,
  TemplateIdDirective,
  WidgetStatCComponent,
  WidgetStatAComponent
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';
import {ClientService} from '../../services/clients.service'
import { WidgetsBrandComponent } from '../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import {WidgetsComponent} from '../widgets/widgets/widgets.component';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import { DateTime } from 'luxon';
Chart.register(ChartDataLabels);


@Component({
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
    imports: [
      
      WidgetsDropdownComponent,
      TextColorDirective,
      CardComponent, CardBodyComponent, RowComponent,
      ColComponent, ButtonDirective, IconDirective,
      ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective,
      ChartjsComponent, NgStyle, CardFooterComponent, GutterDirective,
      ProgressBarDirective, ProgressComponent,
  TemplateIdDirective,
  WidgetStatCComponent,
  WidgetStatAComponent
  
    ]
})
export class DashboardComponent implements OnInit {
  clientData: any[] = [];
  data: any[] = [];
  options: any[] = [];
  filteredClientData: any[] = [];
clientsChartData: number[] = []; // This will go into chart

   totalClients: number = 0;
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #document: Document = inject(DOCUMENT);
  readonly #renderer: Renderer2 = inject(Renderer2);
  readonly #chartsData: DashboardChartsData = inject(DashboardChartsData);
 @ViewChild('chart') chartComponent!: ChartjsComponent;

  constructor(
    private clientService: ClientService,
  ) {
  
  }

 async getAllClients() {
  this.clientService.getClients().subscribe((data) => {
    this.clientData = data;
    this.totalClients = data.length;
    
    this.clientsChartData = this.generateClientChartData(this.clientData);
    this.setClientWidgetChart(); // generate chart config
  });
}

generateClientChartData(clients: any[]): number[] {
  const monthlyCounts = new Array(12).fill(0);

  clients.forEach(client => {
    const dt = DateTime.fromFormat(client.createdAt, 'LLLL d, yyyy \'at\' h:mm:ss a ZZZ');
    
    if (dt.isValid) {
      monthlyCounts[dt.month - 1]++;
    } else {
      console.warn('Invalid date:', client.createdAt);
    }
  });

  return monthlyCounts;
}
setClientWidgetChart() {
  this.data[0] = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [{
      label: 'Clients Created',
      data: this.clientsChartData,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: '#36A2EB',
      pointBackgroundColor: '#36A2EB',
      pointHoverBorderColor: '#36A2EB',
      fill: true,
      tension: 0.4
    }]
  };

 this.options[0] = {
  plugins: {
    legend: {
      display: false
    },
    datalabels: {
      anchor: 'end',
      align: 'top',
      color: '#333',
      font: {
        weight: 'bold'
      },
      formatter: (value: number) => value,
    }
  },
  maintainAspectRatio: false,
  onClick: (event: any, activeElements: any[]) => {
    if (activeElements.length > 0) {
      const chart = activeElements[0]._chart;
      const index = activeElements[0].index;
      const label = this.data[0].labels[index];
      this.onMonthClick(index, label);
    }
  },
  scales: {
    x: {
      ticks: { display: false },
      grid: { display: false }
    },
    y: {
      ticks: { display: false },
      grid: { display: false }
    }
  }
};

}

onMonthClick(monthIndex: number, label: string) {
  const clientsInMonth = this.clientData.filter(client => {
    const createdAt = new Date(client.createdAt);
    return createdAt.getMonth() === monthIndex;
  });

  console.log(`Clients in ${label}:`, clientsInMonth);
  this.filteredClientData = clientsInMonth;
}

  public mainChart: IChartProps = { type: 'bar' };
  public mainChartRef: WritableSignal<any> = signal(undefined);
  #mainChartRefEffect = effect(() => {
    if (this.mainChartRef()) {
      this.setChartStyles();
    }
  });
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month')
  });

  ngOnInit(): void {
    this.initCharts();
    this.updateChartOnColorModeChange();
    this.getAllClients();
    console.log('this.clientData', this.clientData);
    console.log('this.clientsChartData', this.clientsChartData);
    console.log('this.data', this.data);
    console.log('this.options', this.options);
    console.log('this.filteredClientData', this.filteredClientData);
    console.log('this.totalClients', this.totalClients);
  }

  initCharts(): void {
    this.mainChart = this.#chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.#chartsData.initMainChart(value);
    this.initCharts();
  }

  handleChartRef($chartRef: any) {
    if ($chartRef) {
      this.mainChartRef.set($chartRef);
    }
  }

  updateChartOnColorModeChange() {
    const unListen = this.#renderer.listen(this.#document.documentElement, 'ColorSchemeChange', () => {
      this.setChartStyles();
    });

    this.#destroyRef.onDestroy(() => {
      unListen();
    });
  }

  setChartStyles() {
    if (this.mainChartRef()) {
      setTimeout(() => {
        const options: ChartOptions = { ...this.mainChart.options };
        const scales = this.#chartsData.getScales();
        this.mainChartRef().options.scales = { ...options.scales, ...scales };
        this.mainChartRef().update();
      });
    }
  }
}
