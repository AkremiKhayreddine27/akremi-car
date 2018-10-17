import { Injectable } from "@angular/core";
import { DataService } from "./data.abstract";
import { Group } from "../models";

import * as faker from "faker";
import Dexie from "dexie";
import { DexieService } from "../db/dexie.service";

@Injectable()
export class GroupsService extends DataService {
  table: Dexie.Table<Group, number>;

  groups: Group[] = [
    { value: 1, display: "Mon Entreprise" },
    { value: 2, display: "Assurances" },
    { value: 3, display: "Contrôle Technique" },
    { value: 4, display: "Entretient - Réparation" },
    { value: 5, display: "Equipements" },
    { value: 6, display: "Station Services" }
  ];

  constructor(private dexieService: DexieService) {
    super();
    this.table = this.dexieService.table("groups");
  }

  getAll() {
    return this.table.toArray();
  }

  update(id: number, changes: Partial<Group>) {
    return this.table.update(id, changes);
  }

  delete(id: number) {
    return this.table.delete(id);
  }

  deleteMany(ids: number[]) {
    return this.table.bulkDelete(ids);
  }

  generate(nbr, args = null) {
    return this.table.count().then(count => {
      if (count === 0) {
        this.storeMany(this.groups);
        this.table.bulkAdd(this.groups);
      }
    });
  }
}
