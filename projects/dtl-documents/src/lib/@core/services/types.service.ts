import { DataService } from './data.abstract';
import { Injectable } from '@angular/core';
import { DocumentType } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TypesService extends DataService {

  types: DocumentType[] = [
    {
      id: 1,
      name: 'facture'
    },
    {
      id: 2,
      name: 'contrat'
    },
    {
      id: 3,
      name: 'paiement'
    },
    {
      id: 4,
      name: 'autre'
    }
  ];

  generate() {
    this.storeMany(this.types);
  }
}
