import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location/housing-location';
@Injectable({
  providedIn: 'root',
})
export class Housing {
  url = 'http://localhost:3000/locations';

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const response = await fetch(this.url);
    const data = await response.json();
    return data ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const response = await fetch(`${this.url}/${id}`);
    return await response.json();
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName, lastName, email);
  }
}
