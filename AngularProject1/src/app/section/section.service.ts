import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SectionData, SectionForAddUpdate } from '../models/section';
import { Status } from '../models/status';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {


  url: string = "https://localhost:7167/api/Section";
  constructor(private _httpClient: HttpClient) { }


  addSection(section: SectionForAddUpdate): Observable<Status> {
    return this._httpClient.post<Status>(`${this.url}/addSection`, section)
  }

  updateSection(section: SectionForAddUpdate): Observable<Status> {
    return this._httpClient.put<Status>(`${this.url}/updateSection`, section)
  }


  getAllSection(): Observable<SectionData[]> {
    return this._httpClient.get<SectionData[]>(`${this.url}/getAll`);

  }


  getSectionById(id: number): Observable<SectionData> {
    return this._httpClient.get<SectionData>(`${this.url}/getById/${id}`);
  }

 

  deleteSection(id: number): Observable<Status> {
    return this._httpClient.delete<Status>(`${this.url}/delete/${id}`)
  }



  getSectionByCourseId(courseId: number): Observable<SectionData[]> {
    return this._httpClient.get<SectionData[]>(`${this.url}/getSectionByCourseId/${courseId}`);
  }

}
