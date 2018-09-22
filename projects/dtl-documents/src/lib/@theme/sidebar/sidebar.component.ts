import { Component, OnInit, AfterViewInit } from "@angular/core";
import { NbSidebarService } from "@nebular/theme";

@Component({
  selector: "dtl-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit, AfterViewInit {
  alive = true;

  labels = [
    {
      id: 1,
      name: "Bien"
    },
    {
      id: 2,
      name: "Réservation"
    },
    {
      id: 3,
      name: "Service"
    }
  ];

  types = [
    {
      id: 1,
      name: "Facture"
    },
    {
      id: 1,
      name: "Contrat"
    },
    {
      id: 2,
      name: "Paiement"
    },
    {
      id: 3,
      name: "Autre"
    }
  ];

  displayItemTitle = false;
  displayLabels = true;
  displayTypes = true;
  constructor(private sidebarService: NbSidebarService) {}

  ngOnInit() {
    this.sidebarService.onToggle().subscribe(event => {
      this.displayItemTitle = !this.displayItemTitle;
    });
  }

  ngAfterViewInit() {}
}
