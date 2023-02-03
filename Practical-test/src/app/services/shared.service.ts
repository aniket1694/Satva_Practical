import { OrderDetails } from '../model/orderDetails';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
urlPath:string = "https://localhost:7283/api/Order"
constructor(private http: HttpClient) { }

getOrderDetails():Observable<any[]>{
 return this.http.get<any>(this.urlPath).pipe(catchError(this.errorhandler));
}
saveOrderDetails(data: OrderDetails):Observable<OrderDetails> {
  return this.http.post<OrderDetails>(this.urlPath,data)
    .pipe(catchError(this.errorhandler));
 }
errorhandler(error:HttpErrorResponse){
  return throwError(() => new Error(error.message ||"Server Error"))
}
}
