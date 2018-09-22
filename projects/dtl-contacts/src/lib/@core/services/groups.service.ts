import { Injectable } from "@angular/core";
import { DataService } from "./data.abstract";
import { Group } from "../models";

import * as faker from "faker";

@Injectable()
export class GroupsService extends DataService {
  groups: Group[] = [
    { value: 1, display: "Mon Entreprise" },
    { value: 2, display: "Assurances" },
    { value: 3, display: "Contrôle Technique" },
    { value: 4, display: "Entretient - Réparation" },
    { value: 5, display: "Equipements" },
    { value: 6, display: "Station Services" }
  ];
  generate(nbr, args = null) {
    this.storeMany(this.groups);
  }
}
