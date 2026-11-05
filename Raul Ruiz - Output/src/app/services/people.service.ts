import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PeopleResponse } from '../models/people';

@Injectable({ providedIn: 'root' })
export class PeopleService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://swapi.dev/api/people';

  getPeople(page = 1): Observable<PeopleResponse> {
    return this.http.get<PeopleResponse>(`${this.apiUrl}/?page=${page}`);
  }
}
