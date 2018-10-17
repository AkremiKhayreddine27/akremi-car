import Dexie from "dexie";
import { Injectable } from "@angular/core";

@Injectable()
export class DexieService extends Dexie {
  constructor() {
    super("EasyCars");
    this.version(1).stores({
      contacts: "++id",
      groups: "++id",
      queue: "++id"
    });
  }
}
