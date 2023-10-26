import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCreateComponent implements OnInit{

  @ViewChild("ch") public child!: ElementRef<HTMLInputElement>;
  public product?: Product;
  public formCreate?: FormGroup;
  public date: Date = new Date();


  constructor(private readonly router: Router, private readonly fb: FormBuilder, private service: ActivitiesService){

  }

  get information(): FormArray {
    return this.formCreate?.controls["information"] as FormArray;
  }

  public AbstractToForm(control: AbstractControl): FormGroup{
    return control as FormGroup;
  }

  public addProduct(): void{
    if (this.formCreate?.valid){
      this.product = this.formCreate?.getRawValue();
      this.service.createProduct(this.product as Product);
      console.log("Do" + this.service.getProducts());
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
      information: this.fb.array([this.getInformationGroup()])
    }); 
  }

  public addInformation(): void {
    const informationForm = this.fb.group({
      availability: this.fb.control("", Validators.required),
      production: this.fb.control("", Validators.required),
      guarantee: this.fb.control("", Validators.required)
    });
    this.information.push(informationForm);
  }

  public getInformationGroup(): FormGroup{
    return this.fb.group({
      availability: this.fb.control("", Validators.required),
      production: this.fb.control("", Validators.required),
      guarantee: this.fb.control("", Validators.required)
    });
  }
  
  public deleteInformation(informationIndex: number): void {
    this.information.removeAt(informationIndex);
  }

  public change(): void{
    this.child.nativeElement.value = "123";
  }
}
