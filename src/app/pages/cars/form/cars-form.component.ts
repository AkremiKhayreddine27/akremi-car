import { Component, OnInit } from "@angular/core";
import { Router, RoutesRecognized } from "@angular/router";
import { filter, pairwise, takeWhile } from "rxjs/operators";

@Component({
  selector: "ngx-cars-form",
  templateUrl: "./cars-form.component.html",
  styleUrls: ["./cars-form.component.scss"]
})
export class CarsFormComponent implements OnInit {
  previousUrl;
  alive: boolean = true;
  constructor(public router: Router) {}
  ngOnInit(): void {}

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
