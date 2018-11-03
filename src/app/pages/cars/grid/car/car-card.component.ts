import * as faker from "faker";
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef
} from "@angular/core";

import * as fromStore from "../../../../../../projects/dtl-contacts/src/lib/@core/store";
import { Store } from "@ngrx/store";
import { of } from "rxjs";

@Component({
  selector: "ngx-car",
  templateUrl: "./car-card.component.html",
  styleUrls: ["./car-card.component.scss"]
})
export class CarsCardComponent implements OnInit {
  @Input()
  car;

  @ViewChild("statusTempate")
  statusTempate: TemplateRef<any>;

  @ViewChild("statusTitleTempate")
  statusTitleTempate: TemplateRef<any>;

  statuses = [
    {
      id: 1,
      value: "En pause",
      cssClass: "success"
    },
    {
      id: 2,
      value: "En réparation",
      cssClass: "warning"
    },
    {
      id: 3,
      value: "En mission",
      cssClass: "primary"
    },
    {
      id: 4,
      value: "Hors service",
      cssClass: "danger"
    }
  ];

  drivers = [
    {
      id: 1,
      displayName: faker.name.lastName() + " " + faker.name.firstName(),
      photo: faker.internet.avatar()
    },
    {
      id: 2,
      displayName: faker.name.lastName() + " " + faker.name.firstName(),
      photo: faker.internet.avatar()
    },
    {
      id: 3,
      displayName: faker.name.lastName() + " " + faker.name.firstName(),
      photo: faker.internet.avatar()
    },
    {
      id: 4,
      displayName: faker.name.lastName() + " " + faker.name.firstName(),
      photo: faker.internet.avatar()
    },
    {
      id: 5,
      displayName: faker.name.lastName() + " " + faker.name.firstName(),
      photo: faker.internet.avatar()
    },
    {
      id: 6,
      displayName: faker.name.lastName() + " " + faker.name.firstName(),
      photo: faker.internet.avatar()
    },
    {
      id: 7,
      displayName: faker.name.lastName() + " " + faker.name.firstName(),
      photo: faker.internet.avatar()
    },
    {
      id: 8,
      displayName: faker.name.lastName() + " " + faker.name.firstName(),
      photo: faker.internet.avatar()
    },
    {
      id: 9,
      displayName: faker.name.lastName() + " " + faker.name.firstName(),
      photo: faker.internet.avatar()
    },
    {
      id: 10,
      displayName: faker.name.lastName() + " " + faker.name.firstName(),
      photo: faker.internet.avatar()
    },
    {
      id: 11,
      displayName: faker.name.lastName() + " " + faker.name.firstName(),
      photo: faker.internet.avatar()
    }
  ];

  users$;
  groups$;

  constructor(private store: Store<fromStore.ContactsAppState>) {}

  ngOnInit(): void {
    this.statusTempate.createEmbeddedView({ car: this.car });
    this.statusTitleTempate.createEmbeddedView({ car: this.car });
    this.users$ = this.store.select(fromStore.getAllContacts);
    this.groups$ = of([
      {
        name: "Groups",
        items$: this.store.select(fromStore.getAllGroups)
      }
    ]);
    this.store.dispatch(new fromStore.LoadContacts());
    this.store.dispatch(new fromStore.LoadGroups());
  }
}
