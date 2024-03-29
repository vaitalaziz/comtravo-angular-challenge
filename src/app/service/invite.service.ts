import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class InviteService {
  private readonly url = 'http://localhost:3000/users';

  public internalError: string[] = [];
  public existsEmail: string[] = []
  public successfulInvitation = 0;

  constructor(private http: HttpClient) { }

  get(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  invite(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }
}
