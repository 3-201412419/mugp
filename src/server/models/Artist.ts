import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';

export interface ArtistAttributes {
  id: number;
  name: string;
  category: 'influencer' | 'mc' | 'creator';
  description: string;
  image: string;
  isActive: boolean;
  sort_order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ArtistCreationAttributes extends Optional<ArtistAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Artist extends Model<ArtistAttributes, ArtistCreationAttributes> implements ArtistAttributes {
  public id!: number;
  public name!: string;
  public category!: 'influencer' | 'mc' | 'creator';
  public description!: string;
  public image!: string;
  public isActive!: boolean;
  public sort_order!: number;
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
      type: DataTypes.ENUM('influencer', 'mc', 'creator'),
      allowNull: false,
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
    sort_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
