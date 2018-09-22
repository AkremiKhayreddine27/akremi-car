import {
  ActionReducerMap,
  createFeatureSelector,
  MemoizedSelector
} from "@ngrx/store";
import * as fromDocuments from "./documents.reducer";
import * as fromCategories from "./categories.reducer";
import * as fromTypes from "./types.reducer";

export interface DocumentsState {
  documents: fromDocuments.DocumentsState;
  categories: fromCategories.CategoriesState;
  types: fromTypes.TypesState;
}

export const reducers: ActionReducerMap<DocumentsState> = {
  documents: fromDocuments.documentsReducer,
  categories: fromCategories.categoriesReducer,
  types: fromTypes.typesReducer
};

export const getAppDocumentsState = createFeatureSelector<DocumentsState>(
  "dtl-documents"
);
