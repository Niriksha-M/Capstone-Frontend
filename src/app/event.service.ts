import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8080/events';

  constructor(private http: HttpClient) {}

  getEventRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/requests`);
  }

  approveEvent(eventId: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/approve/${eventId}`, {});
  }

  rejectEvent(eventId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/reject/${eventId}`);
  }
}
