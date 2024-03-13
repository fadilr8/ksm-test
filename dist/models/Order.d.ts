import { Model } from 'sequelize-typescript';
import OrderDetail from './OrderDetail';
declare class Order extends Model {
    orderNumber: string;
    orderDate: string;
    requiredDate: string;
    shippedDate: string;
    status: string;
    comments: string;
    customerNumber: number;
    orderDetails: OrderDetail[];
}
export default Order;
//# sourceMappingURL=Order.d.ts.map