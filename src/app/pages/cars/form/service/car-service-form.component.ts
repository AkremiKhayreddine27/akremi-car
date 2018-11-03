import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { of } from "rxjs";

@Component({
  selector: "ngx-car-service-form",
  templateUrl: "./car-service-form.component.html",
  styleUrls: ["./car-service-form.component.scss"]
})
export class CarServiceFormComponent implements OnInit {
  form: FormGroup;

  serviceHovred: boolean = false;

  categories: any[] = [
    {
      name: "Catégories",
      items$: of([{ id: 1, name: "Itervention", description: "" }])
    }
  ];
  categories$ = of(this.categories);

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

  services$ = of(this.services);

  ngOnInit() {
    this.form = new FormGroup({
      service: new FormControl(null)
    });
  }

  get service(): FormControl {
    return this.form.get("service") as FormControl;
  }

  setService(service) {
    this.form.patchValue({ service: service });
  }
}
