import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Product } from "../interface/product";
import { ActivitiesService } from "../services/activities.service";

@Component({
  selector: "app-product-create",
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    HttpClientModule],
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.scss"],
  providers: [HttpClient, ActivitiesService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCreateComponent implements OnInit{

  public product?: Product;

  public formCreate?: FormGroup;

  constructor(private readonly router: Router, private readonly fb: FormBuilder, private service: ActivitiesService){

  }

  public addProduct(): void{
    if (this.formCreate?.valid){
      this.product = this.formCreate?.getRawValue();
      this.service.createProduct(this.product as Product);
      console.log(this.service.products);
      this.router.navigateByUrl("products");
    }
  }

  public ngOnInit(): void {
    console.log(this.service.getProducts());
    this.formCreate = this.fb.group({
      id: this.fb.control(this.service.getProducts().length + 1),
      title: this.fb.control("", Validators.required),
      description: this.fb.control("", Validators.required),
      price: this.fb.control("", Validators.required),
      brand: this.fb.control("", Validators.required),
      category: this.fb.control("", Validators.required),
    }); 
  }
}
