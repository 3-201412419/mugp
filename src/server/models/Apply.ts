import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

export interface ApplyAttributes {
  id?: number;
  name: string;
  email: string;
  phone: string;
  category: string;
  message?: string;
  portfolioUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Apply extends Model<ApplyAttributes> implements ApplyAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public category!: string;
  public message!: string;
  public portfolioUrl!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Apply.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['influencer', 'mc', 'creator']],
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    portfolioUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Apply',
    tableName: 'applies',
  }
);

export default Apply;
