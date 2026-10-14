import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../model/order';
import { OrderItem } from '../model/order-item';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiServerUrl}/api/order`);
  }

  public getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiServerUrl}/api/order/${id}`);
  }

  public create(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiServerUrl}/api/order`, order);
  }

  public checkout(items: OrderItem[], orderDetails?: Partial<Order>): Observable<Order> {
    const payload = {
      order: orderDetails || { customerName: 'Guest Customer', orderStatus: 'COMPLETED' },
      items: items
    };
    return this.http.post<Order>(`${this.apiServerUrl}/api/order/checkout`, payload);
  }

  public update(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiServerUrl}/api/order`, order);
  }
}
