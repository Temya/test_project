import { Routes } from "@angular/router";

export const appRoutes: Routes = [
    {path: "", pathMatch: "full", redirectTo: "products"},
    {path: "activity", loadComponent: () => import("./activity/activity.component").then((i) => i.ActivityComponent)},
    {path: "login", loadComponent: () => import("./login/login.component").then((i) => i.LoginComponent)},
    {path: "register", loadComponent: () => import("./registration/registration.component").then((i) => i.RegistrationComponent)},
    {path: "edit/:id", loadComponent: () => import("./activity-edit/activity-edit.component").then((i) => i.ActivityEditComponent)},
    {path: "create", loadComponent: () => import("./activities-create/activities-create.component").then((i) => i.ActivitiesCreateComponent)},
    {path: "products", loadComponent: () => import("./products/products.component").then((i) => i.ProductsComponent)},
    {path: "product-create", loadComponent: () => import("./product-create/product-create.component").then((i) => i.ProductCreateComponent)},
    {path: "product-edit/:id", loadComponent: () => import("./product-edit/product-edit.component").then((i) => i.ProductEditComponent)},
];