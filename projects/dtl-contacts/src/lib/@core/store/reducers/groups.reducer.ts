import { Group } from "../../models";
import * as fromGroupsActions from "../actions/groups.action";
import { Pagination, FilterConf, SortConf } from "../helpers";
import {
  EntityState,
  EntityAdapter,
  Dictionary,
  createEntityAdapter
} from "@ngrx/entity";

export interface GroupsState extends EntityState<Group> {
  selectedGroup: Group;
  loaded: boolean;
  loading: boolean;
  pagination: Pagination;
  filters: FilterConf;
  sort: SortConf[];
  error: any;
}

export const adapter: EntityAdapter<Group> = createEntityAdapter<Group>({
  sortComparer: (a, b) => {
    return a["createdAt"] - b["createdAt"];
  },
  selectId: (group: Group) => group.value
});

export const initialState: GroupsState = adapter.getInitialState({
  selectedGroup: null,
  loaded: false,
  loading: false,
  pagination: { page: 1, perPage: 10 },
  filters: { filters: [], andOperator: false },
  sort: [],
  error: {}
});

export function groupsReducer(
  state: GroupsState = initialState,
  action: fromGroupsActions.GroupsAction
): GroupsState {
  switch (action.type) {
    case fromGroupsActions.LOAD_GROUPS: {
      return {
        ...state,
        loaded: false,
        loading: true,
        filters: action.filters,
        pagination: action.pagination,
        sort: action.sort
      };
    }
    case fromGroupsActions.LOAD_GROUPS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.payload
      };
    }
    case fromGroupsActions.LOAD_GROUPS_SUCCESS: {
      return adapter.addAll(action.payload, {
        ...state,
        loaded: true,
        loading: false,
        error: null
      });
    }
    case fromGroupsActions.SELECT_GROUP: {
      return {
        ...state
      };
    }
    case fromGroupsActions.LOAD_SELECTED_GROUP: {
      return {
        ...state
      };
    }
    case fromGroupsActions.LOAD_SELECTED_GROUP_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case fromGroupsActions.LOAD_SELECTED_GROUP_SUCCESS: {
      return {
        ...state,
        selectedGroup: action.payload,
        error: null
      };
    }
    case fromGroupsActions.CREATE_GROUP: {
      return {
        ...state
      };
    }
    case fromGroupsActions.CREATE_GROUP_SUCCESS: {
      return adapter.addOne(action.payload, { ...state });
    }
    case fromGroupsActions.CREATE_GROUP_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case fromGroupsActions.UPDATE_GROUP: {
      return {
        ...state
      };
    }
    case fromGroupsActions.UPDATE_GROUP_SUCCESS: {
      return adapter.updateOne(
        {
          id: action.id,
          changes: action.changes
        },
        { ...state }
      );
    }
    case fromGroupsActions.UPDATE_GROUP_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case fromGroupsActions.DELETE_GROUP: {
      return {
        ...state
      };
    }
    case fromGroupsActions.DELETE_GROUP_SUCCESS: {
      return adapter.removeOne(action.id, { ...state });
    }
    case fromGroupsActions.DELETE_GROUP_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
  }
  return state;
}

export const getGroupsEntities = (state: GroupsState) => state.entities;
export const getSelectedGroup = (state: GroupsState) => state.selectedGroup;
export const getGroupsLoading = (state: GroupsState) => state.loading;
export const getGroupsLoaded = (state: GroupsState) => state.loaded;
export const getGroupsPagination = (state: GroupsState) => state.pagination;
export const getGroupsFilters = (state: GroupsState) => state.filters;
export const getGroupsError = (state: GroupsState) => state.error;
