import {
  Component,
  OnInit,
  Input,
  Optional,
  Self,
  ViewChild,
  ElementRef,
  Directive
} from "@angular/core";
import {
  ControlValueAccessor,
  Validator,
  AbstractControl,
  ValidationErrors,
  NgControl,
  Validators
} from "@angular/forms";
import { AmazingTimePickerService } from "amazing-time-picker";
import * as dateFns from "date-fns";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

@Directive({
  selector: "[timepicker-prefix]"
})
export class SmartTimepickerPrefix {}

@Directive({
  selector: "[timepicker-suffix]"
})
export class SmartTimepickerSuffix {}

@Component({
  selector: "ngx-smart-timepicker",
  templateUrl: "./smart-timepicker.component.html",
  styleUrls: ["./smart-timepicker.component.scss"]
})
export class SmartTimepickerComponent
  implements OnInit, ControlValueAccessor, Validator {
  @Input()
  placeholder = "Saisir";

  @ViewChild("input")
  input: ElementRef;

  hours: any[] = [];

  value;
  disabled: boolean;

  displayLabel = false;

  isMobile: boolean = false;

  constructor(
    @Optional()
    @Self()
    public controlDir: NgControl,
    private breakpointObserver: BreakpointObserver
  ) {
    if (controlDir) {
      controlDir.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
    for (
      let h = dateFns.startOfDay(new Date());
      h <= dateFns.endOfDay(new Date());
      h = dateFns.addMinutes(h, 15)
    ) {
      this.hours.push(dateFns.format(h, "hh:mm"));
    }
    if (this.controlDir) {
      const control = this.controlDir.control;
      let validators = control.validator
        ? [control.validator, Validators.required]
        : Validators.required;
      control.setValidators(validators);
      control.updateValueAndValidity();
    }
  }

  writeValue(obj: any): void {
    this.input.nativeElement.value = obj ? obj : "";
    this.value = obj ? obj : "";
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(c: AbstractControl): ValidationErrors {
    return Validators.required(c);
  }

  onChange(value: any) {}

  onTouched() {}

  setHour(hour) {
    this.value = hour;
    this.onChange(hour);
  }
}
