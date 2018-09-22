import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { ContactsComponent } from "./pages/contacts/contacts.component";
import { DocumentsComponent } from "./pages/documents/documents.component";
import { CalendarComponent } from "./pages/calendar/calendar.component";

import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent
} from "@nebular/auth";

const routes: Routes = [
  { path: "pages", loadChildren: "app/pages/pages.module#PagesModule" },
  {
    path: "calendar",
    component: CalendarComponent
  },
  {
    path: "contacts",
    component: ContactsComponent
  },
  {
    path: "documents",
    component: DocumentsComponent
  },
  {
    path: "auth",
    component: NbAuthComponent,
    children: [
      {
        path: "",
        component: NbLoginComponent
      },
      {
        path: "login",
        component: NbLoginComponent
      },
      {
        path: "register",
        component: NbRegisterComponent
      },
      {
        path: "logout",
        component: NbLogoutComponent
      },
      {
        path: "request-password",
        component: NbRequestPasswordComponent
      },
      {
        path: "reset-password",
        component: NbResetPasswordComponent
      }
    ]
  },
  { path: "", redirectTo: "pages", pathMatch: "full" },
  { path: "**", redirectTo: "pages" }
];

const config: ExtraOptions = {
  useHash: true
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
