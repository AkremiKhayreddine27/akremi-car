import { Component, OnInit, AfterViewInit } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableConfig } from "distinct-table";
import { FileComponent } from "./components/file/file.component";

import { Store } from "@ngrx/store";
import * as fromStore from "./@core/store";
import { Pagination } from "./@core/store/helpers";
import { Document, Category, DocumentType } from "./@core/models";
import { delay, takeWhile } from "rxjs/operators";
import { CreateComponent, DeleteComponent } from "./components";

@Component({
  selector: "dtl-documents",
  templateUrl: "./dtl-documents.component.html",
  styleUrls: ["./dtl-documents.component.scss"]
})
export class DtlDocumentsComponent implements OnInit, AfterViewInit {
  documents: Document[] = [];
  config: any = {
    displayHeader: true,
    bordred: false,
    showActionsType: "hover",
    alignDesktop: "start",
    alignMobile: "start",
    selectType: "image",
    imagePath: "avatar",
    lettersPath: "firstname",
    collapsedRow: true,
    collapseComponent: FileComponent,
    collapseDataPath: "file",
    header: [
      {
        width: "col-3",
        label: "Name",
        sort: {
          attributes: [{ name: "Name", path: "title", direction: "desc" }]
        }
      },
      {
        width: "col-3",
        label: "Type",
        sort: {
          attributes: [{ name: "Type", path: "type.name", direction: "desc" }]
        }
      },
      {
        width: "col-3",
        label: "Category",
        sort: {
          attributes: [
            { name: "Category", path: "category.name", direction: "desc" }
          ]
        }
      },
      {
        width: "col-3",
        label: "Dernière modification",
        sort: {
          attributes: [
            {
              name: "Dernière modification",
              path: "createdAt",
              direction: "desc"
            }
          ]
        }
      }
    ],
    mobileHeader: [
      {
        width: "col-4",
        label: "Name",
        sort: {
          attributes: [{ name: "Name", path: "title", direction: "desc" }]
        }
      },
      {
        width: "col-4",
        label: "Type",
        sort: {
          attributes: [
            { name: "Type", path: "type.name", direction: "desc" },
            { name: "Category", path: "category.name", direction: "desc" }
          ]
        }
      },
      {
        width: "col-4",
        label: "modifier",
        sort: {
          attributes: [
            {
              name: "modifier",
              path: "createdAt",
              direction: "desc"
            }
          ]
        }
      }
    ],
    cols: [
      {
        width: "col-3",
        data: [
          {
            line: [
              {
                type: "text",
                path: "title"
              }
            ],
            align: true
          }
        ]
      },
      {
        width: "col-3",
        data: [
          {
            line: [
              {
                type: "text",
                path: "type.name"
              }
            ],
            align: true
          }
        ]
      },
      {
        width: "col-3",
        data: [
          {
            line: [
              {
                type: "text",
                path: "category.name"
              }
            ],
            align: true
          }
        ]
      },
      {
        width: "col-3",
        data: [
          {
            line: [
              {
                type: "date",
                path: "createdAt"
              }
            ],
            align: true
          }
        ]
      }
    ],
    mobileCols: [
      {
        width: "col-4",
        data: [
          {
            line: [
              {
                type: "text",
                path: "title"
              }
            ],
            align: true
          }
        ]
      },
      {
        width: "col-4",
        data: [
          {
            line: [
              {
                type: "text",
                path: "type.name"
              }
            ],
            align: true
          },
          {
            line: [
              {
                type: "text",
                path: "category.name"
              }
            ],
            align: true
          }
        ]
      },
      {
        width: "col-4",
        data: [
          {
            line: [
              {
                type: "date",
                path: "createdAt"
              }
            ],
            align: true
          }
        ]
      }
    ],
    desktopActions: [
      {
        type: "materialicon",
        icon: "remove_red_eye",
        calback: "view"
      },
      {
        type: "materialicon",
        icon: "edit",
        calback: "edit"
      },
      {
        type: "dropdown",
        dropdownConfig: {
          toggle: {
            type: "materialicon",
            icon: "more_vert"
          },
          items: [
            {
              data: [
                {
                  type: "icon",
                  icon: "ti ti-trash"
                },
                {
                  type: "text",
                  label: "Delete"
                }
              ],
              calback: "delete"
            }
          ]
        }
      }
    ],
    mobileActions: [
      {
        type: "dropdown",
        dropdownConfig: {
          toggle: {
            type: "materialicon",
            icon: "more_vert"
          },
          items: [
            {
              data: [
                {
                  type: "icon",
                  icon: "ti ti-trash"
                },
                {
                  type: "text",
                  label: "Delete"
                }
              ],
              calback: "delete"
            }
          ]
        }
      }
    ]
  };

  pagination: Pagination = { page: 1, perPage: 10 };
  filtersConf = { filters: [], andOperator: true };

  selectedData: any[] = [];
  allSelected: any = { type: "event", checked: false };
  alive = true;
  isGridView = false;

  constructor(private store: Store<fromStore.DocumentsState>, private modalService: NgbModal) {}

  ngOnInit() {
    this.store
      .select<any>(fromStore.getPaginatedSortedFiltredDocuments)
      .pipe(
        delay(50),
        takeWhile(() => this.alive)
      )
      .subscribe(documents => {
        this.documents = documents;
      });
  }

  ngAfterViewInit() {
    this.store.dispatch(
      new fromStore.LoadDocuments(
        this.filtersConf,
        [{ field: "createdAt", direction: "desc" }],
        {
          page: 1,
          perPage: 10
        }
      )
    );
  }

  ngOnDestroy() {
    this.alive = false;
  }

  handleSelectRowChanged(event) {
    if (event.checked) {
      this.selectedData.push(event.row);
    } else {
      this.selectedData = this.selectedData.filter(item => {
        return item.id !== event.row.id;
      });
    }
    this.allSelected = {
      type: "change",
      checked: this.selectedData.length === this.documents.length
    };
  }

  handleSelectAllChanged($event) {
    this.allSelected = { type: "event", checked: this.allSelected.checked };
    if (this.allSelected.checked) {
      this.selectedData = this.documents;
    } else {
      this.selectedData = [];
    }
  }

  handleRowActionClicked(event: { action: string; row: any }) {
    this[event.action](event.row);
  }

  create() {
    const modalRef = this.modalService.open(CreateComponent);
  }

  edit(document: Document) {
    const modalRef = this.modalService.open(CreateComponent);
    modalRef.componentInstance.document = document;
    modalRef.componentInstance.edit = true;
  }

  view(document: Document) {
    window.open(document.link, '_blank');
  }

  delete(document = null) {
    const modalRef = this.modalService.open(DeleteComponent);
    modalRef.componentInstance.documents = document ? [document] : this.selectedData;
    modalRef.result.then(result => {}).catch(reason => {
      this.selectedData = [];
      this.allSelected = {
        type: 'event',
        checked: false
      };
    });
  }

}
