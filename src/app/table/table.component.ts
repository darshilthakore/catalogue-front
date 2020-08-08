import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Product } from '../shared/product';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  products: Product[];
  displayedColumns: string[] = ['name', 'subcat', 'cat'];

  @ViewChild(MatSort, {static:true}) sort: MatSort;

  constructor(
    private router: Router,
    private apiService: ApiService,
    @Inject('BaseURL')public BaseURL) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getSubcategories();
  }

  getProducts() {
    this.apiService.getProducts().subscribe(
      response => {
        console.log("Products: ", response);
        this.products = response;
      }
    );
  }

  getCategories() {
    this.apiService.getCategories().subscribe(
      response => {
        console.log("Categories: ", response);
      }
    );
  }

  getSubcategories() {
    this.apiService.getSubcategories().subscribe(
      response => {
        console.log("Subcategories: ", response);
      }
    );
  }
}
