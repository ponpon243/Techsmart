import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderItem } from '../model/order-item';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public create(orderItem: OrderItem): Observable<OrderItem> {
    return this.http.post<OrderItem>(`${this.apiServerUrl}/api/order-item`, orderItem);
  }

  public update(orderItem: OrderItem): Observable<OrderItem> {
    return this.http.put<OrderItem>(`${this.apiServerUrl}/api/order-item`, orderItem);
  }

  public getOrderItems(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.apiServerUrl}/api/order-item`);
  }

  public deleteOrderItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/order-item/${id}`);
  }

  public clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/api/order-item`);
  }
}