import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  //Setup a property, an array of product
  products: Product[];

  //Inject our ProductService dependency here in product-list component
  constructor(private productService: ProductService) { }

  /*
  once an angular component is initialized
  they'll call the ngOnit method this is similar to PostConstruct
  */
  ngOnInit(): void {
    //This is where i'll add the hook to call my list products method
    this.listProducts();
  }

  listProducts() {
    /*
    inside use productService and call productList and subscribe to that data
    and then the method is actually invoked once subscribe
    */
    this.productService.getProductList().subscribe(
      //so this method will execute in an asynchronous fashion
      data => {
        //when the data is return we can assign it to our own property.
        //So in heresimply assign the result to our product Array.
        this.products = data;
      }
    )
  }

}
