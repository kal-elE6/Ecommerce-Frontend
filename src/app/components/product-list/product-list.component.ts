import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list-table.component.html',
  //templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  //Setup a property, an array of product
  products: Product[];
  currentCategoryId: number;
  currentCategoryName: string;
  searchMode: boolean;
  //Inject our ProductService dependency here in product-list component
  constructor(private productService: ProductService,
              private route:ActivatedRoute) { }

  /*
  once an angular component is initialized
  they'll call the ngOnit method this is similar to PostConstruct
  */
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
    //This is where i'll add the hook to call my list products method
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else{

    this.handleListProducts();

    }

  }

  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    //  now search for products using keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  handleListProducts() {
    //check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');

      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name');
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    /*
    inside use productService and call productList and subscribe to that data
    and then the method is actually invoked once subscribe
    */

    //now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      //so this method will execute in an asynchronous fashion
      data => {
        //when the data is return we can assign it to our own property.
        //So in heresimply assign the result to our product Array.
        this.products = data;
      }
    )

  }

}
