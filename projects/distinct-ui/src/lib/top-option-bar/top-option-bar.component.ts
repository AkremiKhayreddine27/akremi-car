import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  Input
} from "@angular/core";

@Component({
  selector: "ngx-top-option-bar-left",
  template: "<ng-content></ng-content>"
})
export class TopOptionBarLeftComponent {}

@Component({
  selector: "ngx-top-option-bar-right",
  template: "<ng-content></ng-content>"
})
export class TopOptionBarRightComponent {}

@Component({
  selector: "ngx-top-option-bar",
  templateUrl: "./top-option-bar.component.html",
  styleUrls: ["./top-option-bar.component.scss"]
})
export class TopOptionBarComponent implements OnInit, AfterViewInit {
  @Input()
  open: boolean = false;

  isViewInit: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.isViewInit = true;
    this.cdr.detectChanges();
  }
}
