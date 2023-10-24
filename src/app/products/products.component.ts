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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnDestroy{

  public products: Product[] = [];

  private readonly unSubscribe$$ = new Subject<void>();

  constructor(private readonly router: Router,
    private service: BackendService,
    private readonly fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private productService: ActivitiesService)
  {
    if (!productService.getProducts().length){
      this.service.getProducts$()
        .subscribe((data) => {
          this.products = data.products;
          productService.saveProducts(this.products);
          this.cdr.detectChanges();
        });
    }
    else {
      this.products = productService.getProducts();
    }
  }
 
  public ngOnDestroy(): void {
    this.unSubscribe$$.next();
    this.unSubscribe$$.complete();
  }


  public delete(product: Product): void {
    this.productService.deleteProduct(product);
    this.products = this.productService.getProducts();
  }

  public create(): void{
    this.router.navigateByUrl("product-create");
  }
  
  // public edit(product: Products): void {
  //   // this.router.navigateByUrl(`edit/${product.id}`);
  //   // this.service.activityItem(product);
  // }
}
