import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector
} from "@ngrx/store";
import * as fromQueue from "./queue.reducer";
import * as fromContacts from "./contacts.reducer";
import * as fromGroups from "./groups.reducer";

export interface ContactsAppState {
  groups: fromGroups.GroupsState;
  contacts: fromContacts.ContactsState;
  queue: fromQueue.QueueState;
}

export const reducers: ActionReducerMap<ContactsAppState> = {
  groups: fromGroups.groupsReducer,
  contacts: fromContacts.contactsReducer,
  queue: fromQueue.queueReducer
};

export const getContactsAppState = createFeatureSelector<ContactsAppState>(
  "dtl-contacts"
);
