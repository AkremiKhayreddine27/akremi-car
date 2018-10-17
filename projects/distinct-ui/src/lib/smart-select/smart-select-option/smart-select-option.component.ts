import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewInit
} from "@angular/core";

@Component({
  selector: "ngx-smart-select-option",
  templateUrl: "./smart-select-option.component.html",
  styleUrls: ["./smart-select-option.component.scss"]
})
export class SmartSelectOptionComponent implements OnInit, AfterViewInit {
  @ViewChild("content")
  content: ElementRef;

  @Input()
  value;

  @Input()
  withDevider: boolean = false;

  @Output()
  clicked: EventEmitter<any> = new EventEmitter();

  display;

  isSelected = false;

  constructor() {}

  ngOnInit() {
    this.display = this.content.nativeElement.innerHTML;
  }

  ngAfterViewInit() {
    this.display = this.content.nativeElement.innerHTML;
  }

  optionClicked() {
    this.isSelected = true;
    this.clicked.emit({
      value: this.value,
      display: this.display,
      selected: this.isSelected
    });
  }
}
