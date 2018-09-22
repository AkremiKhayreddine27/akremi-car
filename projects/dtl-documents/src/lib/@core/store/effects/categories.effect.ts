import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as categoriesActions from '../actions/categories.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CategoriesService } from '../../services/categories.service';

import { of } from 'rxjs';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private service: CategoriesService
  ) {}

  @Effect()
  generateCategories$ = this.actions$
    .ofType(categoriesActions.GENERATE_CATEGORIES_DATA)
    .pipe(
      switchMap(() => {
        return of(this.service.generate()).pipe(
          map(categories => new categoriesActions.GenerateCategoriesDataSuccess()),
          catchError(error =>
            of(new categoriesActions.GenerateCategoriesDataFail())
          )
        );
      })
    );

  @Effect()
  loadCategories$ = this.actions$.ofType(categoriesActions.LOAD_CATEGORIES).pipe(
    switchMap(() => {
      return of(this.service.all()).pipe(
        map(categories => new categoriesActions.LoadCategoriesSuccess(categories)),
        catchError(error => of(new categoriesActions.LoadCategoriesFail(error)))
      );
    })
  );

  @Effect()
  createCategory$ = this.actions$.ofType(categoriesActions.CREATE_CATEGORY).pipe(
    switchMap((action: categoriesActions.CreateCategory) => {
      return of(this.service.store(action.payload)).pipe(
        map(() => new categoriesActions.CreateCategorySuccess(action.payload)),
        catchError(error => of(new categoriesActions.CreateCategoryFail(error)))
      );
    })
  );

  @Effect()
  deleteCategory$ = this.actions$.ofType(categoriesActions.DELETE_CATEGORY).pipe(
    switchMap((action: categoriesActions.DeleteCategory) => {
      return of(this.service.delete(action.id)).pipe(
        map(() => new categoriesActions.DeleteCategorySuccess(action.id)),
        catchError(error => of(new categoriesActions.DeleteCategoryFail(error)))
      );
    })
  );

  @Effect()
  deleteCategories$ = this.actions$.ofType(categoriesActions.DELETE_CATEGORIES).pipe(
    switchMap((action: categoriesActions.DeleteCategories) => {
      return of(this.service.deleteMany(action.ids)).pipe(
        map(() => new categoriesActions.DeleteCategoriesSuccess(action.ids)),
        catchError(error => of(new categoriesActions.DeleteCategoriesFail(error)))
      );
    })
  );
}
