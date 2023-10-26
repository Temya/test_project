import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { PaginationData } from "../interface/pagination-data";
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
  public controlSearch = new FormControl("");
  public controlValue = new FormControl("");
  public page = 0;
  public limit = "10";

  private readonly unSubscribe$$ = new Subject<void>();

  constructor(private readonly router: Router,
    private service: BackendService,
    private readonly fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private productService: ActivitiesService)
  {
    const body: PaginationData = {
      limit: this.limit,
      page: this.page
    };
    if (!productService.getProducts().length){     
      this.service.getProducts$(body)
        .pipe(takeUntil(this.unSubscribe$$))
        .subscribe((data) => {
          this.products = data.products;
          productService.saveProducts(this.products);
          this.cdr.detectChanges();
        });
    }
    else {
      this.products = productService.getProducts();
    }
    this.controlSearch.valueChanges
      .pipe(takeUntil(this.unSubscribe$$))
      .subscribe((val) => service.gerSearchProduct$(val as string).subscribe((data) => {
        this.products = data.products;
        this.cdr.detectChanges();
      }));
    this.controlValue.valueChanges
      .pipe(takeUntil(this.unSubscribe$$))
      .subscribe((val) => {body.limit = val as string; this.limit = val as string; service.getProducts$(body).subscribe((data) => {this.products = data.products; this.cdr.detectChanges();}); console.log(body.limit);});
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

  public skipProductUp(val: number): void{
    const body: PaginationData = {
      limit: this.limit,
      page: this.page
    };
    this.controlValue.valueChanges
    .pipe(takeUntil(this.unSubscribe$$))
    .subscribe((n) => body.limit = n as string);
    body.page = ((val*10) + 10);
    this.service.getProducts$(body)
      .subscribe((data) => {
         this.products = data.products;
         this.productService.saveProducts(this.products);
         this.cdr.detectChanges();
      });
    this.page++;
  }

  public skipProductDown(val: number): void{
    if (val !== 0 || val !< 0)
    {
      const body: PaginationData = {
        limit: this.limit,
        page: this.page
      };
      this.controlValue.valueChanges
        .pipe(takeUntil(this.unSubscribe$$))
        .subscribe((n) => body.limit = n as string);      
      body.page = ((val*10) - 10);
      this.service.getProducts$(body)
      .subscribe((data) => {
        this.products = data.products;
        this.productService.saveProducts(this.products);
        this.cdr.detectChanges();
      });
      this.page--;
    }    
  }

  // this.controlValues.valueChanges
  //     .pipe(takeUntil(this.unSubscribe$$))
  //     .subscribe((val) => service.gerSearchProduct$(val as string).subscribe((data) => {
  //       this.products = data.products;
  //       this.cdr.detectChanges();
}
