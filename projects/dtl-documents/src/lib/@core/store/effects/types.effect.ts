import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as typesActions from '../actions/types.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { TypesService } from '../../services/types.service';

import { of } from 'rxjs';
import { DeleteTypes } from '../actions/types.action';

@Injectable()
export class TypesEffects {
  constructor(
    private actions$: Actions,
    private service: TypesService
  ) {}

  @Effect()
  generateTypes$ = this.actions$
    .ofType(typesActions.GENERATE_TYPES_DATA)
    .pipe(
      switchMap(() => {
        return of(this.service.generate()).pipe(
          map(types => new typesActions.GenerateTypesDataSuccess()),
          catchError(error =>
            of(new typesActions.GenerateTypesDataFail())
          )
        );
      })
    );

  @Effect()
  loadTypes$ = this.actions$.ofType(typesActions.LOAD_TYPES).pipe(
    switchMap(() => {
      return of(this.service.all()).pipe(
        map(types => new typesActions.LoadTypesSuccess(types)),
        catchError(error => of(new typesActions.LoadTypesFail(error)))
      );
    })
  );

  @Effect()
  createType$ = this.actions$.ofType(typesActions.CREATE_TYPE).pipe(
    switchMap((action: typesActions.CreateType) => {
      return of(this.service.store(action.payload)).pipe(
        map(() => new typesActions.CreateTypeSuccess(action.payload)),
        catchError(error => of(new typesActions.CreateTypeFail(error)))
      );
    })
  );

  @Effect()
  deleteType$ = this.actions$.ofType(typesActions.DELETE_TYPE).pipe(
    switchMap((action: typesActions.DeleteType) => {
      return of(this.service.delete(action.id)).pipe(
        map(() => new typesActions.DeleteTypeSuccess(action.id)),
        catchError(error => of(new typesActions.DeleteTypesFail(error)))
      );
    })
  );

  @Effect()
  deleteTypes$ = this.actions$.ofType(typesActions.DELETE_TYPES).pipe(
    switchMap((action: typesActions.DeleteTypes) => {
      return of(this.service.deleteMany(action.ids)).pipe(
        map(() => new typesActions.DeleteTypesSuccess(action.ids)),
        catchError(error => of(new typesActions.DeleteTypesFail(error)))
      );
    })
  );
}
