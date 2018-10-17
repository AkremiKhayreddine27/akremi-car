import * as faker from "faker";
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SearchModalComponent } from "../../../../../../projects/distinct-ui/src/lib/search-modal/search-modal.component";

import * as fromStore from "../../../../../../projects/dtl-contacts/src/lib/@core/store";
import { Store } from "@ngrx/store";

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

  @ViewChild("searchFiltersTemplate")
  searchFiltersTemplate: TemplateRef<any>;

  @ViewChild("searchItemTemplate")
  searchItemTemplate: TemplateRef<any>;

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

  constructor(
    private modalService: NgbModal,
    private store: Store<fromStore.ContactsAppState>
  ) {}

  ngOnInit(): void {
    this.statusTempate.createEmbeddedView({ car: this.car });
    this.statusTitleTempate.createEmbeddedView({ car: this.car });
  }

  changeDriver() {
    const modalRef = this.modalService.open(SearchModalComponent, {
      windowClass: "all-height"
    });
    modalRef.componentInstance.store = this.store;
    modalRef.componentInstance.select =
      fromStore.getPaginatedSortedFiltredContacts;
    modalRef.componentInstance.action = fromStore.LoadContacts;
    modalRef.componentInstance.itemTemplate = this.searchItemTemplate;
    modalRef.componentInstance.filtersItemTemplate = this.searchFiltersTemplate;
    let categories = [
      {
        display: "Groups",
        items$: this.store.select(fromStore.getAllGroups),
        field: "groups",
        filterFn: (cell: any[], search: any) => {
          let exist = false;
          cell.map(item => {
            if (item.value.toString() === search) {
              exist = true;
            }
          });
          return exist;
        }
      }
    ];
    modalRef.componentInstance.categories = categories;
    this.store.dispatch(new fromStore.LoadGroups());
    modalRef.result.then(result => {
      this.car.driver = result[0];
    }).catch(error => {

    });
  }
}
