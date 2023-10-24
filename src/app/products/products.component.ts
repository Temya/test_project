import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { Product } from "../interface/product";
import { ActivitiesService } from "../services/activities.service";
import { BackendService } from "../services/backend.service";

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
  providers: [HttpClient, BackendService, ActivitiesService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnDestroy{

  public products: Product[] = [];

  private readonly unSubscribe$$ = new Subject<void>();

  constructor(private readonly router: Router,
    private service: BackendService,
    private readonly fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private product: ActivitiesService)
  {
    if (!product.getProducts().length){
      this.service.getProducts$()
      .pipe(takeUntil(this.unSubscribe$$))
      .subscribe((data) => {
        this.products = data.products;
        product.saveProducts(this.products);
        this.cdr.detectChanges();
      });
    }
    this.products = product.getProducts();
  }
 
  public ngOnDestroy(): void {
    this.unSubscribe$$.next();
    this.unSubscribe$$.complete();
  }


  public delete(product: Product): void {
    this.product.deleteProduct(product);
    this.products = this.product.getProducts();
  }

  // public create(): void{
  //   this.router.navigateByUrl("product-create");
  // }
  
  // public edit(product: Products): void {
  //   // this.router.navigateByUrl(`edit/${product.id}`);
  //   // this.service.activityItem(product);
  // }
}
