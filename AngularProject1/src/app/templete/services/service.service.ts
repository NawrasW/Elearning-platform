import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department, DepartmentLookupDto } from './department';
import { Status } from '../../models/status';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url: string = "https://localhost:7167/api/Department";
  constructor(private _httpClient: HttpClient) { }


  getAll(): Observable<Department[]> {
    return this._httpClient.get<Department[]>(`${this.url}/getAll`);

  }


  getAllDepartmentLookup(): Observable<DepartmentLookupDto[]> {
    return this._httpClient.get<DepartmentLookupDto[]>(`${this.url}/getAllDepartmentLookup`);

  }

  getById(id: number): Observable<Department> {
    return this._httpClient.get<Department>(`${this.url}/getById/${id}`);
  }


  addUpdate(department: Department): Observable<Status> {
    return this._httpClient.post<Status>(`${this.url}/AddUpdate`, department)
  }

  //edit(department: Department): Observable<any> {
  //  return this._httpClient.post<Status>(`${this.url}/AddUpdate`, department)
  //}
  delete(id: number): Observable<Status> {
    return this._httpClient.delete<Status>(`${this.url}/delete/${id}`)
  }
}
