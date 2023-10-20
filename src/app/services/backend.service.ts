import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UsersParams } from "../users-params";

@Injectable({
  providedIn: "root",
})
export class BackendService {
  
  public users: Observable<any>[] = [];

  constructor(private readonly http: HttpClient){ }

  public getUsers$(): Observable<UsersParams>{
    const url = "/api/users?&select=firstName,password";
    return this.http.get<UsersParams>(url, { withCredentials: true });
  }

}