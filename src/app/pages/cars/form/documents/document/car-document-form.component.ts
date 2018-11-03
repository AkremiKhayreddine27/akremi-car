import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "ngx-car-document-form",
  templateUrl: "./car-document-form.component.html",
  styleUrls: ["./car-document-form.component.scss"]
})
export class CarDocumentFormComponent implements OnInit {
  @Input()
  document;

  showActions: boolean = false;

  ngOnInit(): void {}
}
