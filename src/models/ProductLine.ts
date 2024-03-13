import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import Product from './Product';

@Table({
  tableName: 'productlines',
  modelName: 'ProductLine',
  timestamps: false,
})
class ProductLine extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    allowNull: false,
  })
  productLine!: string;

  @Column({
    type: DataType.STRING(4000),
    allowNull: true,
  })
  textDescription!: string;

  @Column({
    type: DataType.TEXT('medium'),
    allowNull: true,
  })
  htmlDescription!: string;

  @Column({
    type: DataType.BLOB('medium'),
    allowNull: true,
  })
  image!: string;

  @HasMany(() => Product)
  products!: Product[];
}

export default ProductLine;
