import { createSelector, MemoizedSelector } from "@ngrx/store";
import * as fromFeature from "../reducers";
import * as fromContacts from "../reducers/contacts.reducer";
import { User } from "../../models";
import { Pagination, FilterConf, sort, filter, paginate } from "../helpers";
import { Dictionary } from "@ngrx/entity";

export const getContactsState = createSelector(
  fromFeature.getContactsAppState,
  (state: fromFeature.ContactsAppState) => state.contacts
);

export const getContactsEntities = createSelector(
  getContactsState,
  fromContacts.getContactsEntities
);

export const getContactsCount = createSelector(getContactsState, state => {
  return filter(
    state.filters,
    Object.keys(state.entities).map(id => state.entities[id])
  ).length;
});

export const getPaginatedSortedFiltredContacts = createSelector(
  getContactsState,
  state => {
    // tslint:disable-next-line:max-line-length
    return paginate(
      state.pagination,
      sort(
        state.sort,
        filter(
          state.filters,
          Object.keys(state.entities).map(id => state.entities[id])
        )
      )
    );
  }
);

export const getAllContacts = createSelector(getContactsState, state => {
  return Object.keys(state.entities).map(id => state.entities[id]);
});

export const getSelectedContact = createSelector(
  getContactsState,
  fromContacts.getSelectedContact
);

export const getContactsLoaded = createSelector(
  getContactsState,
  fromContacts.getContactsLoaded
);

export const getContactsLoading = createSelector(
  getContactsState,
  fromContacts.getContactsLoading
);

export const getContactsFilters = createSelector(
  getContactsState,
  fromContacts.getContactsFilters
);

export const getContactsSort = createSelector(
  getContactsState,
  fromContacts.getContactsSort
);

export const getContactsPagination = createSelector(
  getContactsState,
  fromContacts.getContactsPagination
);

export const getContactsError = createSelector(
  getContactsState,
  fromContacts.getContactsError
);
