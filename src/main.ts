import { provideHttpClient } from "@angular/common/http";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { AppComponent } from "./app/app.component";
import { appRoutes } from "./app/app.routes";
import { ActivitiesService } from "./app/services/activities.service";
import { BackendService } from "./app/services/backend.service";


bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(appRoutes), 
      { provide: ActivitiesService, useClass: ActivitiesService},
      provideHttpClient(),
      { provide: BackendService, useClass: BackendService}
    ]
})
  .catch((err) => console.error(err));
