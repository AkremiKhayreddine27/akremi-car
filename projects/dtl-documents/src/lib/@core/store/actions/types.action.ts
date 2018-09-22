import { Action } from '@ngrx/store';

import { DocumentType } from '../../models';
import { Pagination, FilterConf, SortConf } from '../helpers';

export const GENERATE_TYPES_DATA = '[Types] Generate Types data';
export const GENERATE_TYPES_DATA_SUCCESS =
  '[Types] Generate Types data Success';
export const GENERATE_TYPES_DATA_FAIL =
  '[Types] Generate Types data Fail';
export const LOAD_TYPES = '[Types] Load Types';
export const LOAD_TYPES_FAIL = '[Types] Load Types Fail';
export const LOAD_TYPES_SUCCESS = '[Types] Load Types Success';
export const SELECT_TYPE = '[Types] Select Type';
export const LOAD_SELECTED_TYPE = '[Types] Load Selected Type';
export const LOAD_SELECTED_TYPE_FAIL =
  '[Types] Load Selected Type Fail';
export const LOAD_SELECTED_TYPE_SUCCESS =
  '[Types] Load Selected Type Success';

export const CREATE_TYPE = '[Types] Create Type';
export const CREATE_TYPE_SUCCESS = '[Types] Create Type Success';
export const CREATE_TYPE_FAIL = '[Types] Create Type Fail';
export const UPDATE_TYPE = '[Types] Update Type';
export const UPDATE_TYPE_SUCCESS = '[Types] Update Type Success';
export const UPDATE_TYPE_FAIL = '[Types] Update Type Fail';
export const DELETE_TYPE = '[Types] Delete Type';
export const DELETE_TYPE_SUCCESS = '[Types] Delete Type Success';
export const DELETE_TYPE_FAIL = '[Types] Delete Type Fail';
export const DELETE_TYPES = '[Types] Delete Types';
export const DELETE_TYPES_SUCCESS = '[Types] Delete Types Success';
export const DELETE_TYPES_FAIL = '[Types] Delete Types Fail';

export class GenerateTypesData implements Action {
  readonly type = GENERATE_TYPES_DATA;
}

export class GenerateTypesDataSuccess implements Action {
  readonly type = GENERATE_TYPES_DATA_SUCCESS;
}

export class GenerateTypesDataFail implements Action {
  readonly type = GENERATE_TYPES_DATA_FAIL;
}

export class LoadTypes implements Action {
  readonly type = LOAD_TYPES;
  constructor(
    public filters: FilterConf = null,
    public sort: SortConf[] = null,
    public pagination: Pagination = null
  ) {}
}

export class LoadTypesFail implements Action {
  readonly type = LOAD_TYPES_FAIL;
  constructor(public payload: any) {}
}

export class LoadTypesSuccess implements Action {
  readonly type = LOAD_TYPES_SUCCESS;
  constructor(public payload: DocumentType[]) {}
}

export class SelectType implements Action {
  readonly type = SELECT_TYPE;
  constructor(public payload: number) {}
}

export class LoadSelectedType implements Action {
  readonly type = LOAD_SELECTED_TYPE;
}

export class LoadSelectedTypeFail implements Action {
  readonly type = LOAD_SELECTED_TYPE_FAIL;
  constructor(public payload: any) {}
}

export class LoadSelectedTypeSuccess implements Action {
  readonly type = LOAD_SELECTED_TYPE_SUCCESS;
  constructor(public payload: DocumentType) {}
}

export class CreateType implements Action {
  readonly type = CREATE_TYPE;
  constructor(public payload: DocumentType) {}
}

export class CreateTypeSuccess implements Action {
  readonly type = CREATE_TYPE_SUCCESS;
  constructor(public payload: DocumentType) {}
}

export class CreateTypeFail implements Action {
  readonly type = CREATE_TYPE_FAIL;
  constructor(public payload: any) {}
}

export class UpdateType implements Action {
  readonly type = UPDATE_TYPE;
  constructor(public id: number, public changes: Partial<DocumentType>) {}
}

export class UpdateTypeSuccess implements Action {
  readonly type = UPDATE_TYPE_SUCCESS;
  constructor(public id: number, public changes: Partial<DocumentType>) {}
}

export class UpdateTypeFail implements Action {
  readonly type = UPDATE_TYPE_FAIL;
  constructor(public payload: any) {}
}

export class DeleteType implements Action {
  readonly type = DELETE_TYPE;
  constructor(public id: number) {}
}

export class DeleteTypeSuccess implements Action {
  readonly type = DELETE_TYPE_SUCCESS;
  constructor(public id: number) {}
}

export class DeleteTypeFail implements Action {
  readonly type = DELETE_TYPE_FAIL;
  constructor(public payload: any) {}
}

export class DeleteTypes implements Action {
  readonly type = DELETE_TYPES;
  constructor(public ids: number[]) {}
}

export class DeleteTypesSuccess implements Action {
  readonly type = DELETE_TYPES_SUCCESS;
  constructor(public ids: number[]) {}
}

export class DeleteTypesFail implements Action {
  readonly type = DELETE_TYPES_FAIL;
  constructor(public payload: any) {}
}

export type TypesAction =
  | GenerateTypesData
  | GenerateTypesDataSuccess
  | GenerateTypesDataFail
  | LoadTypes
  | LoadTypesFail
  | LoadTypesSuccess
  | SelectType
  | LoadSelectedType
  | LoadSelectedTypeFail
  | LoadSelectedTypeSuccess
  | CreateType
  | CreateTypeSuccess
  | CreateTypeFail
  | UpdateType
  | UpdateTypeSuccess
  | UpdateTypeFail
  | DeleteType
  | DeleteTypeSuccess
  | DeleteTypeFail
  | DeleteTypes
  | DeleteTypesSuccess
  | DeleteTypesFail;
