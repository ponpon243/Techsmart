import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { OrderItemService } from '../service/order-item.service';
import { OrderItem } from '../model/order-item';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading: boolean = true;
  errorMessage: string = '';
  quantity: number = 1;
  addedToCart: boolean = false;
  isAdding: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private orderItemService: OrderItemService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || this.route.snapshot.queryParams['id'];
    if (id) {
      this.loadProduct(id);
    } else {
      this.loading = false;
      this.errorMessage = 'No product selected.';
    }
  }

  loadProduct(id: string): void {
    this.loading = true;
    this.productService.getProduct(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching product detail:', err);
        this.errorMessage = 'Product not found.';
        this.loading = false;
      }
    });
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (!this.product || this.isAdding) return;
    this.isAdding = true;

    const item: OrderItem = {
      productId: this.product.id,
      productName: this.product.name,
      imageUrl: this.product.imageUrl || this.product.image,
      price: this.product.price,
      quantity: this.quantity,
      uom: this.product.uom || 'pcs',
      status: 'IN_CART'
    };

    this.orderItemService.create(item).subscribe({
      next: (createdItem) => {
        this.isAdding = false;
        this.addedToCart = true;
        setTimeout(() => {
          this.addedToCart = false;
        }, 3000);
      },
      error: (err) => {
        console.error('Error adding item to cart:', err);
        this.isAdding = false;
        alert('Failed to add item to cart backend.');
      }
    });
  }

  backToProducts(): void {
    this.router.navigate(['/products']);
  }
}
