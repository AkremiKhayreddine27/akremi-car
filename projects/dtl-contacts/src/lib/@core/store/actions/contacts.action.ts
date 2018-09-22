import { Action } from "@ngrx/store";

import { User, Group } from "../../models";
import { Pagination, FilterConf, SortConf } from "../helpers";

export const GENERATE_CONTACTS_DATA = "[Contacts] Generate Contacts data";
export const GENERATE_CONTACTS_DATA_SUCCESS =
  "[Contacts] Generate Contacts data Success";
export const GENERATE_CONTACTS_DATA_FAIL =
  "[Contacts] Generate Contacts data Fail";
export const LOAD_CONTACTS = "[Contacts] Load Contacts";
export const LOAD_CONTACTS_FAIL = "[Contacts] Load Contacts Fail";
export const LOAD_CONTACTS_SUCCESS = "[Contacts] Load Contacts Success";
export const SELECT_CONTACT = "[Contacts] Select Contact";
export const LOAD_SELECTED_CONTACT = "[Contacts] Load Selected Contact";
export const LOAD_SELECTED_CONTACT_FAIL =
  "[Contacts] Load Selected Contact Fail";
export const LOAD_SELECTED_CONTACT_SUCCESS =
  "[Contacts] Load Selected Contact Success";

export const CREATE_CONTACT = "[Contacts] Create Contact";
export const CREATE_CONTACT_SUCCESS = "[Contacts] Create Contact Success";
export const CREATE_CONTACT_FAIL = "[Contacts] Create Contact Fail";
export const UPDATE_CONTACT = "[Contacts] Update Contact";
export const UPDATE_CONTACT_SUCCESS = "[Contacts] Update Contact Success";
export const UPDATE_CONTACT_FAIL = "[Contacts] Update Contact Fail";
export const DELETE_CONTACT = "[Contacts] Delete Contact";
export const DELETE_CONTACT_SUCCESS = "[Contacts] Delete Contact Success";
export const DELETE_CONTACT_FAIL = "[Contacts] Delete Contact Fail";
export const DELETE_CONTACTS = "[Contacts] Delete Contacts";
export const DELETE_CONTACTS_SUCCESS = "[Contacts] Delete Contacts Success";
export const DELETE_CONTACTS_FAIL = "[Contacts] Delete Contacts Fail";
export const ASSIGN_CONTACT_TO_GROUP = "[Contacts] Assign Contact to Group";
export const ASSIGN_CONTACT_TO_GROUP_SUCCESS =
  "[Contacts] Assign Contact to Group Success";
export const ASSIGN_CONTACT_TO_GROUP_FAIL =
  "[Contacts] Assign Contact to Group Fail";

export class GenerateContactsData implements Action {
  readonly type = GENERATE_CONTACTS_DATA;
}

export class GenerateContactsDataSuccess implements Action {
  readonly type = GENERATE_CONTACTS_DATA_SUCCESS;
}

export class GenerateContactsDataFail implements Action {
  readonly type = GENERATE_CONTACTS_DATA_FAIL;
}

export class LoadContacts implements Action {
  readonly type = LOAD_CONTACTS;
  constructor(
    public filters: FilterConf = null,
    public sort: SortConf[] = null,
    public pagination: Pagination = null
  ) {}
}

export class LoadContactsFail implements Action {
  readonly type = LOAD_CONTACTS_FAIL;
  constructor(public payload: any) {}
}

export class LoadContactsSuccess implements Action {
  readonly type = LOAD_CONTACTS_SUCCESS;
  constructor(public payload: User[]) {}
}

export class SelectContact implements Action {
  readonly type = SELECT_CONTACT;
  constructor(public payload: number) {}
}

export class LoadSelectedContact implements Action {
  readonly type = LOAD_SELECTED_CONTACT;
}

export class LoadSelectedContactFail implements Action {
  readonly type = LOAD_SELECTED_CONTACT_FAIL;
  constructor(public payload: any) {}
}

export class LoadSelectedContactSuccess implements Action {
  readonly type = LOAD_SELECTED_CONTACT_SUCCESS;
  constructor(public payload: User) {}
}

export class CreateContact implements Action {
  readonly type = CREATE_CONTACT;
  constructor(public payload: User) {}
}

export class CreateContactSuccess implements Action {
  readonly type = CREATE_CONTACT_SUCCESS;
  constructor(public payload: User) {}
}

export class CreateContactFail implements Action {
  readonly type = CREATE_CONTACT_FAIL;
  constructor(public payload: any) {}
}

export class UpdateContact implements Action {
  readonly type = UPDATE_CONTACT;
  constructor(public id: number, public changes: Partial<User>) {}
}

export class UpdateContactSuccess implements Action {
  readonly type = UPDATE_CONTACT_SUCCESS;
  constructor(public id: number, public changes: Partial<User>) {}
}

export class UpdateContactFail implements Action {
  readonly type = UPDATE_CONTACT_FAIL;
  constructor(public payload: any) {}
}

export class DeleteContact implements Action {
  readonly type = DELETE_CONTACT;
  constructor(public id: number) {}
}

export class DeleteContactSuccess implements Action {
  readonly type = DELETE_CONTACT_SUCCESS;
  constructor(public id: number) {}
}

export class DeleteContactFail implements Action {
  readonly type = DELETE_CONTACT_FAIL;
  constructor(public payload: any) {}
}

export class DeleteContacts implements Action {
  readonly type = DELETE_CONTACTS;
  constructor(public ids: number[]) {}
}

export class DeleteContactsSuccess implements Action {
  readonly type = DELETE_CONTACTS_SUCCESS;
  constructor(public ids: number[]) {}
}

export class DeleteContactsFail implements Action {
  readonly type = DELETE_CONTACTS_FAIL;
  constructor(public payload: any) {}
}

export class AssignContactToGroup implements Action {
  readonly type = ASSIGN_CONTACT_TO_GROUP;
  constructor(public contact: User, public group: Partial<User>) {}
}

export class AssignContactToGroupSuccess implements Action {
  readonly type = ASSIGN_CONTACT_TO_GROUP_SUCCESS;
  constructor(public contact: User, public group: Partial<User>) {}
}

export class AssignContactToGroupFail implements Action {
  readonly type = ASSIGN_CONTACT_TO_GROUP_FAIL;
  constructor(public payload: any) {}
}

export type ContactsAction =
  | GenerateContactsData
  | GenerateContactsDataSuccess
  | GenerateContactsDataFail
  | LoadContacts
  | LoadContactsFail
  | LoadContactsSuccess
  | SelectContact
  | LoadSelectedContact
  | LoadSelectedContactFail
  | LoadSelectedContactSuccess
  | CreateContact
  | CreateContactSuccess
  | CreateContactFail
  | UpdateContact
  | UpdateContactSuccess
  | UpdateContactFail
  | DeleteContact
  | DeleteContactSuccess
  | DeleteContactFail
  | DeleteContacts
  | DeleteContactsSuccess
  | DeleteContactsFail
  | AssignContactToGroup
  | AssignContactToGroupSuccess
  | AssignContactToGroupFail;
