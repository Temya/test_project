import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { ProductsParams } from "../interface/products-params";
import { ActivitiesService } from "../services/activities.service";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
  providers: [HttpClient, ActivitiesService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnDestroy{

  public products: ProductsParams[] = [];

  public sbj = new Subject<ProductsParams[]>();

  private readonly unSubscribe$$ = new Subject<void>();

  constructor(private readonly router: Router,
    private service: ActivitiesService,
    private readonly fb: FormBuilder,
    private cdr: ChangeDetectorRef)
  {
    if (this.products){
      this.service.getProducts$().subscribe((data) => {
        this.products = data.products;
        this.cdr.detectChanges();
      });
    }
    this.service.products = this.products;
  }
 
  public ngOnDestroy(): void {
    this.unSubscribe$$.next();
    this.unSubscribe$$.complete();
  }


  public delete(product: ProductsParams): void {
    this.products = this.products.filter((n) => n.id !== product.id);
  }

  public create(): void{
    this.router.navigateByUrl("product-create");
  }
  
  // public edit(product: Products): void {
  //   // this.router.navigateByUrl(`edit/${product.id}`);
  //   // this.service.activityItem(product);
  // }
}
