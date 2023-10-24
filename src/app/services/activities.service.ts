import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { ActivityItem } from "../interface/activity"; 
import { Product } from "../interface/product";

@Injectable({
  providedIn: "root",
})
export class ActivitiesService {

  public activities: ActivityItem[] = [];

  public products: Product[] = [];

  public product?: Product;

  public activity?: ActivityItem;

  private readonly unSubscribe$$ = new Subject<void>();

  constructor(private readonly router: Router,
    private readonly http: HttpClient,
    private cdr: ChangeDetectorRef)
  { 
    console.log(2);
    this.loadData();  
  }

  public saveProducts(items: Product[]): void{
    this.products = items;
    console.log(this.products);
  }

  public getProducts(): Product[]{
    return this.products;
  }

  public createProduct(product: Product): void{
    this.products.push(product);
  }

  public deleteProduct(product: Product): void{
    this.products = this.products.filter((n) => n.id !== product.id);
  }


  public createActivity(activity: ActivityItem): void {
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
  public getActivities(): ActivityItem[] {
    return this.activities;
  }

  public activityItem(activitySet: ActivityItem): void {
    this.activity = activitySet;
  }

  public getActivityEdit(id: number): ActivityItem {
    return this.activity = this.activities.find((activ) => activ.id === id) as ActivityItem;
  }

  public updateActivity(event: ActivityItem): void {
    this.activities = this.activities.map((activity) => {
      if (activity.id === event.id) return event;
        return activity;
    });
  }

  public activityDelete(activity: ActivityItem): void {
    this.activities = this.activities.filter((n) => n.id !== activity.id);
  }

}
