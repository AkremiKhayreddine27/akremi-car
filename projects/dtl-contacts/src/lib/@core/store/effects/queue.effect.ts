import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import * as queueActions from "../actions/queue.action";
import { switchMap, map, catchError } from "rxjs/operators";
import { of, from } from "rxjs";
import { QueueService } from "../../services/queue.service";

@Injectable()
export class QueueEffects {
  constructor(private actions$: Actions, private queueService: QueueService) {}

  @Effect()
  loadQueue$ = this.actions$.ofType(queueActions.LOAD_QUEUE).pipe(
    switchMap(() => {
      return from(this.queueService.getAll()).pipe(
        map(queue => new queueActions.LoadQueueSuccess(queue)),
        catchError(error => of(new queueActions.LoadQueueFail(error)))
      );
    })
  );

  @Effect()
  addToQueue$ = this.actions$.ofType(queueActions.ADD_TO_QUEUE).pipe(
    switchMap((action: queueActions.AddToQueue) => {
      return from(this.queueService.add(action.payload)).pipe(
        map(() => new queueActions.AddToQueueSuccess(action.payload)),
        catchError(error => of(new queueActions.AddToQueueFail(error)))
      );
    })
  );

  @Effect()
  clearQueue$ = this.actions$.ofType(queueActions.CLEAR_QUEUE).pipe(
    switchMap((action: queueActions.ClearQueue) => {
      return from(this.queueService.clear()).pipe(
        map(() => new queueActions.ClearQueueSuccess()),
        catchError(error => of(new queueActions.ClearQueueFail(error)))
      );
    })
  );
}
