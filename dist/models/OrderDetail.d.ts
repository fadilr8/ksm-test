import { Model } from 'sequelize-typescript';
import Product from './Product';
declare class OrderDetail extends Model {
    orderNumber: number;
    productCode: string;
    quantityOrdered: number;
    priceEach: number;
    orderLineNumber: number;
    product: Product;
}
export default OrderDetail;
//# sourceMappingURL=OrderDetail.d.ts.map