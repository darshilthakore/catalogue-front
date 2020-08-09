import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Product } from '../shared/product';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { Category } from '../shared/category';
import { Subcategory } from '../shared/subcategory';
import { newProd } from '../shared/newProd';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  products: Product[];
  categories: Category[];
  subcategories: Subcategory[];
  displayedColumns: string[] = ['selection', 'name', 'subcategory_name', 'category_name'];
  dataSource: MatTableDataSource<Product>

  hidden = true;

  public newName = "";
  public newCategory;
  public newSubcategory;


  @ViewChild(MatSort, {static:true}) sort: MatSort;
  @ViewChild(MatTable, {static:true}) table: MatTable<any>;

  constructor(
    private router: Router,
    private apiService: ApiService,
    @Inject('BaseURL')public BaseURL) { }

  ngOnInit(): void {
    this.apiService.mysubject.subscribe(
      () => {
        this.getProducts();
      }
    );
    this.getProducts();
    this.getCategories();
    this.getSubcategories();

  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;    
  }

  toggleHidden() {
    this.hidden = !(this.hidden);
  }

  getProducts() {
    this.apiService.getProducts().subscribe(
      response => {
        console.log("Products: ", response);
        this.products = response;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
      }
    );
  }

  getCategories() {
    this.apiService.getCategories().subscribe(
      response => {
        console.log("Categories: ", response);
        this.categories = response;
      }
    );
  }

  getSubcategories() {
    this.apiService.getSubcategories().subscribe(
      response => {
        console.log("Subcategories: ", response);
        this.subcategories = response;
      }
    );
  }

  addNewProd() {
    let newProduct = new newProd();
    newProduct.name = this.newName;
    newProduct.category = this.newCategory;
    newProduct.subcategory = this.newSubcategory;
    console.log("new prod",newProduct);
    // this.dataSource.data.push(newProduct);
    // console.log(this.dataSource.data);
    // this.table.renderRows();

    this.apiService.addProduct(newProduct).subscribe(
      response => {
        console.log(response);
        this.apiService.mysubject.next("Product added");
      }
    )
    

  }
}
