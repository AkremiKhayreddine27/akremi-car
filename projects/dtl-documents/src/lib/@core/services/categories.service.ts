import { DataService } from "./data.abstract";
import { Injectable } from "@angular/core";
import { Category } from "../models";

@Injectable({
  providedIn: "root"
})
export class CategoriesService extends DataService {
  categories: Category[] = [
    {
      id: 1,
      name: "Carte grise"
    },
    {
      id: 2,
      name: "Carte verte"
    },
    {
      id: 3,
      name: "Cisite technique"
    },
    {
      id: 4,
      name: "vignette"
    },
    {
      id: 5,
      name: "Contrat d'assurance"
    },
    {
      id: 6,
      name: "Contrat de service"
    },
    {
      id: 7,
      name: "Facture"
    },
    {
      id: 8,
      name: "Constat"
    }
  ];

  generate() {
    this.storeMany(this.categories);
  }
}
