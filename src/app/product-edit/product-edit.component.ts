import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivitiesService } from "../services/activities.service";

@Component({
  selector: "app-product-edit",
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.scss"]
})
export class ProductEditComponent implements OnInit{
  
  public formEdit?: FormGroup;

  constructor(private readonly router: Router,
    private service: ActivitiesService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute){}

  public saveProduct(): void{
    this.service.updateProduct(this.formEdit?.getRawValue());
    this.router.navigateByUrl("products");
  }
  
  public ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get("id") as string);
    const product = this.service.getProductEdit(id);
        this.formEdit = this.fb.group({
          id: this.fb.control(product.id, Validators.required),
          title: this.fb.control(product.title, Validators.required),
          description: this.fb.control(product.description, Validators.required),
          price: this.fb.control(product.price, Validators.required),
          brand: this.fb.control(product.brand, Validators.required),
          category: this.fb.control(product.category, Validators.required),
        });
  }
}
