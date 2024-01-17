import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {RegisterRequestInterface} from '../types/registerRequest.interface'
import { map, Observable } from 'rxjs'
import { environment } from 'src/environments/environment.development'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { AuthResponseInterface } from '../types/authResponse.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users'
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map((response) => response.user))
  }
}