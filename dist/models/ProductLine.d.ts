import { Model } from 'sequelize-typescript';
import Product from './Product';
declare class ProductLine extends Model {
    productLine: string;
    textDescription: string;
    htmlDescription: string;
    image: string;
    products: Product[];
}
export default ProductLine;
//# sourceMappingURL=ProductLine.d.ts.map