import { Injectable } from "@angular/core";
import { DataService } from "./data.abstract";
import { User } from "../models";

import * as faker from "faker";
import { Group } from "../models/group";

@Injectable()
export class ContactsService extends DataService {
  groups: Group[] = [
    { value: 1, display: "Mon Entreprise" },
    { value: 2, display: "Prestataires" }
  ];

  generate(nbr, args = null) {
    for (let i = 0; i < nbr; i++) {
      const contact: User = {
        id: faker.random.number(),
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
        lastModified: new Date()
      };
      this.store(contact);
    }
  }

  assignContactToGroup(contact: User, group: Partial<User>) {
    //contact.groups.push(group);
  }
}
