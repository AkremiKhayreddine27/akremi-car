import {
  OnInit,
  Component,
  Input,
  TemplateRef,
  Directive
} from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, of } from "rxjs";
import { FilterConf } from "../../../../dtl-documents/src/lib/@core/store/helpers";

@Directive({ selector: "[item-tmp]" })
export class ItemTemplateDirective {
  constructor(public template: TemplateRef<any>) {}
}

@Component({
  selector: "ngx-search-modal",
  templateUrl: "./search-modal.component.html",
  styleUrls: ["./search-modal.component.scss"]
})
export class SearchModalComponent implements OnInit {
  @Input()
  store: any;

  @Input()
  action;

  @Input()
  select;

  @Input()
  itemTemplate: TemplateRef<any>;

  @Input()
  filtersItemTemplate: TemplateRef<any>;

  @Input()
  categories;

  @Input()
  multiple: boolean = false;

  showFilters: boolean = true;

  data$: Observable<any[]>;

  filterConf: any;

  filters = [];

  query;

  selectedItems: any[] = [];

  ngOnInit(): void {}

  constructor(public activeModal: NgbActiveModal) {}

  close() {
    this.activeModal.dismiss();
  }

  addFilter(filter) {
    this.filters.push(filter);
  }

  filter(field, filterFn, item) {
    this.data$ = this.store.select(this.select);
    if (this.filterConf) {
      this.filterConf.filters.push({
        id: 1,
        field: field,
        search: item.value.toString(),
        filter: filterFn
      });
    } else {
      this.filterConf = {
        filters: [
          {
            id: 1,
            field: field,
            search: item.value.toString(),
            filter: filterFn
          }
        ],
        andOperator: true
      };
    }
    this.store.dispatch(new this.action(this.filterConf));
  }

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
          filters: [{ field: "name.familyName", search: query }],
          andOperator: true
        };
      } else {
        this.filterConf.filters.push({
          field: "name.familyName",
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
    this.data$ = this.store.select(this.select);
    this.store.dispatch(new this.action(this.filterConf));
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
    this.activeModal.close(this.selectedItems);
  }
}
