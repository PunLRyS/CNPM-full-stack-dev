import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
  } from 'sequelize-typescript';
  
  @Table({ tableName: 'payments' })
  export class Payment extends Model {
    @Column({
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    })
    id: string;
  
    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    amount: number;
  
    @Column({ type: DataType.STRING, allowNull: false })
    currency: string;
  
    @Column({ type: DataType.STRING, allowNull: false })
    paymentMethod: string;
  
    @Column({ type: DataType.STRING, allowNull: true })
    description: string;
  
    @Column({ type: DataType.STRING, allowNull: false })
    customerId: string;
  
    @Column({ type: DataType.STRING, allowNull: false })
    status: string;
  
    @Column({ type: DataType.STRING, allowNull: true })
    transactionId: string;
  
    @CreatedAt
    createdAt: Date;
  
    @UpdatedAt
    updatedAt: Date;

    @Column({ type: DataType.STRING, allowNull: true })
    agencyName: string;

    @Column({ type: DataType.STRING, allowNull: true })
    agencyCode: string;
  }