import {
  OnInit,
  Component,
  Input,
  TemplateRef,
  ViewContainerRef,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter
} from "@angular/core";
import { Observable } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { OverlayRef, Overlay } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import { filter } from "../helpers/helpers";

@Component({
  selector: "ngx-search-modal",
  templateUrl: "./search-modal.component.html",
  styleUrls: ["./search-modal.component.scss"]
})
export class SearchModalComponent implements OnInit {
  @Input()
  data$: Observable<any[]>;

  data: any[];

  @Input()
  categories$: Observable<any[]>;

  @Input()
  itemTemplate: TemplateRef<any>;

  @Input()
  filtersItemTemplate: TemplateRef<any>;

  @Input()
  triggerTemplate: TemplateRef<any>;

  @Input()
  selectedItem: any;

  @Input()
  placeholder: any = "Chercher";

  @Input()
  multiple: boolean = false;

  @ViewChild("trigger")
  trigger: ElementRef;

  @Input()
  filterAttribute = "name";

  @ViewChild("contentTemplate")
  content: TemplateRef<any>;

  @Output()
  items: EventEmitter<any> = new EventEmitter<any>();

  private _overlayRef: OverlayRef;
  private _portal: TemplatePortal<any>;

  private _mobileOverlayRef: OverlayRef;
  private _mobilePortal: TemplatePortal<any>;

  showFilters: boolean = true;

  filterConf: any;

  filters = [];

  query;

  selectedItems: any[] = [];

  center: boolean = true;

  isMobile: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.data$.subscribe(d => {
      this.data = d;
    });
    this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  handleTriggerClicked() {
    if (this.isMobile) {
      this.mobileOpen();
    } else {
      this.open();
    }
  }

  open() {
    if (!this._overlayRef) {
      let positionStrategy;
      let width = "100%";
      let panelClass = "";
      if (this.center) {
        positionStrategy = this._overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically();
        width = "40%";
        panelClass = "select-border-radius";
      } else {
        positionStrategy = this._overlay
          .position()
          .global()
          .bottom("0");
      }
      this._overlayRef = this._overlay.create({
        hasBackdrop: true,
        positionStrategy,
        width: width,
        //maxHeight: "270px",
        panelClass: panelClass
      });
      this._overlayRef.backdropClick().subscribe(() => {
        this.close();
      });
      this._portal = new TemplatePortal(this.content, this._viewContainerRef);
    }

    this._overlayRef.attach(this._portal);
  }

  mobileOpen() {
    if (!this._mobileOverlayRef) {
      let positionStrategy;
      let width = "100%";
      positionStrategy = this._overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically();
      this._mobileOverlayRef = this._overlay.create({
        hasBackdrop: true,
        positionStrategy,
        width: width,
        height: "100%"
      });
      this._mobileOverlayRef.backdropClick().subscribe(() => {
        this.close();
      });
      this._mobilePortal = new TemplatePortal(
        this.content,
        this._viewContainerRef
      );
    }

    this._mobileOverlayRef.attach(this._mobilePortal);
  }

  close() {
    if (this._overlayRef) {
      this._overlayRef.detach();
    }
    if (this._mobileOverlayRef) {
      this._mobileOverlayRef.detach();
    }
    this.filterConf = null;
    this.filters = [];
    this.showFilters = true;
    this.selectedItems = [];
  }

  addFilter(filter) {
    this.filters.push(filter);
  }

  filter(field, filterFn, item) {}

  clearFilters() {
    this.filterConf.filters = this.filterConf.filters.filter(f => {
      return f.id !== 1;
    });
    this.filters = [];
    this.showFilters = true;
  }

  search(query: string) {
    if (query.length >= 3) {
      if (!this.filterConf) {
        this.filterConf = {
          filters: [{ field: "name", search: query }],
          andOperator: true
        };
      } else {
        this.filterConf.filters.push({
          field: "name",
          search: query
        });
      }
    } else {
      if (
        this.filterConf &&
        this.filterConf.filters &&
        this.filterConf.filters.length > 0
      ) {
        this.filterConf.filters = this.filterConf.filters.filter(f => {
          return f.id === 1;
        });
      }
    }
    this.data = filter(this.filterConf, this.data);
  }

  itemClicked(item) {
    this.query = null;
    const existe = this.selectedItems.find(i => {
      return i === item;
    });
    if (this.selectedItems.length >= 0 && this.multiple && !existe) {
      this.selectedItems.push(item);
    } else if (!this.multiple && !existe && this.selectedItems.length === 0) {
      this.selectedItems.push(item);
    } else if (!this.multiple && !existe && this.selectedItems.length > 0) {
      this.selectedItems[0] = item;
    }
  }

  removeItem(item) {
    this.selectedItems = this.selectedItems.filter(i => {
      return i !== item;
    });
  }

  save() {
    this.selectedItem = this.selectedItems[0];
    this.items.emit(this.selectedItem);
    this.close();
  }
}
