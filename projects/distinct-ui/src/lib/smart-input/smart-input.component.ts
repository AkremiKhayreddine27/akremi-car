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

@Directive({
  selector: "[input-prefix]"
})
export class SmartInputPrefix {}

@Directive({
  selector: "[input-suffix]"
})
export class SmartInputSuffix {}

@Component({
  selector: "ngx-smart-input",
  templateUrl: "./smart-input.component.html",
  styleUrls: ["./smart-input.component.scss"]
})
export class SmartInputComponent
  implements OnInit, ControlValueAccessor, Validator {
  @Input()
  placeholder = "Saisir";

  @ViewChild("input")
  input: ElementRef;

  value;
  disabled: boolean;

  displayLabel = false;

  constructor(
    @Optional()
    @Self()
    public controlDir: NgControl
  ) {
    if (controlDir) {
      controlDir.valueAccessor = this;
    }
  }

  ngOnInit() {
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
}
