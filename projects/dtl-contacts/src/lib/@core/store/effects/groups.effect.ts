import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as groupsActions from '../actions/groups.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { GroupsService } from '../../services/groups.service';

import { of } from 'rxjs';

@Injectable()
export class GroupsEffects {
  constructor(private actions$: Actions, private service: GroupsService) {}

  @Effect()
  generateProperties$ = this.actions$
    .ofType(groupsActions.GENERATE_GROUPS_DATA)
    .pipe(
      switchMap(() => {
        return of(this.service.generate(20)).pipe(
          map(groups => new groupsActions.GenerateGroupsDataSuccess()),
          catchError(error => of(new groupsActions.GenerateGroupsDataFail()))
        );
      })
    );

  @Effect()
  loadGroups$ = this.actions$.ofType(groupsActions.LOAD_GROUPS).pipe(
    switchMap(() => {
      return of(this.service.all()).pipe(
        map(groups => new groupsActions.LoadGroupsSuccess(groups)),
        catchError(error => of(new groupsActions.LoadGroupsFail(error)))
      );
    })
  );

  @Effect()
  createGroup$ = this.actions$.ofType(groupsActions.CREATE_GROUP).pipe(
    switchMap((action: groupsActions.CreateGroup) => {
      return of(this.service.store(action.payload)).pipe(
        map(() => new groupsActions.CreateGroupSuccess(action.payload)),
        catchError(error => of(new groupsActions.CreateGroupFail(error)))
      );
    })
  );

  @Effect()
  deleteGroup$ = this.actions$.ofType(groupsActions.DELETE_GROUP).pipe(
    switchMap((action: groupsActions.DeleteGroup) => {
      return of(this.service.delete(action.id)).pipe(
        map(() => new groupsActions.DeleteGroupSuccess(action.id)),
        catchError(error => of(new groupsActions.DeleteGroupFail(error)))
      );
    })
  );
}
