import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Order } from '../model/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  loading: boolean = true;
  expandedOrders: { [key: number]: boolean } = {};

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.orderService.getAll().subscribe({
      next: (data) => {
        this.orders = data || [];
        this.loading = false;
        if (this.orders.length > 0 && this.orders[0].id !== undefined) {
          this.expandedOrders[this.orders[0].id] = true;
        }
      },
      error: (err) => {
        console.error('Error loading order history:', err);
        this.loading = false;
      }
    });
  }

  toggleExpand(orderId: number | undefined): void {
    if (orderId === undefined) return;
    this.expandedOrders[orderId] = !this.expandedOrders[orderId];
  }

  isExpanded(orderId: number | undefined): boolean {
    if (orderId === undefined) return false;
    return !!this.expandedOrders[orderId];
  }

  getTotalSpent(): number {
    return this.orders.reduce((sum, o) => sum + (o.totalAmount || this.getOrderTotal(o)), 0);
  }

  getOrderTotal(order: Order): number {
    if (order.totalAmount !== undefined && order.totalAmount !== null && order.totalAmount > 0) {
      return order.totalAmount;
    }
    if (order.items) {
      return order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    return 0;
  }
}
