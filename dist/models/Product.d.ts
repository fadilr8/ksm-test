import { Model } from 'sequelize-typescript';
import ProductLine from './ProductLine';
import OrderDetail from './OrderDetail';
declare class Product extends Model {
    productCode: string;
    productName: string;
    productLine: string;
    productScale: string;
    productVendor: string;
    productDescription: string;
    quantityInStock: number;
    buyPrice: number;
    MSRP: number;
    orderDetails: OrderDetail[];
    productLineObj: ProductLine;
}
export default Product;
//# sourceMappingURL=Product.d.ts.map