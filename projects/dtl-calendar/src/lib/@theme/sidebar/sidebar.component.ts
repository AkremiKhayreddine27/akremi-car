import { Component, OnInit, AfterViewInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: "dtl-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit, AfterViewInit {

  currentDate = new Date();

  constructor(
    private modalService: NgbModal
  ) {}

  ngOnInit() {

  }

  ngAfterViewInit() {

  }
}
