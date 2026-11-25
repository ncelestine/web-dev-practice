import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Housing } from '../housing';
import { HousingLocation } from '../housing-location/housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { email } from '@angular/forms/signals';

@Component({
  standalone: true,
  selector: 'app-details',
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  template: `
  <article>

    <img 
      class="listing-photo" 
      [src]="housingLocation?.photo" 
      alt="Photo of {{ housingLocation?.name }}"
    >

    <section class="listing-description">
      <h2 class="listing-heading">
        {{ housingLocation?.name }}
      </h2>

      <p class="listing-location">
        {{ housingLocation?.city }}, {{ housingLocation?.state }}
      </p>
    </section>

    <section class="listing-features">
      <h2 class="section-heading">About this housing location</h2>

      <ul>
        <li>Units available: {{ housingLocation?.availableUnits }}</li>
        <li>Wifi: {{ housingLocation?.wifi ? 'Yes' : 'No' }}</li>
      </ul>
    </section>

    <section class="listing-apply">
      <h2 class="section-heading">Apply now to live here</h2>

      <form [formGroup]="applyForm" (submit)="submitApplication()">

        <label for="first-name">First Name</label>
        <input id="first-name" type="text" formControlName="firstName">

        <label for="last-name">Last Name</label>
        <input id="last-name" type="text" formControlName="lastName">

        <label for="email">Email</label>
        <input id="email" type="email" formControlName="email">

        <button type="submit" class="primary">Apply now</button>

      </form>
    </section>

  </article>
`,
  styleUrls: ['./details.css'],
})
export class Details {
  housingLocationId: string | null = null;
  route: ActivatedRoute = inject(ActivatedRoute);
  housing = inject(Housing);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
firstName: new FormControl(''),
lastName: new FormControl(''),
email: new FormControl('')
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housing.getHousingLocationById(housingLocationId).then(housingLocation =>{
      this.housingLocation = this.housingLocation;
    });
  }

  submitApplication(){
    this.housing.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value. email ?? '',
    );
  }
}