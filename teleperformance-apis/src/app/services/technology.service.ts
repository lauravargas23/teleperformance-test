import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Technology } from '../models/technology';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  selectedTechnology: Technology;
  technologies: Technology[] = [];
  token: string;
  readonly URL_API = 'http://localhost:3000/api/users/technologies';

  constructor(private http: HttpClient) {
    this.selectedTechnology = new Technology();
    this.technologies = [];
    this.token = "";
  }

  getTechnologies(): Observable<Technology[]>{
    this.getToken();
    return this.http.get<Technology[]>(this.URL_API + '?secret_token=' + this.token);
  }

  postTechnology(Technology: Technology) {
    return this.http.post(this.URL_API + '?secret_token=' + this.token, Technology);
  }

  putTechnology(Technology: Technology) {
    return this.http.put(this.URL_API + `/${Technology._id}` + '?secret_token=' + this.token, Technology);
  }

  deleteTechnology(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}` + '?secret_token=' + this.token);
  }

  getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN') || '{}';
    }
    return this.token;
  }

}
