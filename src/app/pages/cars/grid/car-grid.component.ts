import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "ngx-cars-grid",
  templateUrl: "./car-grid.component.html",
  styleUrls: ["./car-grid.component.scss"]
})
export class CarsGridComponent implements OnInit {
  @Input()
  cars;

  ngOnInit(): void {}
}
