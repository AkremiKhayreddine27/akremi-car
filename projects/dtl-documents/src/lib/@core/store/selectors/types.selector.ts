import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromTypes from '../reducers/types.reducer';
import { DocumentType } from '../../models';
import { Pagination, FilterConf, sort, filter, paginate } from '../helpers';
import { Dictionary } from '@ngrx/entity';

export const getTypesState = createSelector(
    fromFeature.getAppDocumentsState,
    (state: fromFeature.DocumentsState) => state.types
);

export const getTypesEntities = createSelector(
    getTypesState,
    fromTypes.getTypesEntities
);

export const getTypesCount = createSelector(
    getTypesState,
    (state) => {
        return filter(state.filters, Object.keys(state.entities).map(id => state.entities[id])).length;
    }
);

export const getPaginatedSortedFiltredTypes = createSelector(
    getTypesState,
    (state) => {
        // tslint:disable-next-line:max-line-length
        return paginate(state.pagination, sort(state.sort, filter(state.filters, Object.keys(state.entities).map(id => state.entities[id]))));
    }
);

export const getAllTypes = createSelector(
    getTypesState,
    (state) => {
        return Object.keys(state.entities).map(id => state.entities[id]);
    }
);

export const getSelectedType = createSelector(
    getTypesState,
    fromTypes.getSelectedType
);

export const getTypesLoaded = createSelector(
    getTypesState,
    fromTypes.getTypesLoaded
);

export const getTypesLoading = createSelector(
    getTypesState,
    fromTypes.getTypesLoading
);

export const getTypesFilters = createSelector(
    getTypesState,
    fromTypes.getTypesFilters
);

export const getTypesPagination = createSelector(
    getTypesState,
    fromTypes.getTypesPagination
);

export const getTypesError = createSelector(
    getTypesState,
    fromTypes.getTypesError
);
