import { Category } from '../../models';
import * as fromCategoriesActions from '../actions/categories.action';
import { Pagination, FilterConf, SortConf } from '../helpers';
import {
  EntityState,
  EntityAdapter,
  Dictionary,
  createEntityAdapter
} from '@ngrx/entity';

export interface CategoriesState extends EntityState<Category> {
  selectedCategory: Category;
  loaded: boolean;
  loading: boolean;
  pagination: Pagination;
  filters: FilterConf;
  sort: SortConf[];
  error: any;
}

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>({
  sortComparer: (a, b) => {
    return a['createdAt'] - b['createdAt'];
  }
});

export const initialState: CategoriesState = adapter.getInitialState({
  selectedCategory: null,
  loaded: false,
  loading: false,
  pagination: { page: 1, perPage: 10 },
  filters: { filters: [], andOperator: false },
  sort: [],
  error: {}
});

export function categoriesReducer(
  state: CategoriesState = initialState,
  action: fromCategoriesActions.CategoriesAction
): CategoriesState {
  switch (action.type) {
    case fromCategoriesActions.LOAD_CATEGORIES: {
      return {
        ...state,
        loaded: false,
        loading: true,
        filters: action.filters,
        pagination: action.pagination,
        sort: action.sort
      };
    }
    case fromCategoriesActions.LOAD_CATEGORIES_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.payload
      };
    }
    case fromCategoriesActions.LOAD_CATEGORIES_SUCCESS: {
      return adapter.addAll(action.payload, {
        ...state,
        loaded: true,
        loading: false,
        error: null
      });
    }
    case fromCategoriesActions.SELECT_CATEGORY: {
      return {
        ...state
      };
    }
    case fromCategoriesActions.LOAD_SELECTED_CATEGORY: {
      return {
        ...state
      };
    }
    case fromCategoriesActions.LOAD_SELECTED_CATEGORY_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case fromCategoriesActions.LOAD_SELECTED_CATEGORY_SUCCESS: {
      return {
        ...state,
        selectedCategory: action.payload,
        error: null
      };
    }
    case fromCategoriesActions.CREATE_CATEGORY: {
      return {
        ...state
      };
    }
    case fromCategoriesActions.CREATE_CATEGORY_SUCCESS: {
      return adapter.addOne(action.payload, { ...state });
    }
    case fromCategoriesActions.CREATE_CATEGORY_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case fromCategoriesActions.UPDATE_CATEGORY: {
      return {
        ...state
      };
    }
    case fromCategoriesActions.UPDATE_CATEGORY_SUCCESS: {
      return adapter.updateOne(
        {
          id: action.id,
          changes: action.changes
        },
        { ...state }
      );
    }
    case fromCategoriesActions.UPDATE_CATEGORY_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case fromCategoriesActions.DELETE_CATEGORY: {
      return {
        ...state
      };
    }
    case fromCategoriesActions.DELETE_CATEGORY_SUCCESS: {
      return adapter.removeOne(action.id, { ...state });
    }
    case fromCategoriesActions.DELETE_CATEGORY_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case fromCategoriesActions.DELETE_CATEGORIES: {
      return {
        ...state
      };
    }
    case fromCategoriesActions.DELETE_CATEGORIES_SUCCESS: {
      return adapter.removeMany(action.ids, { ...state });
    }
    case fromCategoriesActions.DELETE_CATEGORIES_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
  }
  return state;
}

export const getCategoriesEntities = (state: CategoriesState) => state.entities;
export const getSelectedCategory = (state: CategoriesState) =>
  state.selectedCategory;
export const getCategoriesLoading = (state: CategoriesState) => state.loading;
export const getCategoriesLoaded = (state: CategoriesState) => state.loaded;
export const getCategoriesPagination = (state: CategoriesState) =>
  state.pagination;
export const getCategoriesFilters = (state: CategoriesState) => state.filters;
export const getCategoriesError = (state: CategoriesState) => state.error;
