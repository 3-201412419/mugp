import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

export interface ArtistAttributes {
  id?: number;
  name: string;
  category: string;
  description: string;
  image: string;
  isActive: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

class Artist extends Model<ArtistAttributes> implements ArtistAttributes {
  public id!: number;
  public name!: string;
  public category!: string;
  public description!: string;
  public image!: string;
  public isActive!: boolean;
  public order!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Artist.init(
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
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['influencer', 'mc', 'creator']],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Artist',
    tableName: 'artists',
  }
);

export default Artist;
