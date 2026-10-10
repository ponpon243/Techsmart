import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
    { path: '', component: ProductsComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'cart', component: CartComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'product-detail/:id', component: ProductDetailComponent },
    { path: 'product-detail', component: ProductDetailComponent },
    { path: 'signin', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
