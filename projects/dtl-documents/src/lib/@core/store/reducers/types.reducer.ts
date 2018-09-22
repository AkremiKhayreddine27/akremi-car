import { DocumentType } from '../../models';
import * as fromTypesActions from '../actions/types.action';
import { Pagination, FilterConf, SortConf } from '../helpers';
import {
  EntityState,
  EntityAdapter,
  Dictionary,
  createEntityAdapter
} from '@ngrx/entity';

export interface TypesState extends EntityState<DocumentType> {
  selectedType: DocumentType;
  loaded: boolean;
  loading: boolean;
  pagination: Pagination;
  filters: FilterConf;
  sort: SortConf[];
  error: any;
}

export const adapter: EntityAdapter<DocumentType> = createEntityAdapter<DocumentType>({
  sortComparer: (a, b) => {
    return a['createdAt'] - b['createdAt'];
  }
});

export const initialState: TypesState = adapter.getInitialState({
  selectedType: null,
  loaded: false,
  loading: false,
  pagination: { page: 1, perPage: 10 },
  filters: { filters: [], andOperator: false },
  sort: [],
  error: {}
});

export function typesReducer(
  state: TypesState = initialState,
  action: fromTypesActions.TypesAction
): TypesState {
  switch (action.type) {
    case fromTypesActions.LOAD_TYPES: {
      return {
        ...state,
        loaded: false,
        loading: true,
        filters: action.filters,
        pagination: action.pagination,
        sort: action.sort
      };
    }
    case fromTypesActions.LOAD_TYPES_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.payload
      };
    }
    case fromTypesActions.LOAD_TYPES_SUCCESS: {
      return adapter.addAll(action.payload, {
        ...state,
        loaded: true,
        loading: false,
        error: null
      });
    }
    case fromTypesActions.SELECT_TYPE: {
      return {
        ...state
      };
    }
    case fromTypesActions.LOAD_SELECTED_TYPE: {
      return {
        ...state
      };
    }
    case fromTypesActions.LOAD_SELECTED_TYPE_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case fromTypesActions.LOAD_SELECTED_TYPE_SUCCESS: {
      return {
        ...state,
        selectedType: action.payload,
        error: null
      };
    }
    case fromTypesActions.CREATE_TYPE: {
      return {
        ...state
      };
    }
    case fromTypesActions.CREATE_TYPE_SUCCESS: {
      return adapter.addOne(action.payload, { ...state });
    }
    case fromTypesActions.CREATE_TYPE_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case fromTypesActions.UPDATE_TYPE: {
      return {
        ...state
      };
    }
    case fromTypesActions.UPDATE_TYPE_SUCCESS: {
      return adapter.updateOne(
        {
          id: action.id,
          changes: action.changes
        },
        { ...state }
      );
    }
    case fromTypesActions.UPDATE_TYPE_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case fromTypesActions.DELETE_TYPE: {
      return {
        ...state
      };
    }
    case fromTypesActions.DELETE_TYPE_SUCCESS: {
      return adapter.removeOne(action.id, { ...state });
    }
    case fromTypesActions.DELETE_TYPE_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case fromTypesActions.DELETE_TYPES: {
      return {
        ...state
      };
    }
    case fromTypesActions.DELETE_TYPES_SUCCESS: {
      return adapter.removeMany(action.ids, { ...state });
    }
    case fromTypesActions.DELETE_TYPES_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
  }
  return state;
}

export const getTypesEntities = (state: TypesState) => state.entities;
export const getSelectedType = (state: TypesState) =>
  state.selectedType;
export const getTypesLoading = (state: TypesState) => state.loading;
export const getTypesLoaded = (state: TypesState) => state.loaded;
export const getTypesPagination = (state: TypesState) =>
  state.pagination;
export const getTypesFilters = (state: TypesState) => state.filters;
export const getTypesError = (state: TypesState) => state.error;
