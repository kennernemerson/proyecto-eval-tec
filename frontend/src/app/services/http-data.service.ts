// http-data.servie.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Plan} from "../models/plan";

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {


  // API path
  base_path = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


  // Create a new item
  // @ts-ignore
  createItem(item): Observable<Plan> {
    return this.http
      .post<Plan>(this.base_path + '/planes', JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get single Plan data by ID
  // @ts-ignore
  getItem(id): Observable<Plan> {
    return this.http
      .get<Plan>(this.base_path + '/planes/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get Plans data
  getList(): Observable<Plan> {
    return this.http
      .get<Plan>(this.base_path+'/planes')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Update item by id
  // @ts-ignore
  updateItem(id, item): Observable<Plan> {
    return this.http
      .put<Plan>(this.base_path + '/planes/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Delete item by id
  // @ts-ignore
  deleteItem(id) {
    return this.http
      .delete<Plan>(this.base_path + '/planes/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}
