import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import * as documentsActions from '../actions/documents.action';
import { switchMap, map, catchError } from 'rxjs/operators';
import { DocumentsService } from '../../services/documents.service';

import { of } from 'rxjs';

@Injectable()
export class DocumentsEffects {
  constructor(
    private actions$: Actions,
    private service: DocumentsService
  ) {}

  @Effect()
  generateProperties$ = this.actions$
    .ofType(documentsActions.GENERATE_DOCUMENTS_DATA)
    .pipe(
      switchMap(() => {
        return of(this.service.generate(100)).pipe(
          map(properties => new documentsActions.GenerateDocumentsDataSuccess()),
          catchError(error =>
            of(new documentsActions.GenerateDocumentsDataFail())
          )
        );
      })
    );

  @Effect()
  loadDocuments$ = this.actions$.ofType(documentsActions.LOAD_DOCUMENTS).pipe(
    switchMap(() => {
      return of(this.service.all()).pipe(
        map(Documents => new documentsActions.LoadDocumentsSuccess(Documents)),
        catchError(error => of(new documentsActions.LoadDocumentsFail(error)))
      );
    })
  );

  @Effect()
  createDocument$ = this.actions$.ofType(documentsActions.CREATE_DOCUMENT).pipe(
    switchMap((action: documentsActions.CreateDocument) => {
      return of(this.service.store(action.payload)).pipe(
        map(() => new documentsActions.CreateDocumentSuccess(action.payload)),
        catchError(error => of(new documentsActions.CreateDocumentFail(error)))
      );
    })
  );

  @Effect()
  deleteDocument$ = this.actions$.ofType(documentsActions.DELETE_DOCUMENT).pipe(
    switchMap((action: documentsActions.DeleteDocument) => {
      return of(this.service.delete(action.id)).pipe(
        map(() => new documentsActions.DeleteDocumentSuccess(action.id)),
        catchError(error => of(new documentsActions.DeleteDocumentFail(error)))
      );
    })
  );

  @Effect()
  deleteDocuments$ = this.actions$.ofType(documentsActions.DELETE_DOCUMENTS).pipe(
    switchMap((action: documentsActions.DeleteDocuments) => {
      return of(this.service.deleteMany(action.ids)).pipe(
        map(() => new documentsActions.DeleteDocumentsSuccess(action.ids)),
        catchError(error => of(new documentsActions.DeleteDocumentsFail(error)))
      );
    })
  );
}
