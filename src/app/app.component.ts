import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ActivitiesService } from "./services/activities.service";
import { BackendService } from "./services/backend.service";

@Component({
  imports: [RouterOutlet],
  selector: "app-root",
  standalone: true,
  providers: [ActivitiesService, HttpClient, BackendService],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public title = "priloga";
}
