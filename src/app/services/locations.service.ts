import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import { LocationModel } from '@models/location.model';

const generateId = (): number => {
  return 1;
}

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private readonly URL = './assets/locations.json';

  constructor(private readonly httpClient: HttpClient) {
  }

  getLocations(): Observable<LocationModel[]> {
    return this.httpClient.get<LocationModel[]>(this.URL)
      .pipe(
        map(locations => locations.map(l => ({...l, id: uuidv4()}))
      ))
  }
}
