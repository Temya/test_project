import { Routes } from "@angular/router";

export const appRoutes: Routes = [
    {path: "", pathMatch: "full", redirectTo: "activity"},
    {path: "activity", loadComponent: () => import("./activity/activity.component").then((i) => i.ActivityComponent)},
    {path: "login", loadComponent: () => import("./login/login.component").then((i) => i.LoginComponent)},
    {path: "register", loadComponent: () => import("./registration/registration.component").then((i) => i.RegistrationComponent)},
    {path: "activ", loadComponent: () => import("./activity/activity.component").then((i) => i.ActivityComponent)}
]