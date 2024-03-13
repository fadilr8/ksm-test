import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Product from './Product';
import Order from './Order';

@Table({
  tableName: 'orderdetails',
  modelName: 'OrderDetail',
  timestamps: false,
})
class OrderDetail extends Model {
  @ForeignKey(() => Order)
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  orderNumber!: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  productCode!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantityOrdered!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  priceEach!: number;

  @Column({
    type: DataType.SMALLINT,
    allowNull: false,
  })
  orderLineNumber!: number;

  @BelongsTo(() => Product)
  product!: Product;
}

export default OrderDetail;
