import { Routes } from "@angular/router";
import { ActivityEditComponent } from "./activity-edit/activity-edit.component";

export const appRoutes: Routes = [
    {path: "", pathMatch: "full", redirectTo: "activity"},
    {path: "activity", loadComponent: () => import("./activity/activity.component").then((i) => i.ActivityComponent)},
    {path: "login", loadComponent: () => import("./login/login.component").then((i) => i.LoginComponent)},
    {path: "register", loadComponent: () => import("./registration/registration.component").then((i) => i.RegistrationComponent)},
    {path: "edit/:id", component: ActivityEditComponent},
    {path: "create", loadComponent: () => import("./activities-create/activities-create.component").then((i) => i.ActivitiesCreateComponent)}

];