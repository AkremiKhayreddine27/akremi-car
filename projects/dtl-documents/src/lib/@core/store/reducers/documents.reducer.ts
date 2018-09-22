import { Document } from '../../models';
import * as fromDocumentsActions from '../actions/documents.action';
import { Pagination, FilterConf, SortConf } from '../helpers';
import {
  EntityState,
  EntityAdapter,
  Dictionary,
  createEntityAdapter
} from '@ngrx/entity';

export interface DocumentsState extends EntityState<Document> {
  selectedDocument: Document;
  loaded: boolean;
  loading: boolean;
  pagination: Pagination;
  filters: FilterConf;
  sort: SortConf[];
  error: any;
}

export const adapter: EntityAdapter<Document> = createEntityAdapter<Document>({
  sortComparer: (a, b) => {
    return a['createdAt'] - b['createdAt'];
  }
});

export const initialState: DocumentsState = adapter.getInitialState({
  selectedDocument: null,
  loaded: false,
  loading: false,
  pagination: { page: 1, perPage: 10 },
  filters: { filters: [], andOperator: false },
  sort: [],
  error: {}
});

export function documentsReducer(
  state: DocumentsState = initialState,
  action: fromDocumentsActions.DocumentsAction
): DocumentsState {
  switch (action.type) {
    case fromDocumentsActions.LOAD_DOCUMENTS: {
      return {
        ...state,
        loaded: false,
        loading: true,
        filters: action.filters,
        pagination: action.pagination,
        sort: action.sort
      };
    }
    case fromDocumentsActions.LOAD_DOCUMENTS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.payload
      };
    }
    case fromDocumentsActions.LOAD_DOCUMENTS_SUCCESS: {
      return adapter.addAll(action.payload, {
        ...state,
        loaded: true,
        loading: false,
        error: null
      });
    }
    case fromDocumentsActions.SELECT_DOCUMENT: {
      return {
        ...state
      };
    }
    case fromDocumentsActions.LOAD_SELECTED_DOCUMENT: {
      return {
        ...state
      };
    }
    case fromDocumentsActions.LOAD_SELECTED_DOCUMENT_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case fromDocumentsActions.LOAD_SELECTED_DOCUMENT_SUCCESS: {
      return {
        ...state,
        selectedDocument: action.payload,
        error: null
      };
    }
    case fromDocumentsActions.CREATE_DOCUMENT: {
      return {
        ...state
      };
    }
    case fromDocumentsActions.CREATE_DOCUMENT_SUCCESS: {
      return adapter.addOne(action.payload, { ...state });
    }
    case fromDocumentsActions.CREATE_DOCUMENT_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case fromDocumentsActions.UPDATE_DOCUMENT: {
      return {
        ...state
      };
    }
    case fromDocumentsActions.UPDATE_DOCUMENT_SUCCESS: {
      return adapter.updateOne(
        {
          id: action.id,
          changes: action.changes
        },
        { ...state }
      );
    }
    case fromDocumentsActions.UPDATE_DOCUMENT_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case fromDocumentsActions.DELETE_DOCUMENT: {
      return {
        ...state
      };
    }
    case fromDocumentsActions.DELETE_DOCUMENT_SUCCESS: {
      return adapter.removeOne(action.id, { ...state });
    }
    case fromDocumentsActions.DELETE_DOCUMENT_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case fromDocumentsActions.DELETE_DOCUMENTS: {
      return {
        ...state
      };
    }
    case fromDocumentsActions.DELETE_DOCUMENTS_SUCCESS: {
      return adapter.removeMany(action.ids, { ...state });
    }
    case fromDocumentsActions.DELETE_DOCUMENTS_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
  }
  return state;
}

export const getDocumentsEntities = (state: DocumentsState) => state.entities;
export const getSelectedDocument = (state: DocumentsState) =>
  state.selectedDocument;
export const getDocumentsLoading = (state: DocumentsState) => state.loading;
export const getDocumentsLoaded = (state: DocumentsState) => state.loaded;
export const getDocumentsPagination = (state: DocumentsState) =>
  state.pagination;
export const getDocumentsFilters = (state: DocumentsState) => state.filters;
export const getDocumentsError = (state: DocumentsState) => state.error;
