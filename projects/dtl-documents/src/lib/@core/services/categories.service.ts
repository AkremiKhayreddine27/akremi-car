import { DataService } from './data.abstract';
import { Injectable } from '@angular/core';
import { Category } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends DataService {

  categories: Category[] = [
    {
      id: 1,
      name: 'Bien'
    },
    {
      id: 2,
      name: 'Réservation'
    },
    {
      id: 3,
      name: 'Service'
    }
  ];

  generate() {
    this.storeMany(this.categories);
  }
}
