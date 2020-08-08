import { Subcategory } from './subcategory';
import { Category } from './category';

export interface Product {
    id: number;
    name: string;
    subcategory: Subcategory;
    category: Category;
}