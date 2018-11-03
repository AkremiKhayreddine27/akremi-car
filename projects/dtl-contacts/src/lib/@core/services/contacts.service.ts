import { Injectable } from "@angular/core";
import { DataService } from "./data.abstract";
import Dexie from "dexie";
import { User } from "../models";

import * as faker from "faker";
import { Group } from "../models/group";

import { DexieService } from "../db/dexie.service";

@Injectable()
export class ContactsService extends DataService {
  table: Dexie.Table<User, number>;

  groups: Group[] = [
    { value: 1, display: "Mon Entreprise" },
    { value: 2, display: "Assurances" },
    { value: 3, display: "Contrôle Technique" },
    { value: 4, display: "Entretient - Réparation" },
    { value: 5, display: "Equipements" },
    { value: 6, display: "Station Services" }
  ];

  constructor(private dexieService: DexieService) {
    super();
    this.table = this.dexieService.table("contacts");
  }

  getAll() {
    return this.table.toArray();
  }

  update(id: number, changes: Partial<User>) {
    return this.table.update(id, changes);
  }

  delete(id: number) {
    return this.table.delete(id);
  }

  deleteMany(ids: number[]) {
    return this.table.bulkDelete(ids);
  }

  generate(nbr, args = null) {
    return this.table.count().then(count => {
      if (count === 0) {
        for (let i = 0; i < nbr; i++) {
          const contact: User = {
            externalId: faker.random.number(),
            userName: faker.internet.userName(),
            title: "",
            userType: "",
            company: faker.company.companyName(),
            job: faker.name.jobTitle(),
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
                country: faker.address.country(),
                locality: faker.address.state(),
                postalCode: faker.address.zipCode(),
                city: faker.address.city(),
                address: faker.address.streetAddress(),
                state: faker.address.state(),
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
          };
          this.table.add(contact);
        }
      }
    });
  }

  assignContactToGroup(contact: User, group: Partial<User>) {
    //contact.groups.push(group);
  }
}
