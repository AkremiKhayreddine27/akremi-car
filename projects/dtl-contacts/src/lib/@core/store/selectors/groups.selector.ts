import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromGroups from '../reducers/groups.reducer';
import { Group } from '../../models';
import { Pagination, FilterConf, sort, filter, paginate } from '../helpers';
import { Dictionary } from '@ngrx/entity';


export const getGroupsState = createSelector(
    fromFeature.getContactsAppState,
    (state: fromFeature.ContactsAppState) => state.groups
);

export const getGroupsEntities = createSelector(
    getGroupsState,
    fromGroups.getGroupsEntities
);

export const getGroupsCount = createSelector(
    getGroupsState,
    (state) => {
        return filter(state.filters, Object.keys(state.entities).map(id => state.entities[id])).length;
    }
);

export const getPaginatedSortedFiltredGroups = createSelector(
    getGroupsState,
    (state) => {
        // tslint:disable-next-line:max-line-length
        return paginate(state.pagination, sort(state.sort, filter(state.filters, Object.keys(state.entities).map(id => state.entities[id]))));
    }
);

export const getAllGroups = createSelector(
    getGroupsState,
    (state) => {
        return Object.keys(state.entities).map(id => state.entities[id]);
    }
);

export const getSelectedGroup = createSelector(
    getGroupsState,
    fromGroups.getSelectedGroup
);

export const getGroupsLoaded = createSelector(
    getGroupsState,
    fromGroups.getGroupsLoaded
);

export const getGroupsLoading = createSelector(
    getGroupsState,
    fromGroups.getGroupsLoading
);

export const getGroupsFilters = createSelector(
    getGroupsState,
    fromGroups.getGroupsFilters
);

export const getGroupsPagination = createSelector(
    getGroupsState,
    fromGroups.getGroupsPagination
);

export const getGroupsError = createSelector(
    getGroupsState,
    fromGroups.getGroupsError
);
