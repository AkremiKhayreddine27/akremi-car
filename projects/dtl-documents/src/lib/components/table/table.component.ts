import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { Document } from "../../@core/models";

@Component({
  selector: "dtl-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnInit, OnChanges {
  @Input()
  documents: Document[] = [];

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

  ngOnChanges(changes: SimpleChanges) {}
}
