import { createSelector, MemoizedSelector } from "@ngrx/store";
import * as fromFeature from "../reducers";
import * as fromQueue from "../reducers/queue.reducer";
import { Queue } from "../../models/queue";
import { Dictionary } from "@ngrx/entity";

export const getQueueState = createSelector(
  fromFeature.getContactsAppState,
  (state: fromFeature.ContactsAppState) => state.queue
);

export const getQueueEntities = createSelector(
  getQueueState,
  fromQueue.getQueueEntities
);

export const getQueueCount = createSelector(getQueueState, state => {
  return Object.keys(state.entities).map(id => state.entities[id]).length;
});

export const getAllQueue = createSelector(getQueueState, state => {
  return Object.keys(state.entities).map(id => state.entities[id]);
});

export const getQueueLoaded = createSelector(
  getQueueState,
  fromQueue.getQueueLoaded
);

export const getQueueLoading = createSelector(
  getQueueState,
  fromQueue.getQueueLoading
);

export const getQueueError = createSelector(
  getQueueState,
  fromQueue.getQueueError
);
