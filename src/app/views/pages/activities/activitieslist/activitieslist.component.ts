import { Component } from '@angular/core';
import { ActivityModel } from '../../../../models/activities.model';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { IconSetService } from '@coreui/icons-angular';
import { CommonModule } from '@angular/common';
import { cilTrash, cilPencil } from '@coreui/icons';
import {
  DropdownToggleDirective,
  DropdownMenuDirective,
  DropdownItemDirective,
  ColComponent,
  FormControlDirective,
  FormLabelDirective,
  ButtonDirective,
  DropdownComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  TableDirective,
} from '@coreui/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServicesListService } from '../../../../services/serviceslist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activitieslist',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ColComponent,
    FormControlDirective,
    FormLabelDirective,
    ButtonDirective,
    MatIconModule,
    RouterLink,
    ColComponent,
    TextColorDirective,
    CardComponent, CardHeaderComponent, CardBodyComponent,TableDirective,
  ],
  templateUrl: './activitieslist.component.html',
  styleUrl: './activitieslist.component.scss'
})
export class ActivitieslistComponent {
  activityServiceForm: FormGroup;
  mode: 'create' | 'edit' = 'create';
  activityId: string | null = null;
  showForm = false;
  services: ActivityModel[] = [];
  filteredServices: ActivityModel[] = [];
  searchControl = new FormControl('');
  
  constructor(
    private fb: FormBuilder,
    private serviceService: ServicesListService,
    private route: ActivatedRoute,
    private router: Router,
    private iconSet: IconSetService,
   
  ) {
    this.activityServiceForm = this.fb.group({
      activityName: ['', Validators.required],
      activityDescription: [''],
      isActive: [true,Validators.required],
    

    });
    this.searchControl.valueChanges.subscribe(searchText => {
      this.filterServices(searchText || '');
    });
    this.iconSet.icons = { cilTrash, cilPencil };
    this.getAllServices();
}


ngOnInit(): void {
  // Check if there's a route parameter (Subscriber ID)
  this.route.paramMap.subscribe((params) => {
   this.activityId = params.get('id');
   if (this.activityId) {
     this.mode = 'edit'; // Set mode to 'edit' if SubscriberId exists
     this.loadActivity(this.activityId); // Load Subscribers data for editing
   }
 });
}

async loadActivity(activityId: string): Promise<void> {
  this.toggleForm();
  window.scrollTo({ top: 0, behavior: 'smooth' });
 try {
   const activity = await this.serviceService.getActivityById(activityId);
   if (activity) {
     this.activityId = activity.id; 
     this.activityServiceForm.patchValue({
      activityName: activity.activityName || '',
      activityDescription: activity.activityDescription || '',
      isActive: activity.isActive || '',

     });
   }
 } catch (err) {
   console.error('Error loading activity:', err);
   alert('Failed to load activity data.');
 }
}




toggleForm() {
  this.showForm = !this.showForm;
}

  getAllServices() {
    this.serviceService.getAllServices().subscribe({
      next: (data) => {
        this.services = data;
        this.filteredServices = [...data];
      },
      error: (err) => {
        Swal.fire({
          title: "Error!",
          text: err,
          icon: "warning",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    });
  }

  filterServices(searchText: string) {
    const lowerText = searchText.toLowerCase();
    this.filteredServices = this.services.filter(service =>
      service.activityName?.toLowerCase().includes(lowerText)
    );
  }

  confirmDelete(service: ActivityModel) {
    Swal.fire({
      title: 'Are you sure?',
      text: `This will delete service ${service.activityName}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteService(service);
      }
    });
  }
  
   private deleteService(activity: ActivityModel) {
     if (!activity.activityserviceId) {
       Swal.fire('Error', 'Cannot delete: Missing document ID.', 'error');
       return;
     }
   
     this.serviceService.deleteService(activity.activityserviceId).then(() => {
       // Refresh list after deletion
       this.getAllServices();
       Swal.fire('Deleted!', 'Activity has been deleted.', 'success');
     }).catch((err) => {
       Swal.fire('Error', 'Failed to delete activity.', 'error');
       console.error(err);
     });
   }

  async onSubmit(): Promise<void> {
    if (this.activityServiceForm.invalid) {
      this.activityServiceForm.markAllAsTouched();
      return;
    }

    const formValue = this.activityServiceForm.value;
    const service: ActivityModel = {
      ...formValue,
    };

    try {
      if (this.mode === 'edit' && this.activityId) {
        await this.serviceService.updateService(this.activityId, service);
        alert('Service updated successfully');
      } else {
        await this.serviceService.addService(service);
        alert('Service added successfully');
      }
      this.showForm = false;
      this.activityServiceForm.reset();
      this.mode = 'create'; // Reset mode to 'create' after submission
      this.router.navigate(['/dashboard/activities-names']);
    } catch (error) {
      console.error(error);
      alert('Operation failed.');
    }
  }


selectActive(choise: string): void {

  this.activityServiceForm.get('isActive')?.setValue(choise);
}


}
