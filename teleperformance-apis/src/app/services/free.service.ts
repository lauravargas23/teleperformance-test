import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FreeService {

  img: String = "";
  readonly URL_API = 'http://localhost:3100/api/free';

  constructor(private http: HttpClient) {
    this.img = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fes%2Fsearch%2Fimg%2Bicon&psig=AOvVaw1t-EG8zeppku4UH9HWrjl1&ust=1619679628507000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJDw-_muoPACFQAAAAAdAAAAABAD";
  }

  getDog() {
    return this.http.get(this.URL_API);
  }

}
