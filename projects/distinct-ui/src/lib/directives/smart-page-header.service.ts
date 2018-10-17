import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SmartPageHeaderService {
  constructor() {}
  isExtended: boolean = true;
  isExtendedChanged: Subject<boolean> = new Subject();
  changeState(state: boolean) {
    this.isExtended = state;
    this.isExtendedChanged.next(state);
  }
}
