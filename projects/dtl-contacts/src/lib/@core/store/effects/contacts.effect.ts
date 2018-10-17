import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";

import * as contactsActions from "../actions/contacts.action";
import { switchMap, map, catchError } from "rxjs/operators";
import { ContactsService } from "../../services/contacts.service";

import { of, from } from "rxjs";
import { QueueService } from "../../services/queue.service";
import { UpdateContact, UpdateContactSuccess } from '../actions/contacts.action';

@Injectable()
export class ContactsEffects {
  constructor(
    private actions$: Actions,
    private contactsService: ContactsService,
    private queueService: QueueService
  ) {}

  @Effect()
  generateProperties$ = this.actions$
    .ofType(contactsActions.GENERATE_CONTACTS_DATA)
    .pipe(
      switchMap(() => {
        return from(this.contactsService.generate(50)).pipe(
          map(
            () =>
              new contactsActions.LoadContacts(
                { filters: [], andOperator: true },
                [{ field: "name.familyName", direction: "asc" }],
                {
                  page: 1,
                  perPage: 10
                }
              )
          ),
          catchError(error =>
            of(new contactsActions.GenerateContactsDataFail())
          )
        );
      })
    );

  @Effect()
  loadContacts$ = this.actions$.ofType(contactsActions.LOAD_CONTACTS).pipe(
    switchMap(() => {
      return from(this.contactsService.getAll()).pipe(
        map(contacts => new contactsActions.LoadContactsSuccess(contacts)),
        catchError(error => of(new contactsActions.LoadContactsFail(error)))
      );
    })
  );

  @Effect()
  createContact$ = this.actions$.ofType(contactsActions.CREATE_CONTACT).pipe(
    switchMap((action: contactsActions.CreateContact) => {
      return of(this.contactsService.store(action.payload)).pipe(
        map(() => new contactsActions.CreateContactSuccess(action.payload)),
        catchError(error => of(new contactsActions.CreateContactFail(error)))
      );
    })
  );

  @Effect()
  updateContact$ = this.actions$.ofType(contactsActions.UPDATE_CONTACT).pipe(
    switchMap((action: contactsActions.UpdateContact) => {
      return from(this.contactsService.update(action.id, action.changes)).pipe(
        map(() => new contactsActions.UpdateContactSuccess(action.id, action.changes)),
        catchError(error => of(new contactsActions.CreateContactFail(error)))
      );
    })
  );

  @Effect()
  deleteContact$ = this.actions$.ofType(contactsActions.DELETE_CONTACT).pipe(
    switchMap((action: contactsActions.DeleteContact) => {
      return from(this.contactsService.delete(action.id)).pipe(
        map(() => new contactsActions.DeleteContactSuccess(action.id)),
        catchError(error => of(new contactsActions.DeleteContactFail(error)))
      );
    })
  );

  @Effect()
  deleteContacts$ = this.actions$.ofType(contactsActions.DELETE_CONTACTS).pipe(
    switchMap((action: contactsActions.DeleteContacts) => {
      return of(this.contactsService.deleteMany(action.ids)).pipe(
        map(() => new contactsActions.DeleteContactsSuccess(action.ids)),
        catchError(error => of(new contactsActions.DeleteContactFail(error)))
      );
    })
  );

  @Effect()
  assignContactToGroup$ = this.actions$
    .ofType(contactsActions.ASSIGN_CONTACT_TO_GROUP)
    .pipe(
      switchMap((action: contactsActions.AssignContactToGroup) => {
        return of(
          this.contactsService.assignContactToGroup(
            action.contact,
            action.group
          )
        ).pipe(
          map(
            () =>
              new contactsActions.AssignContactToGroupSuccess(
                action.contact,
                action.group
              )
          ),
          catchError(error =>
            of(new contactsActions.AssignContactToGroupFail(error))
          )
        );
      })
    );
}
