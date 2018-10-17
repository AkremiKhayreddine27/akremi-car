import { Action } from "@ngrx/store";
import { Queue } from "../../models/queue";

export const LOAD_QUEUE = "[Queue] Load Queue";
export const LOAD_QUEUE_SUCCESS = "[Queue] Load Queue Success";
export const LOAD_QUEUE_FAIL = "[Queue] Load Queue Fail";
export const ADD_TO_QUEUE = "[Queue] Add To Queue";
export const ADD_TO_QUEUE_SUCCESS = "[Queue] Add To Queue Success";
export const ADD_TO_QUEUE_FAIL = "[Queue] Add To Queue Fail";
export const CLEAR_QUEUE = "[Queue] Clear Queue";
export const CLEAR_QUEUE_SUCCESS = "[Queue] Clear Queue Success";
export const CLEAR_QUEUE_FAIL = "[Queue] Clear Queue Fail";

export class LoadQueue implements Action {
  readonly type = LOAD_QUEUE;
}

export class LoadQueueSuccess implements Action {
  readonly type = LOAD_QUEUE_SUCCESS;
  constructor(public payload: Queue[]) {}
}

export class LoadQueueFail implements Action {
  readonly type = LOAD_QUEUE_FAIL;
  constructor(public error: any) {}
}

export class AddToQueue implements Action {
  readonly type = ADD_TO_QUEUE;
  constructor(public payload: Queue) {}
}

export class AddToQueueSuccess implements Action {
  readonly type = ADD_TO_QUEUE_SUCCESS;
  constructor(public payload: Queue) {}
}

export class AddToQueueFail implements Action {
  readonly type = ADD_TO_QUEUE_FAIL;
  constructor(public error: any) {}
}

export class ClearQueue implements Action {
  readonly type = CLEAR_QUEUE;
}

export class ClearQueueSuccess implements Action {
  readonly type = CLEAR_QUEUE_SUCCESS;
}

export class ClearQueueFail implements Action {
  readonly type = CLEAR_QUEUE_FAIL;
  constructor(public error: any) {}
}
export type QueueActions =
  | LoadQueue
  | LoadQueueSuccess
  | LoadQueueFail
  | AddToQueue
  | AddToQueueSuccess
  | AddToQueueFail
  | ClearQueue
  | ClearQueueSuccess
  | ClearQueueFail;
