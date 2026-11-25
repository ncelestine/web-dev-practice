import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location/housing-location';
import { Housing } from '../housing';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [HousingLocationComponent, CommonModule],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">
          Search
        </button>
      </form>
    </section>

    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation">
      </app-housing-location>
    </section>
  `,
  styleUrls: ['./home.css'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housing = inject(Housing);
  filteredLocationList:HousingLocation[] =[];

  constructor() {
    this.housing.getAllHousingLocations().then((data: HousingLocation[]) => {
      this.housingLocationList = data;
      this.filteredLocationList = this.housingLocationList;
    });
  }

  filterResults(text: string) {
  if (!text) {
    this.filteredLocationList = this.housingLocationList;
    return;
  }

  this.filteredLocationList = this.housingLocationList.filter(location =>
    location.city.toLowerCase().includes(text.toLowerCase())
  );
}
    
}

   
