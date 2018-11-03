import { Component, OnInit } from "@angular/core";
import * as faker from "faker";

@Component({
  selector: "ngx-car-documents-form",
  templateUrl: "./car-documents-form.component.html",
  styleUrls: ["./car-documents-form.component.scss"]
})
export class CarDocumentsFormComponent implements OnInit {
  icons = [
    "assets/images/pdf-icon.png",
    "assets/images/word-doc-icon.png",
    "assets/images/excel-xls-icon.png"
  ];

  documents = [
    {
      id: faker.random.number(),
      name: faker.system.fileName(),
      type: "autre",
      icon: faker.random.arrayElement(this.icons),
      lastModified: new Date()
    },
    {
      id: faker.random.number(),
      name: faker.system.fileName(),
      type: "paiement",
      icon: faker.random.arrayElement(this.icons),
      lastModified: new Date()
    },
    {
      id: faker.random.number(),
      name: faker.system.fileName(),
      type: "contrat",
      icon: faker.random.arrayElement(this.icons),
      lastModified: new Date()
    },
  ];

  ngOnInit(): void {}
}
