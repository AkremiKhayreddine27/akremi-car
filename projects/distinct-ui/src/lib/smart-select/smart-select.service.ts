import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SmartSelectService {
  private selected;
  selectedChanged: Subject<any> = new Subject();

  constructor() {}

  getSelected() {
    return this.selected;
  }

  setSelected(selected: { value: any; display: any }) {
    this.selected = selected;
    this.selectedChanged.next(this.selected);
  }
}
