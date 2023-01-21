import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LocationModel } from '@models/location.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private readonly URL = './assets/locations.json';

  constructor(private readonly httpClient: HttpClient) {
  }

  getLocations(): Observable<LocationModel[]> {
    return this.httpClient.get<LocationModel[]>(this.URL);
  }
}
