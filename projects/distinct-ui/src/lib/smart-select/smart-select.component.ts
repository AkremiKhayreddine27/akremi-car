import {
  Component,
  OnInit,
  Input,
  Optional,
  Self,
  TemplateRef,
  ContentChildren,
  QueryList,
  ViewChild,
  ElementRef,
  ViewContainerRef
} from "@angular/core";

import {
  ControlValueAccessor,
  NgControl,
  AbstractControl,
  ValidationErrors,
  Validators,
  Validator
} from "@angular/forms";
import { SmartSelectOptionComponent } from "./smart-select-option/smart-select-option.component";
import { AfterViewInit } from "@angular/core";
import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";

@Component({
  selector: "ngx-smart-select",
  templateUrl: "./smart-select.component.html",
  styleUrls: ["./smart-select.component.scss"]
})
export class SmartSelectComponent
  implements OnInit, AfterViewInit, ControlValueAccessor, Validator {
  @ViewChild("trigger")
  trigger: ElementRef;

  @ViewChild("contentTemplate")
  content: TemplateRef<any>;

  @ViewChild("mobileContent")
  mobileContent: TemplateRef<any>;

  private _overlayRef: OverlayRef;
  private _mobileOverlayRef: OverlayRef;
  private _portal: TemplatePortal<any>;
  private _mobilePortal: TemplatePortal<any>;

  @Input()
  placeholder = "Choisir une option";

  @Input()
  label;

  @Input()
  titleTemplate: TemplateRef<any>;

  @Input()
  triggerTemplate: TemplateRef<any>;

  @Input()
  multiple: boolean = false;

  @Input()
  center: boolean = false;

  @Input()
  right: boolean = false;

  @Input()
  width: number;

  @ContentChildren(SmartSelectOptionComponent, { descendants: true })
  options: QueryList<SmartSelectOptionComponent>;

  selectedValue;
  selectedDisplay;
  disabled: boolean;

  constructor(
    @Optional()
    @Self()
    public controlDir: NgControl,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef
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

  ngAfterViewInit(): void {
    this.options.map(option => {
      option.clicked.subscribe(selected => {
        this.assignValue(selected);
        if (this._overlayRef) {
          this._overlayRef.detach();
        }
        if (this._mobileOverlayRef) {
          this._mobileOverlayRef.detach();
        }
      });
    });
  }

  open() {
    if (!this._overlayRef) {
      let positionStrategy = this._overlay
        .position()
        .connectedTo(
          this.trigger,
          { originX: "start", originY: "bottom" },
          { overlayX: "start", overlayY: "top" }
        )
        .withFallbackPosition(
          { originX: "start", originY: "top" },
          { overlayX: "start", overlayY: "bottom" }
        );
      if (this.right) {
        positionStrategy = this._overlay
          .position()
          .connectedTo(
            this.trigger,
            { originX: "end", originY: "bottom" },
            { overlayX: "end", overlayY: "top" }
          )
          .withFallbackPosition(
            { originX: "end", originY: "top" },
            { overlayX: "end", overlayY: "bottom" }
          );
      }
      this._overlayRef = this._overlay.create({
        hasBackdrop: true,
        backdropClass: "cdk-overlay-transparent-backdrop",
        positionStrategy
        //width: this.trigger.nativeElement.offsetWidth
      });

      this._overlayRef
        .backdropClick()
        .subscribe(() => this._overlayRef.detach());
      this._portal = new TemplatePortal(this.content, this._viewContainerRef);
    }

    this._overlayRef.attach(this._portal);
  }

  mobileOpen() {
    if (!this._mobileOverlayRef) {
      let positionStrategy;
      let width = "100%";
      let panelClass = "";
      if (this.center) {
        positionStrategy = this._overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically();
        width = "80%";
        panelClass = "select-border-radius";
      } else {
        positionStrategy = this._overlay
          .position()
          .global()
          .bottom("0");
      }
      this._mobileOverlayRef = this._overlay.create({
        hasBackdrop: true,
        positionStrategy,
        width: width,
        maxHeight: "270px",
        panelClass: panelClass
      });
      this._mobileOverlayRef
        .backdropClick()
        .subscribe(() => this._mobileOverlayRef.detach());
      this._mobilePortal = new TemplatePortal(
        this.mobileContent,
        this._viewContainerRef
      );
    }

    this._mobileOverlayRef.attach(this._mobilePortal);
  }

  assignValue(selected) {
    let existe = false;
    if (this.multiple && (!this.selectedValue || !this.selectedDisplay)) {
      this.selectedDisplay = [];
      this.selectedValue = [];
    }
    if (this.multiple && Array.isArray(this.selectedValue)) {
      existe = this.selectedValue.find(item => item === selected.value);
      if (!existe) {
        this.selectedDisplay = [...this.selectedDisplay, selected.display];
        this.selectedValue = [...this.selectedValue, selected.value];
      } else {
        this.selectedDisplay = this.selectedDisplay.filter(
          item => item !== selected.display
        );
        this.selectedValue = this.selectedValue.filter(
          item => item !== selected.value
        );
        this.options.map(option => {
          if (option.value === selected.value) {
            option.isSelected = false;
          }
        });
        if (this.selectedDisplay.length === 0) {
          this.selectedDisplay = null;
        }
      }
    } else if (!this.multiple) {
      existe = this.selectedValue === selected.value;
      if (!existe) {
        this.selectedDisplay = selected.display;
        this.selectedValue = selected.value;
        this.options.map(option => {
          if (option.value !== selected.value) {
            option.isSelected = false;
          }
        });
      }
    }
    this.onChange(this.selectedValue);
  }

  get triggerContext() {
    return {
      selected: this.selectedDisplay,
      placeholder: this.placeholder
    };
  }

  writeValue(obj: any): void {
    this.selectedValue = obj;
    if (this.options) {
      this.options.map(option => {
        if (
          option.value &&
          this.selectedValue &&
          option.value.id === this.selectedValue.id
        ) {
          this.selectedDisplay = option.display;
          option.isSelected = true;
        }
      });
    }
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

  onChange(value: any) {}

  onTouched() {}

  validate(ctrl: AbstractControl): ValidationErrors {
    return Validators.required(ctrl);
  }
}
