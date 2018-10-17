import * as fromQueueActions from "../actions/queue.action";
import { Queue } from "../../models/queue";
import {
  EntityState,
  EntityAdapter,
  Dictionary,
  createEntityAdapter
} from "@ngrx/entity";

export interface QueueState extends EntityState<Queue> {
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const adapter: EntityAdapter<Queue> = createEntityAdapter<Queue>({});

export const initialState: QueueState = adapter.getInitialState({
  loaded: false,
  loading: false,
  error: {}
});

export function queueReducer(
  state: QueueState = initialState,
  action: fromQueueActions.QueueActions
): QueueState {
  switch (action.type) {
    case fromQueueActions.LOAD_QUEUE: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }
    case fromQueueActions.LOAD_QUEUE_SUCCESS: {
      return adapter.addAll(action.payload, {
        ...state,
        loaded: true,
        loading: false,
        error: null
      });
    }
    case fromQueueActions.LOAD_QUEUE_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: action.error
      };
    }
    case fromQueueActions.ADD_TO_QUEUE: {
      return {
        ...state
      };
    }
    case fromQueueActions.ADD_TO_QUEUE_SUCCESS: {
      return adapter.addOne(action.payload, { ...state });
    }
    case fromQueueActions.ADD_TO_QUEUE_FAIL: {
      return {
        ...state,
        error: action.error
      };
    }
    case fromQueueActions.CLEAR_QUEUE: {
      return { ...state };
    }
    case fromQueueActions.CLEAR_QUEUE_SUCCESS: {
      return adapter.removeAll({ ...state });
    }
    case fromQueueActions.CLEAR_QUEUE_FAIL: {
      return {
        ...state,
        error: action.error
      };
    }
  }
  return state;
}

export const getQueueEntities = (state: QueueState) => state.entities;
export const getQueueLoading = (state: QueueState) => state.loading;
export const getQueueLoaded = (state: QueueState) => state.loaded;
export const getQueueError = (state: QueueState) => state.error;
