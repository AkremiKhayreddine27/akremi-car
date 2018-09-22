import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromCategories from '../reducers/categories.reducer';
import { Category } from '../../models';
import { Pagination, FilterConf, sort, filter, paginate } from '../helpers';
import { Dictionary } from '@ngrx/entity';

export const getCategoriesState = createSelector(
    fromFeature.getAppDocumentsState,
    (state: fromFeature.DocumentsState) => state.categories
);

export const getCategoriesEntities = createSelector(
    getCategoriesState,
    fromCategories.getCategoriesEntities
);

export const getCategoriesCount = createSelector(
    getCategoriesState,
    (state) => {
        return filter(state.filters, Object.keys(state.entities).map(id => state.entities[id])).length;
    }
);

export const getPaginatedSortedFiltredCategories = createSelector(
    getCategoriesState,
    (state) => {
        // tslint:disable-next-line:max-line-length
        return paginate(state.pagination, sort(state.sort, filter(state.filters, Object.keys(state.entities).map(id => state.entities[id]))));
    }
);

export const getAllCategories = createSelector(
    getCategoriesState,
    (state) => {
        return Object.keys(state.entities).map(id => state.entities[id]);
    }
);

export const getSelectedCategory = createSelector(
    getCategoriesState,
    fromCategories.getSelectedCategory
);

export const getCategoriesLoaded = createSelector(
    getCategoriesState,
    fromCategories.getCategoriesLoaded
);

export const getCategoriesLoading = createSelector(
    getCategoriesState,
    fromCategories.getCategoriesLoading
);

export const getCategoriesFilters = createSelector(
    getCategoriesState,
    fromCategories.getCategoriesFilters
);

export const getCategoriesPagination = createSelector(
    getCategoriesState,
    fromCategories.getCategoriesPagination
);

export const getCategoriesError = createSelector(
    getCategoriesState,
    fromCategories.getCategoriesError
);
