import { Action } from '@ngrx/store';

import { Category } from '../../models';
import { Pagination, FilterConf, SortConf } from '../helpers';

export const GENERATE_CATEGORIES_DATA = '[Categories] Generate Categories data';
export const GENERATE_CATEGORIES_DATA_SUCCESS =
  '[Categories] Generate Categories data Success';
export const GENERATE_CATEGORIES_DATA_FAIL =
  '[Categories] Generate Categories data Fail';
export const LOAD_CATEGORIES = '[Categories] Load Categories';
export const LOAD_CATEGORIES_FAIL = '[Categories] Load Categories Fail';
export const LOAD_CATEGORIES_SUCCESS = '[Categories] Load Categories Success';
export const SELECT_CATEGORY = '[Categories] Select Category';
export const LOAD_SELECTED_CATEGORY = '[Categories] Load Selected Category';
export const LOAD_SELECTED_CATEGORY_FAIL =
  '[Categories] Load Selected Category Fail';
export const LOAD_SELECTED_CATEGORY_SUCCESS =
  '[Categories] Load Selected Category Success';

export const CREATE_CATEGORY = '[Categories] Create Category';
export const CREATE_CATEGORY_SUCCESS = '[Categories] Create Category Success';
export const CREATE_CATEGORY_FAIL = '[Categories] Create Category Fail';
export const UPDATE_CATEGORY = '[Categories] Update Category';
export const UPDATE_CATEGORY_SUCCESS = '[Categories] Update Category Success';
export const UPDATE_CATEGORY_FAIL = '[Categories] Update Category Fail';
export const DELETE_CATEGORY = '[Categories] Delete Category';
export const DELETE_CATEGORY_SUCCESS = '[Categories] Delete Category Success';
export const DELETE_CATEGORY_FAIL = '[Categories] Delete Category Fail';
export const DELETE_CATEGORIES = '[Categories] Delete Categories';
export const DELETE_CATEGORIES_SUCCESS = '[Categories] Delete Categories Success';
export const DELETE_CATEGORIES_FAIL = '[Categories] Delete Categories Fail';

export class GenerateCategoriesData implements Action {
  readonly type = GENERATE_CATEGORIES_DATA;
}

export class GenerateCategoriesDataSuccess implements Action {
  readonly type = GENERATE_CATEGORIES_DATA_SUCCESS;
}

export class GenerateCategoriesDataFail implements Action {
  readonly type = GENERATE_CATEGORIES_DATA_FAIL;
}

export class LoadCategories implements Action {
  readonly type = LOAD_CATEGORIES;
  constructor(
    public filters: FilterConf = null,
    public sort: SortConf[] = null,
    public pagination: Pagination = null
  ) {}
}

export class LoadCategoriesFail implements Action {
  readonly type = LOAD_CATEGORIES_FAIL;
  constructor(public payload: any) {}
}

export class LoadCategoriesSuccess implements Action {
  readonly type = LOAD_CATEGORIES_SUCCESS;
  constructor(public payload: Category[]) {}
}

export class SelectCategory implements Action {
  readonly type = SELECT_CATEGORY;
  constructor(public payload: number) {}
}

export class LoadSelectedCategory implements Action {
  readonly type = LOAD_SELECTED_CATEGORY;
}

export class LoadSelectedCategoryFail implements Action {
  readonly type = LOAD_SELECTED_CATEGORY_FAIL;
  constructor(public payload: any) {}
}

export class LoadSelectedCategorySuccess implements Action {
  readonly type = LOAD_SELECTED_CATEGORY_SUCCESS;
  constructor(public payload: Category) {}
}

export class CreateCategory implements Action {
  readonly type = CREATE_CATEGORY;
  constructor(public payload: Category) {}
}

export class CreateCategorySuccess implements Action {
  readonly type = CREATE_CATEGORY_SUCCESS;
  constructor(public payload: Category) {}
}

export class CreateCategoryFail implements Action {
  readonly type = CREATE_CATEGORY_FAIL;
  constructor(public payload: any) {}
}

export class UpdateCategory implements Action {
  readonly type = UPDATE_CATEGORY;
  constructor(public id: number, public changes: Partial<Category>) {}
}

export class UpdateCategorySuccess implements Action {
  readonly type = UPDATE_CATEGORY_SUCCESS;
  constructor(public id: number, public changes: Partial<Category>) {}
}

export class UpdateCategoryFail implements Action {
  readonly type = UPDATE_CATEGORY_FAIL;
  constructor(public payload: any) {}
}

export class DeleteCategory implements Action {
  readonly type = DELETE_CATEGORY;
  constructor(public id: number) {}
}

export class DeleteCategorySuccess implements Action {
  readonly type = DELETE_CATEGORY_SUCCESS;
  constructor(public id: number) {}
}

export class DeleteCategoryFail implements Action {
  readonly type = DELETE_CATEGORY_FAIL;
  constructor(public payload: any) {}
}

export class DeleteCategories implements Action {
  readonly type = DELETE_CATEGORIES;
  constructor(public ids: number[]) {}
}

export class DeleteCategoriesSuccess implements Action {
  readonly type = DELETE_CATEGORIES_SUCCESS;
  constructor(public ids: number[]) {}
}

export class DeleteCategoriesFail implements Action {
  readonly type = DELETE_CATEGORIES_FAIL;
  constructor(public payload: any) {}
}

export type CategoriesAction =
  | GenerateCategoriesData
  | GenerateCategoriesDataSuccess
  | GenerateCategoriesDataFail
  | LoadCategories
  | LoadCategoriesFail
  | LoadCategoriesSuccess
  | SelectCategory
  | LoadSelectedCategory
  | LoadSelectedCategoryFail
  | LoadSelectedCategorySuccess
  | CreateCategory
  | CreateCategorySuccess
  | CreateCategoryFail
  | UpdateCategory
  | UpdateCategorySuccess
  | UpdateCategoryFail
  | DeleteCategory
  | DeleteCategorySuccess
  | DeleteCategoryFail
  | DeleteCategories
  | DeleteCategoriesSuccess
  | DeleteCategoriesFail;
