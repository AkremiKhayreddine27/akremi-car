import { Component, OnInit } from "@angular/core";
import { Router, RoutesRecognized } from "@angular/router";
import { filter, pairwise, takeWhile } from "rxjs/operators";
import { of } from "rxjs";
import * as dateFns from "date-fns";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ShowComponent } from "../../../../../projects/dtl-contacts/src/lib/components";
import { User } from "../../../../../projects/dtl-contacts/src/lib/@core/models/user";
import * as faker from "faker";
import { Group } from "../../../../../projects/dtl-contacts/src/lib/@core/models";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import * as fromStore from "../../../../../projects/dtl-contacts/src/lib/@core/store";
import { Store } from "@ngrx/store";

@Component({
  selector: "ngx-cars-form",
  templateUrl: "./cars-form.component.html",
  styleUrls: ["./cars-form.component.scss"]
})
export class CarsFormComponent implements OnInit {
  previousUrl;
  alive: boolean = true;
  properties: any[] = [
    { id: 1, name: "Studio des Palmiers Baie Nettlé" },
    { id: 2, name: "Superbe duplex centre historique coeur de Bordeaux" }
  ];

  services: any[] = [
    {
      id: 1,
      name: "Immobilier",
      description: "",
      category: { id: 1, name: "Itervention", description: "" }
    },
    {
      id: 2,
      name: "Travaux",
      description: "",
      category: { id: 1, name: "Itervention", description: "" }
    },
    {
      id: 3,
      name: "Consommation",
      description: "",
      category: { id: 1, name: "Itervention", description: "" }
    },
    {
      id: 1,
      name: "Immobilier",
      description: "",
      category: { id: 1, name: "Itervention", description: "" }
    },
    {
      id: 2,
      name: "Travaux",
      description: "",
      category: { id: 1, name: "Itervention", description: "" }
    },
    {
      id: 3,
      name: "Consommation",
      description: "",
      category: { id: 1, name: "Itervention", description: "" }
    },
    {
      id: 1,
      name: "Immobilier",
      description: "",
      category: { id: 1, name: "Itervention", description: "" }
    },
    {
      id: 2,
      name: "Travaux",
      description: "",
      category: { id: 1, name: "Itervention", description: "" }
    },
    {
      id: 3,
      name: "Consommation",
      description: "",
      category: { id: 1, name: "Itervention", description: "" }
    },
    {
      id: 1,
      name: "Immobilier",
      description: "",
      category: { id: 1, name: "Itervention", description: "" }
    },
    {
      id: 2,
      name: "Travaux",
      description: "",
      category: { id: 1, name: "Itervention", description: "" }
    },
    {
      id: 3,
      name: "Consommation",
      description: "",
      category: { id: 1, name: "Itervention", description: "" }
    },
    {
      id: 1,
      name: "Immobilier",
      description: "",
      category: { id: 1, name: "Itervention", description: "" }
    },
    {
      id: 2,
      name: "Travaux",
      description: "",
      category: { id: 1, name: "Itervention", description: "" }
    },
    {
      id: 3,
      name: "Consommation",
      description: "",
      category: { id: 1, name: "Itervention", description: "" }
    }
  ];

  groups: Group[] = [
    { value: 1, display: "Mon Entreprise" },
    { value: 2, display: "Assurances" },
    { value: 3, display: "Contrôle Technique" },
    { value: 4, display: "Entretient - Réparation" },
    { value: 5, display: "Equipements" },
    { value: 6, display: "Station Services" }
  ];

  groups$;
  clients: User[] = [
    {
      externalId: faker.random.number(),
      userName: faker.internet.userName(),
      title: "",
      userType: "",
      name: {
        familyName: faker.name.firstName(),
        givenName: faker.name.lastName()
      },
      phoneNumbers: [
        {
          value: faker.phone.phoneNumber(),
          type: "work",
          primary: true
        }
      ],
      emails: [
        {
          value: faker.internet.email(),
          type: "work",
          primary: true
        }
      ],
      addresses: [
        {
          country: faker.address.countryCode(),
          locality: faker.address.state(),
          postalCode: faker.address.zipCode(),
          primary: true,
          region: faker.address.stateAbbr(),
          type: "home"
        }
      ],
      photo: faker.random.arrayElement([faker.internet.avatar(), null]),
      groups: [faker.random.arrayElement(this.groups)],
      roles: [],
      active: false,
      created: new Date(),
      followed: faker.random.arrayElement([true, false]),
      lastModified: new Date()
    }
  ];

  providers: User[] = [
    {
      externalId: faker.random.number(),
      userName: faker.internet.userName(),
      title: "",
      userType: "",
      name: {
        familyName: faker.name.firstName(),
        givenName: faker.name.lastName()
      },
      phoneNumbers: [
        {
          value: faker.phone.phoneNumber(),
          type: "work",
          primary: true
        }
      ],
      emails: [
        {
          value: faker.internet.email(),
          type: "work",
          primary: true
        }
      ],
      addresses: [
        {
          country: faker.address.countryCode(),
          locality: faker.address.state(),
          postalCode: faker.address.zipCode(),
          primary: true,
          region: faker.address.stateAbbr(),
          type: "home"
        }
      ],
      photo: faker.random.arrayElement([faker.internet.avatar(), null]),
      groups: [faker.random.arrayElement(this.groups)],
      roles: [],
      active: false,
      created: new Date(),
      followed: faker.random.arrayElement([true, false]),
      lastModified: new Date()
    }
  ];
  users$;
  statuses: any[] = [
    { id: 1, value: "Validée" },
    { id: 2, value: "Provisoire" },
    { id: 3, value: "Annulée" },
    { id: 4, value: "Terminée" }
  ];

  priorities: any[] = [
    { id: 1, value: "Basse" },
    { id: 2, value: "Normale" },
    { id: 3, value: "Urgent" }
  ];

  form: FormGroup;

  constructor(
    private store: Store<fromStore.ContactsAppState>,
    public router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new fromStore.LoadContacts());
    this.store.dispatch(new fromStore.LoadGroups());
    this.users$ = this.store.select(fromStore.getAllContacts);
    this.groups$ = of([
      {
        name: "Groups",
        items$: this.store.select(fromStore.getAllGroups)
      }
    ]);
    this.form = new FormGroup({
      property: new FormControl(this.properties[0]),
      service: new FormControl(this.services[0]),
      client: new FormControl(null),
      assignedTo: new FormControl(null),
      provider: new FormControl(this.providers[0]),
      workforce: new FormControl(null, [
        Validators.required,
        Validators.min(0)
      ]),
      products: new FormControl(10, [Validators.required, Validators.min(0)]),
      discount: new FormControl(5, [Validators.required, Validators.min(0)]),
      tva: new FormControl(5, [Validators.required, Validators.min(0)]),
      total: new FormControl(null),
      date: new FormControl(
        dateFns.format(new Date(), "YYYY-MM-DD"),
        Validators.required
      ),
      time: new FormControl(
        dateFns.format(dateFns.setMinutes(new Date(), 0), "hh:mm"),
        Validators.required
      ),
      startDate: new FormControl(
        dateFns.format(new Date(), "YYYY-MM-DD"),
        Validators.required
      ),
      startTime: new FormControl(
        dateFns.format(dateFns.setMinutes(new Date(), 0), "hh:mm"),
        Validators.required
      ),
      endDatePlanned: new FormControl(
        dateFns.format(new Date(), "YYYY-MM-DD"),
        Validators.required
      ),
      endTimePlanned: new FormControl(
        dateFns.format(dateFns.setMinutes(new Date(), 0), "hh:mm"),
        Validators.required
      ),
      endDateReal: new FormControl(
        dateFns.format(new Date(), "YYYY-MM-DD"),
        Validators.required
      ),
      endTimeReal: new FormControl(
        dateFns.format(dateFns.setMinutes(new Date(), 0), "hh:mm"),
        Validators.required
      )
    });
  }

  get property(): FormControl {
    return this.form.get("property") as FormControl;
  }

  get service(): FormControl {
    return this.form.get("service") as FormControl;
  }

  get client(): FormControl {
    return this.form.get("client") as FormControl;
  }

  get provider(): FormControl {
    return this.form.get("provider") as FormControl;
  }

  get assignedTo(): FormControl {
    return this.form.get("assignedTo") as FormControl;
  }

  get workforce(): FormControl {
    return this.form.get("workforce") as FormControl;
  }

  get products(): FormControl {
    return this.form.get("products") as FormControl;
  }

  get discount(): FormControl {
    return this.form.get("discount") as FormControl;
  }

  get tva(): FormControl {
    return this.form.get("tva") as FormControl;
  }

  setClient(contact) {
    this.form.patchValue({ client: contact });
  }

  setAssignedTo(contact) {
    this.form.patchValue({ assignedTo: contact });
  }

  setProvider(contact) {
    this.form.patchValue({ provider: contact });
  }

  addContact() {
    const modalRef = this.modalService.open(ShowComponent, {
      windowClass: "all-height"
    });
    modalRef.componentInstance.edit = true;
  }

  showContact(contact: User) {
    const modalRef = this.modalService.open(ShowComponent, {
      windowClass: "all-height"
    });
    modalRef.componentInstance.edit = false;
    modalRef.componentInstance.contact = contact;
  }

  save() {
    console.log(this.form.value);
  }

  back() {
    this.router.events
      .pipe(
        filter((e: any) => e instanceof RoutesRecognized),
        pairwise(),
        takeWhile(() => this.alive)
      )
      .subscribe((e: any) => {
        if (e[0].urlAfterRedirects) {
          this.previousUrl = e[0].urlAfterRedirects;
        }
      });
    if (this.previousUrl) {
      this.router.navigateByUrl(this.previousUrl);
    } else {
      this.router.navigateByUrl("/pages/cars");
    }
  }
}
