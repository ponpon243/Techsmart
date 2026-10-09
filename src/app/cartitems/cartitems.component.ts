import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderItemService } from '../service/order-item.service';
import { OrderService } from '../service/order.service';
import { OrderItem } from '../model/order-item';

@Component({
  selector: 'app-cartitems',
  templateUrl: './cartitems.component.html',
  styleUrls: ['./cartitems.component.css']
})
export class CartitemsComponent implements OnInit {
  cartItems: OrderItem[] = [];
  loading: boolean = true;
  checkoutSuccess: boolean = false;

  constructor(
    private orderItemService: OrderItemService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.loading = true;
    this.orderItemService.getOrderItems().subscribe({
      next: (data) => {
        this.cartItems = data || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading cart items:', err);
        this.loading = false;
      }
    });
  }

  increaseQuantity(item: OrderItem): void {
    item.quantity++;
    if (item.id) {
      this.orderItemService.update(item).subscribe();
    }
  }

  decreaseQuantity(item: OrderItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      if (item.id) {
        this.orderItemService.update(item).subscribe();
      }
    }
  }

  removeItem(item: OrderItem): void {
    if (item.id) {
      this.orderItemService.deleteOrderItem(item.id).subscribe({
        next: () => {
          this.cartItems = this.cartItems.filter(i => i.id !== item.id);
        }
      });
    }
  }

  clearCart(): void {
    this.orderItemService.clearCart().subscribe({
      next: () => {
        this.cartItems = [];
      }
    });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  checkout(): void {
    if (this.cartItems.length === 0) return;
    
    this.orderService.checkout(this.cartItems).subscribe({
      next: () => {
        this.cartItems = [];
        this.checkoutSuccess = true;
        this.router.navigate(['/orders']);
      },
      error: (err) => {
        console.error('Error during checkout:', err);
      }
    });
  }
}
