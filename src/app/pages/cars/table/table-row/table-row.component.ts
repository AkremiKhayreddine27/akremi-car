import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import * as faker from "faker";

@Component({
  selector: "ngx-cars-table-row",
  templateUrl: "./table-row.component.html",
  styleUrls: ["./table-row.component.scss"]
})
export class CarsTableRowComponent implements OnInit, OnChanges {
  @Input()
  car;

  @Input()
  selectAll;

  @Output()
  rowClicked: EventEmitter<any> = new EventEmitter();

  @Output()
  rowSelected: EventEmitter<any> = new EventEmitter();

  showActions: boolean = false;
  showCheckbox: boolean = false;

  checked: boolean = false;

  statuses = [
    {
      id: 1,
      value: "En pause",
      cssClass: "badge nb-badge nb-badge-success"
    },
    {
      id: 2,
      value: "En réparation",
      cssClass: "badge nb-badge nb-badge-warning"
    },
    {
      id: 3,
      value: "En mission",
      cssClass: "badge nb-badge nb-badge-primary"
    },
    {
      id: 4,
      value: "Hors service",
      cssClass: "badge nb-badge nb-badge-danger"
    }
  ];

  drivers = [
    {
      displayName: faker.name.lastName() + " " + faker.name.firstName(),
      photo: faker.internet.avatar()
    },
    {
      displayName: faker.name.lastName() + " " + faker.name.firstName(),
      photo: faker.internet.avatar()
    },
    {
      displayName: faker.name.lastName() + " " + faker.name.firstName(),
      photo: faker.internet.avatar()
    },
    {
      displayName: faker.name.lastName() + " " + faker.name.firstName(),
      photo: faker.internet.avatar()
    },
    {
      displayName: faker.name.lastName() + " " + faker.name.firstName(),
      photo: faker.internet.avatar()
    },
    {
      displayName: faker.name.lastName() + " " + faker.name.firstName(),
      photo: faker.internet.avatar()
    },
    {
      displayName: faker.name.lastName() + " " + faker.name.firstName(),
      photo: faker.internet.avatar()
    },
    {
      displayName: faker.name.lastName() + " " + faker.name.firstName(),
      photo: faker.internet.avatar()
    },
    {
      displayName: faker.name.lastName() + " " + faker.name.firstName(),
      photo: faker.internet.avatar()
    },
    {
      displayName: faker.name.lastName() + " " + faker.name.firstName(),
      photo: faker.internet.avatar()
    },
    {
      displayName: faker.name.lastName() + " " + faker.name.firstName(),
      photo: faker.internet.avatar()
    }
  ];

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectAll && this.selectAll.type === "event") {
      this.checked = this.selectAll.checked;
    }
  }
}
