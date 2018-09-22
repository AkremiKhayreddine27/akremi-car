import { Injectable } from '@angular/core';
import { DataService } from './data.abstract';
import * as faker from 'faker';
import { Document, Category, DocumentType } from '../models';
@Injectable({
  providedIn: 'root'
})
export class DocumentsService extends DataService {
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

  constructor() {
    super();
  }

  generate(nbr: number) {
    for (let n = 0; n < nbr; n++) {
      const document: Document = {
        id: faker.random.number(),
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        type: faker.random.arrayElement(this.types),
        createdAt: new Date(),
        category: faker.random.arrayElement(this.categories),
        link: 'https://docs.google.com/spreadsheets/d/1X_PYp_RxjnKnsuejDPK3uc_zjAOAHZ0bWvZ9RBIZTgw/edit?usp=sharing',
        file: {
          name: faker.system.fileName(),
          size: 20,
          type: 'application/pdf'
        }
      };
      this.store(document);
    }
  }
}
