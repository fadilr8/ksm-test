import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import ProductLine from './ProductLine';
import OrderDetail from './OrderDetail';

@Table({
  tableName: 'products',
  modelName: 'Product',
  timestamps: false,
})
class Product extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  productCode!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  productName!: string;

  @ForeignKey(() => ProductLine)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  productLine!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  productScale!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  productVendor!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  productDescription!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantityInStock!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  buyPrice!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  MSRP!: number;

  @HasMany(() => OrderDetail)
  orderDetails!: OrderDetail[];

  @BelongsTo(() => ProductLine)
  productLineObj!: ProductLine;
}

export default Product;
