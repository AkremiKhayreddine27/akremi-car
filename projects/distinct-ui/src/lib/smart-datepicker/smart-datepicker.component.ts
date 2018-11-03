import {
  Component,
  ViewContainerRef,
  ViewChild,
  ElementRef,
  TemplateRef,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Directive,
  Optional,
  Self
} from "@angular/core";
import { OverlayRef, Overlay } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import * as dateFns from "date-fns";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import {
  NgControl,
  AbstractControl,
  ValidationErrors,
  Validators,
  ControlValueAccessor,
  Validator
} from "@angular/forms";

export const DAYS_IN_WEEK = 7;
export const HOURS_IN_DAY = 24;
export enum DAYS_OF_WEEK {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6
}
export const DEFAULT_WEEKEND_DAYS: number[] = [
  DAYS_OF_WEEK.SUNDAY,
  DAYS_OF_WEEK.SATURDAY
];

export interface WeekDay {
  date: Date;
  isPast: boolean;
  isToday: boolean;
  isFuture: boolean;
  isWeekend: boolean;
  cssClass?: string;
}

export interface MonthViewDay<MetaType = any> extends WeekDay {
  inMonth: boolean;
  events: any[];
  backgroundColor?: string;
  badgeTotal: number;
  meta?: MetaType;
}

@Directive({
  selector: "[datepicker-prefix]"
})
export class SmartDatepickerPrefix {}

@Directive({
  selector: "[datepicker-suffix]"
})
export class SmartDatepickerSuffix {}

@Component({
  selector: "ngx-smart-datepicker",
  templateUrl: "./smart-datepicker.component.html",
  styleUrls: ["./smart-datepicker.component.scss"]
})
export class SmartDatepickerComponent
  implements OnInit, ControlValueAccessor, Validator {
  @Input()
  date: Date = new Date();

  @Input()
  placeholder: string = "Choisir une date";

  @Input()
  displayNavigation: boolean = true;

  @Output()
  dateChanged: EventEmitter<Date> = new EventEmitter<Date>();

  @Output()
  navigation: EventEmitter<any> = new EventEmitter<any>();

  isYearView: boolean = false;

  isMonthView: boolean = true;

  isMonthsView: boolean = false;

  view: any;

  years: any[] = [];

  months: any[] = [];

  selectedDate: Date = this.date;

  displayLabel: boolean = false;

  @ViewChild("trigger")
  trigger: ElementRef;

  @ViewChild("contentTemplate")
  content: TemplateRef<any>;

  @ViewChild("input")
  input: ElementRef;

  private _overlayRef: OverlayRef;
  private _portal: TemplatePortal<any>;

  disabled: boolean;

  center: boolean = true;

  isMobile: boolean = false;

  constructor(
    @Optional()
    @Self()
    public controlDir: NgControl,
    private breakpointObserver: BreakpointObserver,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef
  ) {
    if (controlDir) {
      controlDir.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.getView();
    this.getYears();
    this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
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

  handleTrigger() {
    if (!this.isMobile) {
      this.open();
    }
  }

  open() {
    if (!this._overlayRef) {
      let positionStrategy = this._overlay
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
      this._overlayRef = this._overlay.create({
        hasBackdrop: true,
        backdropClass: "cdk-overlay-transparent-backdrop",
        positionStrategy
      });
      this._overlayRef.backdropClick().subscribe(() => {
        this.close();
      });
      this._portal = new TemplatePortal(this.content, this._viewContainerRef);
    }
    this._overlayRef.attach(this._portal);
  }

  close() {
    if (this._overlayRef) {
      this.displayLabel = false;
      this._overlayRef.detach();
    }
  }

  save() {
    this.date = this.selectedDate;
    this.close();
  }

  dayClicked(date: Date) {
    this.selectedDate = date;
    this.input.nativeElement.value = dateFns.format(date, "YYYY-MM-DD");
    this.onChange(dateFns.format(date, "YYYY-MM-DD"));
    if (!this.isMobile) {
      this.date = date;
      this.close();
    }
  }

  yearClicked(year: Date) {
    this.date = dateFns.setYear(this.date, year.getFullYear());
    this.getMonths();
    this.isMonthsView = true;
    this.isYearView = false;
  }

  monthClicked(month: Date) {
    this.date = dateFns.setMonth(this.date, month.getMonth());
    this.getView();
    this.isMonthsView = false;
    this.isYearView = false;
    this.isMonthView = true;
  }

  getMonths() {
    this.months = [];
    for (
      let month = dateFns.startOfYear(this.date);
      month < dateFns.endOfYear(this.date);
      month = dateFns.addMonths(month, 1)
    ) {
      this.months.push({
        date: month,
        isPast: month < new Date(),
        isCurrent: dateFns.isSameMonth(month, new Date()),
        isFuture: month > new Date()
      });
    }
  }

  switchView() {
    this.isMonthView = !this.isMonthView;
    this.isYearView = !this.isYearView;
    if (this.isMonthsView) {
      this.isYearView = false;
    }
    this.isMonthsView = false;
  }

  navigate(action: string) {
    switch (action) {
      case "next":
        if (this.isMonthsView) {
          this.date = dateFns.addYears(this.date, 1);
          this.getMonths();
        } else if (this.isYearView) {
          this.date = dateFns.addYears(this.date, 25);
          this.getYears();
        } else if (this.isMonthView) {
          this.date = dateFns.addMonths(this.date, 1);
          this.getView();
        }
        this.navigation.emit({
          action: "next",
          date: this.date
        });
        break;
      case "previous":
        if (this.isMonthsView) {
          this.date = dateFns.subYears(this.date, 1);
          this.getMonths();
        } else if (this.isYearView) {
          this.date = dateFns.subYears(this.date, 25);
          this.getYears();
        } else if (this.isMonthView) {
          this.date = dateFns.subMonths(this.date, 1);
          this.getView();
        }
        this.navigation.emit({
          action: "previous",
          date: this.date
        });
        break;
    }
  }

  getView() {
    this.view = this.getMonthViewGrid({
      viewDate: this.date,
      weekStartsOn: 1,
      excluded: [],
      weekendDays: []
    });
  }

  getMonthViewGrid({
    viewDate,
    weekStartsOn,
    excluded = [],
    viewStart = dateFns.startOfMonth(viewDate),
    viewEnd = dateFns.endOfMonth(viewDate),
    weekendDays
  }) {
    let start: Date = dateFns.startOfWeek(viewStart, { weekStartsOn });
    const end: Date = dateFns.endOfWeek(viewEnd, { weekStartsOn });
    const monthRows = (dateFns.differenceInDays(end, start) + 1) / 7;
    const weeks = [];
    for (let week = 0; week < monthRows; week++) {
      const endWeek: Date = dateFns.addDays(start, DAYS_IN_WEEK);
      const weekDays = this.getMonthWeekDays(
        viewDate,
        endWeek,
        start,
        excluded
      );
      weeks.push({
        days: weekDays
      });
      start = dateFns.addHours(start, DAYS_IN_WEEK * HOURS_IN_DAY);
    }
    return {
      year: dateFns.format(viewDate, "YYYY"),
      month: dateFns.format(viewDate, "MMMM"),
      weeks: weeks
    };
  }

  getWeekDay({
    date,
    weekendDays = DEFAULT_WEEKEND_DAYS
  }: {
    date: Date;
    weekendDays: number[];
  }) {
    const today: Date = dateFns.startOfDay(new Date());
    return {
      date,
      isPast: date < today,
      isToday: dateFns.isSameDay(date, today),
      isFuture: date > today,
      isWeekend: weekendDays.indexOf(dateFns.getDay(date)) > -1
    };
  }

  getMonthWeekDays(viewDate, endWeek, start, excluded) {
    let previousDate = null;
    const weekDays = [];
    for (let i = 0; i < dateFns.differenceInDays(endWeek, start); i++) {
      let date: Date;
      if (previousDate) {
        date = dateFns.startOfDay(dateFns.addHours(previousDate, HOURS_IN_DAY));
        if (previousDate.getTime() === date.getTime()) {
          date = dateFns.startOfDay(
            dateFns.addHours(previousDate, HOURS_IN_DAY + 1)
          );
        }
        previousDate = date;
      } else {
        date = previousDate = start;
      }
      if (!excluded.some(e => date.getDay() === e)) {
        const day: MonthViewDay = this.getWeekDay({
          date,
          weekendDays: []
        }) as MonthViewDay;
        day.inMonth = dateFns.isSameMonth(date, viewDate);
        weekDays.push(day);
      }
    }
    return weekDays;
  }

  getYears() {
    this.years = [];
    for (
      let year = dateFns.subYears(this.date, 3);
      year < dateFns.addYears(this.date, 25);
      year = dateFns.addYears(year, 1)
    ) {
      const today: Date = new Date();
      this.years.push({
        date: year,
        isPast: year < today,
        isCurrent: dateFns.isSameYear(year, today),
        isFuture: year > today
      });
    }
  }
}
