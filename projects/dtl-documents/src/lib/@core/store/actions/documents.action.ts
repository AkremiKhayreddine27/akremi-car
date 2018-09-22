import { Action } from '@ngrx/store';

import { Document } from '../../models';
import { Pagination, FilterConf, SortConf } from '../helpers';

export const GENERATE_DOCUMENTS_DATA = '[Documents] Generate Documents data';
export const GENERATE_DOCUMENTS_DATA_SUCCESS =
  '[Documents] Generate Documents data Success';
export const GENERATE_DOCUMENTS_DATA_FAIL =
  '[Documents] Generate Documents data Fail';
export const LOAD_DOCUMENTS = '[Documents] Load Documents';
export const LOAD_DOCUMENTS_FAIL = '[Documents] Load Documents Fail';
export const LOAD_DOCUMENTS_SUCCESS = '[Documents] Load Documents Success';
export const SELECT_DOCUMENT = '[Documents] Select Document';
export const LOAD_SELECTED_DOCUMENT = '[Documents] Load Selected Document';
export const LOAD_SELECTED_DOCUMENT_FAIL =
  '[Documents] Load Selected Document Fail';
export const LOAD_SELECTED_DOCUMENT_SUCCESS =
  '[Documents] Load Selected Document Success';

export const CREATE_DOCUMENT = '[Documents] Create Document';
export const CREATE_DOCUMENT_SUCCESS = '[Documents] Create Document Success';
export const CREATE_DOCUMENT_FAIL = '[Documents] Create Document Fail';
export const UPDATE_DOCUMENT = '[Documents] Update Document';
export const UPDATE_DOCUMENT_SUCCESS = '[Documents] Update Document Success';
export const UPDATE_DOCUMENT_FAIL = '[Documents] Update Document Fail';
export const DELETE_DOCUMENT = '[Documents] Delete Document';
export const DELETE_DOCUMENT_SUCCESS = '[Documents] Delete Document Success';
export const DELETE_DOCUMENT_FAIL = '[Documents] Delete Document Fail';
export const DELETE_DOCUMENTS = '[Documents] Delete Documents';
export const DELETE_DOCUMENTS_SUCCESS = '[Documents] Delete Documents Success';
export const DELETE_DOCUMENTS_FAIL = '[Documents] Delete Documents Fail';

export class GenerateDocumentsData implements Action {
  readonly type = GENERATE_DOCUMENTS_DATA;
}

export class GenerateDocumentsDataSuccess implements Action {
  readonly type = GENERATE_DOCUMENTS_DATA_SUCCESS;
}

export class GenerateDocumentsDataFail implements Action {
  readonly type = GENERATE_DOCUMENTS_DATA_FAIL;
}

export class LoadDocuments implements Action {
  readonly type = LOAD_DOCUMENTS;
  constructor(
    public filters: FilterConf = null,
    public sort: SortConf[] = null,
    public pagination: Pagination = null
  ) {}
}

export class LoadDocumentsFail implements Action {
  readonly type = LOAD_DOCUMENTS_FAIL;
  constructor(public payload: any) {}
}

export class LoadDocumentsSuccess implements Action {
  readonly type = LOAD_DOCUMENTS_SUCCESS;
  constructor(public payload: Document[]) {}
}

export class SelectDocument implements Action {
  readonly type = SELECT_DOCUMENT;
  constructor(public payload: number) {}
}

export class LoadSelectedDocument implements Action {
  readonly type = LOAD_SELECTED_DOCUMENT;
}

export class LoadSelectedDocumentFail implements Action {
  readonly type = LOAD_SELECTED_DOCUMENT_FAIL;
  constructor(public payload: any) {}
}

export class LoadSelectedDocumentSuccess implements Action {
  readonly type = LOAD_SELECTED_DOCUMENT_SUCCESS;
  constructor(public payload: Document) {}
}

export class CreateDocument implements Action {
  readonly type = CREATE_DOCUMENT;
  constructor(public payload: Document) {}
}

export class CreateDocumentSuccess implements Action {
  readonly type = CREATE_DOCUMENT_SUCCESS;
  constructor(public payload: Document) {}
}

export class CreateDocumentFail implements Action {
  readonly type = CREATE_DOCUMENT_FAIL;
  constructor(public payload: any) {}
}

export class UpdateDocument implements Action {
  readonly type = UPDATE_DOCUMENT;
  constructor(public id: number, public changes: Partial<Document>) {}
}

export class UpdateDocumentSuccess implements Action {
  readonly type = UPDATE_DOCUMENT_SUCCESS;
  constructor(public id: number, public changes: Partial<Document>) {}
}

export class UpdateDocumentFail implements Action {
  readonly type = UPDATE_DOCUMENT_FAIL;
  constructor(public payload: any) {}
}

export class DeleteDocument implements Action {
  readonly type = DELETE_DOCUMENT;
  constructor(public id: number) {}
}

export class DeleteDocumentSuccess implements Action {
  readonly type = DELETE_DOCUMENT_SUCCESS;
  constructor(public id: number) {}
}

export class DeleteDocumentFail implements Action {
  readonly type = DELETE_DOCUMENT_FAIL;
  constructor(public payload: any) {}
}

export class DeleteDocuments implements Action {
  readonly type = DELETE_DOCUMENTS;
  constructor(public ids: number[]) {}
}

export class DeleteDocumentsSuccess implements Action {
  readonly type = DELETE_DOCUMENTS_SUCCESS;
  constructor(public ids: number[]) {}
}

export class DeleteDocumentsFail implements Action {
  readonly type = DELETE_DOCUMENTS_FAIL;
  constructor(public payload: any) {}
}

export type DocumentsAction =
  | GenerateDocumentsData
  | GenerateDocumentsDataSuccess
  | GenerateDocumentsDataFail
  | LoadDocuments
  | LoadDocumentsFail
  | LoadDocumentsSuccess
  | SelectDocument
  | LoadSelectedDocument
  | LoadSelectedDocumentFail
  | LoadSelectedDocumentSuccess
  | CreateDocument
  | CreateDocumentSuccess
  | CreateDocumentFail
  | UpdateDocument
  | UpdateDocumentSuccess
  | UpdateDocumentFail
  | DeleteDocument
  | DeleteDocumentSuccess
  | DeleteDocumentFail
  | DeleteDocuments
  | DeleteDocumentsSuccess
  | DeleteDocumentsFail;
