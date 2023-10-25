import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, ReactiveFormsModule } from "@angular/forms";
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

  public control = new FormControl("");

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
    this.control.valueChanges.pipe(takeUntil(this.unSubscribe$$)).subscribe((val) => service.gerSearchProduct$(val as string).subscribe((data) => this.products = data.products));
    this.products = this.products.map((item) => ({id: item.id, title: item.title, description: item.description, category: item.category, brand: item.brand, price: item.price}));
    // this.products.map((item) => ({id: item.id}))
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
  
  public edit(product: Product): void {
    this.router.navigateByUrl(`product-edit/${product.id}`);
  }

  public backArray(): void{
    this.products = this.productService.products;
  }
}
