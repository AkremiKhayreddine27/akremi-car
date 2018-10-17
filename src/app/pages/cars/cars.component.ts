import { Component, OnInit } from "@angular/core";
import * as faker from "faker";

@Component({
  selector: "ngx-cars",
  templateUrl: "./cars.component.html",
  styleUrls: ["./cars.component.scss"]
})
export class CarsComponent implements OnInit {
  isGridView: boolean = true;
  isTopOptionsBarOpen: boolean = false;
  previousUrl: string;
  alive: boolean = true;

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

  types = [
    {
      id: 1,
      value: "Van"
    },
    {
      id: 2,
      value: "Car"
    },
    {
      id: 2,
      value: "SUV"
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

  cars: any[] = [];

  selectedData: any[] = [];
  allSelected: any = { type: "event", checked: false };

  isPageHeaderExtended: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.cars = [
      {
        id: 1,
        title: "A-1",
        model: "2011 Honda Pilot",
        plate: "DNCV5647TY",
        vin: "TY6789JUHJKLL87",
        status: faker.random.arrayElement(this.statuses),
        type: faker.random.arrayElement(this.types),
        driver: {
          name: {
            familyName: faker.name.firstName(),
            givenName: faker.name.lastName()
          },
          displayName: faker.name.lastName() + " " + faker.name.firstName(),
          photo: faker.internet.avatar()
        },
        odometer: 120.025,
        photo: "assets/images/car-1.jpg"
      },
      {
        id: 2,
        title: "A-2",
        model: "2011 Honda Pilot",
        plate: "DNCV5647TY",
        vin: "TY6789JUHJKLL87",
        status: faker.random.arrayElement(this.statuses),
        type: faker.random.arrayElement(this.types),
        driver: {
          name: {
            familyName: faker.name.firstName(),
            givenName: faker.name.lastName()
          },
          displayName: faker.name.lastName() + " " + faker.name.firstName(),
          photo: faker.internet.avatar()
        },
        odometer: 165.987,
        photo: "assets/images/car-2.jpg"
      },
      {
        id: 3,
        title: "A-3",
        model: "2011 Honda Pilot",
        plate: "DNCV5647TY",
        vin: "TY6789JUHJKLL87",
        status: faker.random.arrayElement(this.statuses),
        type: faker.random.arrayElement(this.types),
        driver: {
          name: {
            familyName: faker.name.firstName(),
            givenName: faker.name.lastName()
          },
          displayName: faker.name.lastName() + " " + faker.name.firstName(),
          photo: faker.internet.avatar()
        },
        odometer: 276.567,
        photo: "assets/images/car-3.jpg"
      },
      {
        id: 4,
        title: "A-4",
        model: "2011 Honda Pilot",
        plate: "DNCV5647TY",
        vin: "TY6789JUHJKLL87",
        status: faker.random.arrayElement(this.statuses),
        type: faker.random.arrayElement(this.types),
        driver: {
          name: {
            familyName: faker.name.firstName(),
            givenName: faker.name.lastName()
          },
          displayName: faker.name.lastName() + " " + faker.name.firstName(),
          photo: faker.internet.avatar()
        },
        odometer: 129.643,
        photo: "assets/images/car-4.jpg"
      },
      {
        id: 5,
        title: "A-5",
        model: "2011 Honda Pilot",
        plate: "DNCV5647TY",
        vin: "TY6789JUHJKLL87",
        status: faker.random.arrayElement(this.statuses),
        type: faker.random.arrayElement(this.types),
        driver: {
          name: {
            familyName: faker.name.firstName(),
            givenName: faker.name.lastName()
          },
          displayName: faker.name.lastName() + " " + faker.name.firstName(),
          photo: faker.internet.avatar()
        },
        odometer: 654.765,
        photo: "assets/images/car-5.jpg"
      },
      {
        id: 6,
        title: "A-6",
        model: "2011 Honda Pilot",
        plate: "DNCV5647TY",
        vin: "TY6789JUHJKLL87",
        status: faker.random.arrayElement(this.statuses),
        type: faker.random.arrayElement(this.types),
        driver: {
          name: {
            familyName: faker.name.firstName(),
            givenName: faker.name.lastName()
          },
          displayName: faker.name.lastName() + " " + faker.name.firstName(),
          photo: faker.internet.avatar()
        },
        odometer: 654.765,
        photo: "assets/images/car-5.jpg"
      },
      {
        id: 7,
        title: "A-7",
        model: "2011 Honda Pilot",
        plate: "DNCV5647TY",
        vin: "TY6789JUHJKLL87",
        status: faker.random.arrayElement(this.statuses),
        type: faker.random.arrayElement(this.types),
        driver: {
          name: {
            familyName: faker.name.firstName(),
            givenName: faker.name.lastName()
          },
          displayName: faker.name.lastName() + " " + faker.name.firstName(),
          photo: faker.internet.avatar()
        },
        odometer: 654.765,
        photo: "assets/images/car-5.jpg"
      },
      {
        id: 8,
        title: "A-8",
        model: "2011 Honda Pilot",
        plate: "DNCV5647TY",
        vin: "TY6789JUHJKLL87",
        status: faker.random.arrayElement(this.statuses),
        type: faker.random.arrayElement(this.types),
        driver: {
          name: {
            familyName: faker.name.firstName(),
            givenName: faker.name.lastName()
          },
          displayName: faker.name.lastName() + " " + faker.name.firstName(),
          photo: faker.internet.avatar()
        },
        odometer: 654.765,
        photo: "assets/images/car-5.jpg"
      },
      {
        id: 9,
        title: "A-9",
        model: "2011 Honda Pilot",
        plate: "DNCV5647TY",
        vin: "TY6789JUHJKLL87",
        status: faker.random.arrayElement(this.statuses),
        type: faker.random.arrayElement(this.types),
        driver: {
          name: {
            familyName: faker.name.firstName(),
            givenName: faker.name.lastName()
          },
          displayName: faker.name.lastName() + " " + faker.name.firstName(),
          photo: faker.internet.avatar()
        },
        odometer: 654.765,
        photo: "assets/images/car-5.jpg"
      },
      {
        id: 10,
        title: "A-10",
        model: "2011 Honda Pilot",
        plate: "DNCV5647TY",
        vin: "TY6789JUHJKLL87",
        status: faker.random.arrayElement(this.statuses),
        type: faker.random.arrayElement(this.types),
        driver: {
          name: {
            familyName: faker.name.firstName(),
            givenName: faker.name.lastName()
          },
          displayName: faker.name.lastName() + " " + faker.name.firstName(),
          photo: faker.internet.avatar()
        },
        odometer: 654.765,
        photo: "assets/images/car-5.jpg"
      },
      {
        id: 11,
        title: "A-11",
        model: "2011 Honda Pilot",
        plate: "DNCV5647TY",
        vin: "TY6789JUHJKLL87",
        status: faker.random.arrayElement(this.statuses),
        type: faker.random.arrayElement(this.types),
        driver: {
          name: {
            familyName: faker.name.firstName(),
            givenName: faker.name.lastName()
          },
          displayName: faker.name.lastName() + " " + faker.name.firstName(),
          photo: faker.internet.avatar()
        },
        odometer: 654.765,
        photo: "assets/images/car-5.jpg"
      },
      {
        id: 12,
        title: "A-12",
        model: "2011 Honda Pilot",
        plate: "DNCV5647TY",
        vin: "TY6789JUHJKLL87",
        status: faker.random.arrayElement(this.statuses),
        type: faker.random.arrayElement(this.types),
        driver: {
          name: {
            familyName: faker.name.firstName(),
            givenName: faker.name.lastName()
          },
          displayName: faker.name.lastName() + " " + faker.name.firstName(),
          photo: faker.internet.avatar()
        },
        odometer: 654.765,
        photo: "assets/images/car-5.jpg"
      }
    ];
  }

  handleRowClicked(car) {}

  handleSelectRowChanged(event) {
    if (event.checked) {
      this.selectedData.push(event.row);
    } else {
      this.selectedData = this.selectedData.filter(item => {
        return item.id !== event.row.id;
      });
    }
    this.allSelected = {
      type: "change",
      checked: this.selectedData.length === this.cars.length
    };
  }

  selectAll(checked) {
    if (checked) {
      this.selectedData = this.cars;
      this.allSelected = { ...this.allSelected, type: "event", checked: true };
    } else {
      this.resetSelected();
    }
  }

  resetSelected() {
    this.selectedData = [];
    this.allSelected = { ...this.allSelected, type: "event", checked: false };
  }
}
