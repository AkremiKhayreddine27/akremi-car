import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { User } from "../../@core/models/user";

@Component({
  selector: "dtl-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnInit, OnChanges {
  @Input()
  contacts: User[] = [];

  @Input()
  loaded: boolean = false;

  mobileFake = [null, null, null, null, null];
  desktopFake = [null, null, null, null, null, null, null];

  @Input()
  allSelected: any;

  @Output()
  contactSelected: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {

  }
}
