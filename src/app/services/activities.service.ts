import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject, takeUntil } from "rxjs";
import { ActivityItem } from "../interface/activity";
import { Products } from "../interface/products";
import { ProductsParams } from "../interface/products-params";

@Injectable({
  providedIn: "root",
})
export class ActivitiesService implements OnDestroy {

  public activities: ActivityItem[] = [];

  public products: ProductsParams[] = [];

  public product?: ProductsParams;

  public activity?: ActivityItem;

  private readonly unSubscribe$$ = new Subject<void>();

  constructor(private readonly router: Router,
    private readonly http: HttpClient,
    private cdr: ChangeDetectorRef)
  { 
    this.loadData();  
  }

  

  public ngOnDestroy(): void {
    this.unSubscribe$$.next();
    this.unSubscribe$$.complete();
  }

  public getProducts(): ProductsParams[]{
    return this.products;
  }

  public getProducts$(): Observable<Products> {
    const url = "/api/products?&select=id,title,description,price,brand,category";
    return this.http.get<Products>(url, { withCredentials: true });
  }

  public createActivity(activity: ActivityItem): void {
    this.activities.push(activity);
  }

  public createProduct(product: ProductsParams): void{
    this.products.push(product);
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
