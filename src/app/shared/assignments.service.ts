import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin as rxjsForkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  backendUrl = 'https://apiangularm12024.onrender.com/api/assignments';

  constructor(
    private loggingService: LoggingService,
    private http: HttpClient
  ) {}

  getAssignments(): Observable<any> {
    return this.http.get<any>(this.backendUrl);
  }

  getAssignment(id: number): Observable<any> {
    return this.http.get<any>(this.backendUrl + '/' + id);
  }

  addAssignment(assignment: Assignment): Observable<any> {
    return this.http.post<Assignment>(this.backendUrl, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    return this.http.put<Assignment>(this.backendUrl, assignment);
  }

  getAssignmentsPagine(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/?page=${page}&limit=${limit}`);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    return this.http.delete<Assignment>(`${this.backendUrl}/${assignment._id}`);
  }

  addMultipleAssignments(assignments: any[]): Observable<any> {
    const requests = assignments.map((assignment) =>
      this.http.post(this.backendUrl, assignment)
    );
    return this.forkJoin(requests);
  }

  forkJoin(requests: Observable<Object>[]): Observable<any> {
    return rxjsForkJoin(requests);
  }
}
