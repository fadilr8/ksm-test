import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import OrderDetail from './OrderDetail';

@Table({
  tableName: 'orders',
  modelName: 'order',
  timestamps: false,
})
class Order extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  orderNumber!: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  orderDate!: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  requiredDate!: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  shippedDate!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  comments!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customerNumber!: number;

  @HasMany(() => OrderDetail)
  orderDetails!: OrderDetail[];
}

export default Order;
