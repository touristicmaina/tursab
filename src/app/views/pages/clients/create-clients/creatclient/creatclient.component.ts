import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-creatclient',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './creatclient.component.html',
})
export class CreatclientComponent implements OnInit {

  clientForm!: FormGroup;
  totalPax = 0;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name: [''],
      phone: [''],
      pax: [0],
    });

    this.clientForm.get('pax')?.valueChanges.subscribe(value => {
      this.totalPax = value || 0;
    });
  }

  onSubmit() {
    console.log(this.clientForm.value);
  }
}
