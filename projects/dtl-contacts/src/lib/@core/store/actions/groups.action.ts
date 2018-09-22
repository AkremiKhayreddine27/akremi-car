import { Action } from '@ngrx/store';

import { Group } from '../../models';
import { Pagination, FilterConf, SortConf } from '../helpers';

export const GENERATE_GROUPS_DATA = '[Groups] Generate Groups data';
export const GENERATE_GROUPS_DATA_SUCCESS =
  '[Groups] Generate Groups data Success';
export const GENERATE_GROUPS_DATA_FAIL = '[Groups] Generate Groups data Fail';
export const LOAD_GROUPS = '[Groups] Load Groups';
export const LOAD_GROUPS_FAIL = '[Groups] Load Groups Fail';
export const LOAD_GROUPS_SUCCESS = '[Groups] Load Groups Success';
export const SELECT_GROUP = '[Groups] Select Group';
export const LOAD_SELECTED_GROUP = '[Groups] Load Selected Group';
export const LOAD_SELECTED_GROUP_FAIL = '[Groups] Load Selected Group Fail';
export const LOAD_SELECTED_GROUP_SUCCESS =
  '[Groups] Load Selected Group Success';
export const CREATE_GROUP = '[Groups] Create Group';
export const CREATE_GROUP_SUCCESS = '[Groups] Create Group Success';
export const CREATE_GROUP_FAIL = '[Groups] Create Group Fail';
export const UPDATE_GROUP = '[Groups] Update Group';
export const UPDATE_GROUP_SUCCESS = '[Groups] Update Group Success';
export const UPDATE_GROUP_FAIL = '[Groups] Update Group Fail';
export const DELETE_GROUP = '[Groups] Delete Group';
export const DELETE_GROUP_SUCCESS = '[Groups] Delete Group Success';
export const DELETE_GROUP_FAIL = '[Groups] Delete Group Fail';

export class GenerateGroupsData implements Action {
  readonly type = GENERATE_GROUPS_DATA;
}

export class GenerateGroupsDataSuccess implements Action {
  readonly type = GENERATE_GROUPS_DATA_SUCCESS;
}

export class GenerateGroupsDataFail implements Action {
  readonly type = GENERATE_GROUPS_DATA_FAIL;
}

export class LoadGroups implements Action {
  readonly type = LOAD_GROUPS;
  constructor(
    public filters: FilterConf = null,
    public sort: SortConf[] = null,
    public pagination: Pagination = null
  ) {}
}

export class LoadGroupsFail implements Action {
  readonly type = LOAD_GROUPS_FAIL;
  constructor(public payload: any) {}
}

export class LoadGroupsSuccess implements Action {
  readonly type = LOAD_GROUPS_SUCCESS;
  constructor(public payload: Group[]) {}
}

export class SelectGroup implements Action {
  readonly type = SELECT_GROUP;
  constructor(public payload: number) {}
}

export class LoadSelectedGroup implements Action {
  readonly type = LOAD_SELECTED_GROUP;
}

export class LoadSelectedGroupFail implements Action {
  readonly type = LOAD_SELECTED_GROUP_FAIL;
  constructor(public payload: any) {}
}

export class LoadSelectedGroupSuccess implements Action {
  readonly type = LOAD_SELECTED_GROUP_SUCCESS;
  constructor(public payload: Group) {}
}

export class CreateGroup implements Action {
  readonly type = CREATE_GROUP;
  constructor(public payload: Group) {}
}

export class CreateGroupSuccess implements Action {
  readonly type = CREATE_GROUP_SUCCESS;
  constructor(public payload: Group) {}
}

export class CreateGroupFail implements Action {
  readonly type = CREATE_GROUP_FAIL;
  constructor(public payload: any) {}
}

export class UpdateGroup implements Action {
  readonly type = UPDATE_GROUP;
  constructor(public id: number, public changes: Partial<Group>) {}
}

export class UpdateGroupSuccess implements Action {
  readonly type = UPDATE_GROUP_SUCCESS;
  constructor(public id: number, public changes: Partial<Group>) {}
}

export class UpdateGroupFail implements Action {
  readonly type = UPDATE_GROUP_FAIL;
  constructor(public payload: any) {}
}

export class DeleteGroup implements Action {
  readonly type = DELETE_GROUP;
  constructor(public id: number) {}
}

export class DeleteGroupSuccess implements Action {
  readonly type = DELETE_GROUP_SUCCESS;
  constructor(public id: number) {}
}

export class DeleteGroupFail implements Action {
  readonly type = DELETE_GROUP_FAIL;
  constructor(public payload: any) {}
}

export type GroupsAction =
  | GenerateGroupsData
  | GenerateGroupsDataSuccess
  | GenerateGroupsDataFail
  | LoadGroups
  | LoadGroupsFail
  | LoadGroupsSuccess
  | SelectGroup
  | LoadSelectedGroup
  | LoadSelectedGroupFail
  | LoadSelectedGroupSuccess
  | CreateGroup
  | CreateGroupSuccess
  | CreateGroupFail
  | UpdateGroup
  | UpdateGroupSuccess
  | UpdateGroupFail
  | DeleteGroup
  | DeleteGroupSuccess
  | DeleteGroupFail;
