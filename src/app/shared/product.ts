import { Subcategory } from './subcategory';
import { Category } from './category';

export class Product {
    id: number;
    name: string;
    subcategory: Subcategory;
    category: Category;
}