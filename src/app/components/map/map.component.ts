import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

import { MapCoordinatesPipe } from '@pipes/map-coordinates.pipe';
import { LocationsService } from '@services/locations.service';
import { LocationModel } from '@models/location.model';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    GoogleMapsModule,
    MapCoordinatesPipe,
    MatButtonModule,
  ],
  templateUrl: './map.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit {
  locations: Observable<LocationModel[]> = new Observable();
  locationName = '';
  mapOptions: google.maps.MapOptions = {
    center: {lat: 35.046, lng: 33.25},
    zoom: 8
  };

  @ViewChild('sidenav') sidenav!: MatDrawer;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  constructor(private readonly locationsService: LocationsService) {
  }

  ngOnInit(): void {
    this.locations = this.locationsService.getLocations();
  }

  openInfoWindow(marker: MapMarker): void {
    this.locationName = marker.getTitle() || '';
    this.infoWindow.open(marker);
    this.sidenav.open();
  }

  trackByFn(index: number): number {
    return index;
  }
}
