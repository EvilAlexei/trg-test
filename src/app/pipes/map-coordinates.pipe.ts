import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapCoordinates',
  standalone: true,
})
export class MapCoordinatesPipe implements PipeTransform {
  transform(value: [number, number]): google.maps.LatLngLiteral {
    return { lat: value[0], lng: value[1] };
  }
}
