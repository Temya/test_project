import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PaginationData } from "../interface/pagination-data";
import { ProductFileConfig, Products } from "../interface/products";
import { UsersParams } from "../interface/users-params";

@Injectable({
  providedIn: "root",
})
export class BackendService {
  
  constructor(private readonly http: HttpClient){ }

  public getUsers$(): Observable<UsersParams> {
    const url = "/api/users?&select=firstName,password";
    return this.http.get<UsersParams>(url, { withCredentials: true });
  }

  public getProducts$(val: PaginationData): Observable<Products> {
    if (val.limit === "0" || val.limit === "")
      { val.limit = "10";}
    const url = `/api/products?limit=${val.limit}&skip=${val.page}&select=${ProductFileConfig.join(",")}`;
    return this.http.get<Products>(url, { withCredentials: true });
  }

  public gerSearchProduct$(word: string): Observable<Products> {
    const url = `/api/products/search?q=${word}`;
    return this.http.get<Products>(url, { withCredentials: true});
  }
}

// /api/products?&select=id,title,description,price,brand,category
