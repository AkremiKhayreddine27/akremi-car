import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  TemplateRef
} from "@angular/core";
import {
  sort,
  SortConf
} from "../../../../../projects/dtl-contacts/src/lib/@core/store/helpers";

@Component({
  selector: "ngx-cars-table",
  templateUrl: "./cars-table.component.html",
  styleUrls: ["./cars-table.component.scss"]
})
export class CarsTableComponent implements OnInit {
  @Input()
  cars;

  @Input()
  selectAll: { type: string; checked: boolean };

  @Output()
  rowClicked: EventEmitter<any> = new EventEmitter();

  @Output()
  rowSelected: EventEmitter<any> = new EventEmitter();

  @ViewChild("tableNameTemplate")
  tableNameTemplate: TemplateRef<any>;

  sortConf: any[] = [
    {
      id: 1,
      field: "title",
      direction: "asc",
      display: "Nom"
    },
    {
      id: 2,
      field: "status.value",
      direction: "asc",
      display: "Modèle"
    }
  ];

  ngOnInit(): void {
    this.tableNameTemplate.createEmbeddedView({ title: "Nom" });
  }

  sortCars(conf) {
    this.cars = sort([conf], this.cars);
  }

  get titleSort() {
    return this.sortConf.find(s => s.id === 1);
  }

  get statusSort() {
    return this.sortConf.find(s => s.id === 2);
  }

  setField(conf, field, display) {
    conf.field = field;
    conf.display = display;
    this.tableNameTemplate.createEmbeddedView({ title: conf.display });
  }
}
