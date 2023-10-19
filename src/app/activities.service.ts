import { Injectable } from "@angular/core";
import { ActivityItem } from "./activity/activity";

@Injectable({
  providedIn: "root"
})
export class ActivitiesService {
  public activities: ActivityItem[] = [];
  public activity?: ActivityItem;

  constructor(){ 
    this.loadData();
  }

  public createActivity(activity: ActivityItem): void{
    this.activities.push(activity);
  }

  public loadData(): void{
    for (let i = 0; i < 10; i++){
      this.activities.push({
        id: i,
        name: "Bob",
        description: "Blablablablabal",
        time: "10.11.2023",
        isDone: true
      });
  
    }
  }
  public getActivities(): ActivityItem[]{
    return this.activities;
  }

  public activityItem(activitySet: ActivityItem): void{
    this.activity = activitySet;
  }

  public getActivityEdit(id: number): ActivityItem{
    return this.activity = this.activities.find((activ) => activ.id === id) as ActivityItem;
  }

  public updateActivity(event: ActivityItem): void{
    this.activities = this.activities.map((activity) => {
      if (activity.id === event.id) return event;
        return activity;
    });
  }

  public activityDelete(activity: ActivityItem): void{
    this.activities = this.activities.filter((n) => n.id !== activity.id);
  }

  
}
