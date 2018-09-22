import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector
} from '@ngrx/store';
import * as fromContacts from './contacts.reducer';
import * as fromGroups from './groups.reducer';

export interface LocatusState {
  groups: fromGroups.GroupsState;
  contacts: fromContacts.ContactsState;
}

export const reducers: ActionReducerMap<LocatusState> = {
  groups: fromGroups.groupsReducer,
  contacts: fromContacts.contactsReducer
};

export const getLocatusState = createFeatureSelector<LocatusState>('dtl-contacts');
