import { User } from "../../models";
import * as fromContactsActions from "../actions/contacts.action";
import { Pagination, FilterConf, SortConf } from "../helpers";
import {
  EntityState,
  EntityAdapter,
  Dictionary,
  createEntityAdapter
} from "@ngrx/entity";

export interface ContactsState extends EntityState<User> {
  selectedContact: User;
  loaded: boolean;
  loading: boolean;
  pagination: Pagination;
  filters: FilterConf;
  sort: SortConf[];
  error: any;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  sortComparer: (a, b) => {
    return a["createdAt"] - b["createdAt"];
  }
});

export const initialState: ContactsState = adapter.getInitialState({
  selectedContact: null,
  loaded: false,
  loading: false,
  pagination: { page: 1, perPage: 10 },
  filters: { filters: [], andOperator: false },
  sort: [],
  error: {}
});

export function contactsReducer(
  state: ContactsState = initialState,
  action: fromContactsActions.ContactsAction
): ContactsState {
  switch (action.type) {
    case fromContactsActions.LOAD_CONTACTS: {
      return {
        ...state,
        loaded: false,
        loading: true,
        filters: action.filters,
        pagination: action.pagination,
        sort: action.sort
      };
    }
    case fromContactsActions.LOAD_CONTACTS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.payload
      };
    }
    case fromContactsActions.LOAD_CONTACTS_SUCCESS: {
      return adapter.addAll(action.payload, {
        ...state,
        loaded: true,
        loading: false,
        error: null
      });
    }
    case fromContactsActions.SELECT_CONTACT: {
      return {
        ...state
      };
    }
    case fromContactsActions.LOAD_SELECTED_CONTACT: {
      return {
        ...state
      };
    }
    case fromContactsActions.LOAD_SELECTED_CONTACT_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case fromContactsActions.LOAD_SELECTED_CONTACT_SUCCESS: {
      return {
        ...state,
        selectedContact: action.payload,
        error: null
      };
    }
    case fromContactsActions.CREATE_CONTACT: {
      return {
        ...state
      };
    }
    case fromContactsActions.CREATE_CONTACT_SUCCESS: {
      return adapter.addOne(action.payload, { ...state });
    }
    case fromContactsActions.CREATE_CONTACT_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case fromContactsActions.UPDATE_CONTACT: {
      return {
        ...state
      };
    }
    case fromContactsActions.UPDATE_CONTACT_SUCCESS: {
      return adapter.updateOne(
        {
          id: action.id,
          changes: action.changes
        },
        { ...state }
      );
    }
    case fromContactsActions.UPDATE_CONTACT_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case fromContactsActions.DELETE_CONTACT: {
      return {
        ...state
      };
    }
    case fromContactsActions.DELETE_CONTACT_SUCCESS: {
      return adapter.removeOne(action.id, { ...state });
    }
    case fromContactsActions.DELETE_CONTACT_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case fromContactsActions.DELETE_CONTACTS: {
      return {
        ...state
      };
    }
    case fromContactsActions.DELETE_CONTACTS_SUCCESS: {
      return adapter.removeMany(action.ids, { ...state });
    }
    case fromContactsActions.DELETE_CONTACTS_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case fromContactsActions.ASSIGN_CONTACT_TO_GROUP: {
      return {
        ...state
      };
    }
    case fromContactsActions.ASSIGN_CONTACT_TO_GROUP_SUCCESS: {
      return adapter.updateOne(
        {
          id: action.contact.id,
          changes: action.group
        },
        { ...state }
      );
    }
    case fromContactsActions.ASSIGN_CONTACT_TO_GROUP_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
  }
  return state;
}

export const getContactsEntities = (state: ContactsState) => state.entities;
export const getSelectedContact = (state: ContactsState) =>
  state.selectedContact;
export const getContactsLoading = (state: ContactsState) => state.loading;
export const getContactsLoaded = (state: ContactsState) => state.loaded;
export const getContactsPagination = (state: ContactsState) => state.pagination;
export const getContactsFilters = (state: ContactsState) => state.filters;
export const getContactsSort = (state: ContactsState) => state.sort;
export const getContactsError = (state: ContactsState) => state.error;
