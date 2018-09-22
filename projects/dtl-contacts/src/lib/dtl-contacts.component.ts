import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { TableConfig } from "distinct-table";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { Store } from "@ngrx/store";
import * as fromStore from "./@core/store";
import { Pagination } from "./@core/store/helpers";
import { User, Group } from "./@core/models";
import { delay, takeWhile } from "rxjs/operators";
import { ShowComponent, DeleteComponent } from "./components";
import { Email } from "./@core/models/email";
import { PhoneNumber } from "./@core/models/phone";

@Component({
  selector: "dtl-contacts",
  templateUrl: "./dtl-contacts.component.html",
  styleUrls: ["./dtl-contacts.component.scss"]
})
export class DtlContactsComponent implements OnInit, AfterViewInit, OnDestroy {
  users: User[] = [];

  groups: Group[] = [];

  config: any;

  pagination: Pagination = { page: 1, perPage: 10 };
  filtersConf = { filters: [], andOperator: true };

  selectedData: any[] = [];
  allSelected: any = { type: "event", checked: false };
  alive = true;

  notification;

  hideMobileDropdownLabel = true;
  hideMobileDropdownMenu = true;
  btnLableClicked = false;
  btnMenuClicked = false;

  constructor(
    private store: Store<fromStore.LocatusState>,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.store
      .select(fromStore.getAllGroups)
      .pipe(
        delay(50),
        takeWhile(() => this.alive)
      )
      .subscribe(groups => {
        this.groups = groups;
        this.config = {
          displayHeader: true,
          bordred: false,
          showActionsType: "hover",
          alignDesktop: "center",
          alignMobile: "center",
          selectType: "image",
          imagePath: "photo",
          lettersPath: "name.familyName",
          header: [
            {
              width: "col-3",
              label: "Name",
              sort: {
                attributes: [
                  { name: "First name", path: "firstname", direction: "desc" },
                  { name: "Last name", path: "lastname", direction: "desc" }
                ]
              }
            },
            {
              width: "col-3",
              label: "E-mail",
              sort: {
                attributes: [
                  { name: "E-mail", path: "email", direction: "desc" }
                ]
              }
            },
            {
              width: "col-2",
              label: "Phone",
              sort: {
                attributes: [
                  { name: "Phone", path: "phone", direction: "desc" }
                ]
              }
            },
            {
              width: "col-4",
              label: "Group",
              sort: {
                attributes: [
                  { name: "Group", path: "groupId", direction: "desc" }
                ]
              }
            }
          ],
          mobileHeader: [
            {
              width: "col-12",
              label: "Contacts",
              sort: {
                attributes: [
                  { name: "First name", path: "firstname", direction: "desc" },
                  { name: "Last name", path: "lastname", direction: "desc" },
                  { name: "Phone", path: "phone", direction: "desc" },
                  { name: "E-mail", path: "email", direction: "desc" }
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
                      path: "name.familyName"
                    },
                    {
                      type: "text",
                      path: "name.givenName"
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
                      type: "materialicon",
                      icon: "email"
                    },
                    {
                      type: "email",
                      path: "emails",
                      getData: (emails: Email[]) => {
                        return emails.find((email: Email) => email.primary)
                          .value;
                      }
                    }
                  ],
                  align: true
                }
              ]
            },
            {
              width: "col-2",
              data: [
                {
                  line: [
                    {
                      type: "materialicon",
                      icon: "phone"
                    },
                    {
                      type: "phone",
                      path: "phoneNumbers",
                      getData: (phones: PhoneNumber[]) => {
                        return phones.find(
                          (phone: PhoneNumber) => phone.primary
                        ).value;
                      }
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
                      type: "array",
                      path: "groups",
                      getData: (group: Group) => group.display
                    }
                  ],
                  align: true
                }
              ]
            }
          ],
          mobileCols: [
            {
              width: "col-7",
              data: [
                {
                  line: [
                    {
                      type: "text",
                      path: "name.familyName"
                    },
                    {
                      type: "text",
                      path: "name.givenName"
                    }
                  ],
                  align: true
                }
              ]
            },
            {
              width: "col-5",
              data: [
                {
                  line: [
                    {
                      type: "array",
                      path: "groups",
                      getData: (group: Group) => group.display
                    }
                  ],
                  align: true
                }
              ]
            }
          ],
          desktopActions: [
            {
              type: "dropdown",
              dropdownConfig: {
                toggle: {
                  type: "materialicon",
                  icon: "label"
                },
                lists: [
                  {
                    title: "Groups",
                    items: [
                      ...this.groups.map(group => {
                        return {
                          data: [
                            {
                              type: "checkbox",
                              display: group.display,
                              id: group.value,
                              path: "groups",
                              pathId: "value"
                            }
                          ],
                          calback: "assignToGroup"
                        };
                      })
                    ]
                  },
                  {
                    title: "Roles",
                    items: [
                      ...this.groups.map(group => {
                        return {
                          data: [
                            {
                              type: "checkbox",
                              display: group.display,
                              id: group.value,
                              path: "groups",
                              pathId: "value"
                            }
                          ],
                          calback: "assignToGroup"
                        };
                      })
                    ]
                  }
                ]
              }
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
                lists: [
                  {
                    items: [
                      {
                        data: [
                          {
                            type: "materialicon",
                            icon: "delete"
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
                ]
              }
            }
          ],
          mobileActions: []
        };
      });
    this.store
      .select<any>(fromStore.getPaginatedSortedFiltredContacts)
      .pipe(
        delay(50),
        takeWhile(() => this.alive)
      )
      .subscribe(users => {
        this.users = users;
      });
  }

  ngAfterViewInit() {
    this.store.dispatch(
      new fromStore.LoadContacts(
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

  handleRowClicked(row) {
    const modalRef = this.modalService.open(ShowComponent);
    modalRef.componentInstance.contact = row;
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
      checked: this.selectedData.length === this.users.length
    };
  }

  handleSelectAllChanged($event) {
    this.allSelected = { type: "event", checked: this.allSelected.checked };
    if (this.allSelected.checked) {
      this.selectedData = this.users;
    } else {
      this.selectedData = [];
    }
  }

  handleRowActionClicked(event: { action: string; row: any; item: any }) {
    this[event.action](event.row, event.item);
  }

  handleDeleteSelectedItems(items) {
    console.log(items);
  }

  assignToGroup(data: User, item) {
    const partial: User = { ...data };
    const exist = partial.groups.find(group => {
      return group.value === item.data[0].id;
    });
    if (exist) {
      partial.groups = partial.groups.filter(group => {
        return group.value !== item.data[0].id;
      });
    } else {
      partial.groups.push({
        value: item.data[0].id,
        display: item.data[0].display
      });
    }
    this.store.dispatch(new fromStore.AssignContactToGroup(data, partial));
  }

  create() {
    const modalRef = this.modalService.open(ShowComponent);
    modalRef.componentInstance.edit = true;
  }

  edit(user) {
    const modalRef = this.modalService.open(ShowComponent);
    modalRef.componentInstance.contact = user;
    modalRef.componentInstance.edit = true;
  }

  delete(user = null) {
    const modalRef = this.modalService.open(DeleteComponent);
    modalRef.componentInstance.contacts = user ? [user] : this.selectedData;
    modalRef.result.then(result => {}).catch(reason => {
      this.notification = "Le contact a été supprimé";
      setTimeout(() => {
        this.notification = null;
      }, 5000);
      this.selectedData = [];
      this.allSelected = {
        type: "event",
        checked: false
      };
    });
  }

  hideLabels(event) {
    if (event && event["value"] === true) {
      if (!this.btnLableClicked) {
        this.hideMobileDropdownLabel = true;
      }
      this.btnLableClicked = false;
    }
  }

  hideMenu(event) {
    if (event && event["value"] === true) {
      if (!this.btnMenuClicked) {
        this.hideMobileDropdownMenu = true;
      }
      this.btnMenuClicked = false;
    }
  }
}
