import { Injectable } from "@angular/core";
import { DexieService } from "../db/dexie.service";
import { Queue } from '../models/queue';
import Dexie from "dexie";

@Injectable()
export class QueueService {
  table: Dexie.Table<Queue, number>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table("queue");
  }

  add(item: Queue) {
    return this.table.add(item);
  }

  getAll() {
    return this.table.toArray();
  }

  clear() {
    return this.table.clear();
  }
}
