import { Component } from '@angular/core';
import { Map, tileLayer, marker} from 'leaflet';
import 'leaflet/dist/images/marker-icon-2x.png';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  map: Map;
  restaurants: Observable<any>;

  constructor(public httpClient: HttpClient) {}

  ionViewDidEnter() {
    this.restaurants = this.httpClient.get('https://oghuxxw1e6.execute-api.us-east-1.amazonaws.com/dev');
    this.restaurants
    .subscribe(data => {
      console.log('my data: ', data);
      this.initMap(data);
    });

  }

  ionViewWillLeave() {
    this.map.remove();
  }

  initMap(restaurants) {
    const map = new Map('mapId4').setView([33.6396965, -84.4304574], 23);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    restaurants.forEach((restaurant) => {
      marker([restaurant.position.lat, restaurant.position.lgn])
      .bindPopup(`<b>${restaurant.title}</b>`, { autoClose: false })
      .addTo(map).openPopup();
    });
  }

}
