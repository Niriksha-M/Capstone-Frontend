import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:9090/api/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/authenticate`, { userId: username, password })
      .pipe(catchError(this.handleError));
  }

  registerEmployee(employee: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/registeremployee`, employee)
      .pipe(catchError(this.handleError));
  }

  registerAdmin(admin: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/registeradmin`, admin)
      .pipe(catchError(this.handleError));
  }

  registerResourcePerson(resourcePerson: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register-resource-person`, resourcePerson)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
