import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

// 유효한 카테고리 값들
export const VALID_CATEGORIES = ['influencer', 'creator', 'mc'] as const;
export type ApplyCategory = typeof VALID_CATEGORIES[number];

// 유효한 상태 값들
export const VALID_STATUSES = ['pending', 'reviewing', 'accepted', 'rejected'] as const;
export type ApplyStatus = typeof VALID_STATUSES[number];

export interface ApplyAttributes {
  id?: number;
  name: string;
  email: string;
  phone: string;
  category: ApplyCategory;
  message?: string;
  portfolioUrl?: string | null;
  notionPageId?: string | null;
  status?: ApplyStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

class Apply extends Model<ApplyAttributes> implements ApplyAttributes {
  declare id: number;
  declare name: string;
  declare email: string;
  declare phone: string;
  declare category: ApplyCategory;
  declare message: string;
  declare portfolioUrl: string | null;
  declare notionPageId: string | null;
  declare status: ApplyStatus;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
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
        isIn: [VALID_CATEGORIES],
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
    notionPageId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
      validate: {
        isIn: [VALID_STATUSES],
      },
    }
  },
  {
    sequelize,
    modelName: 'Apply',
    tableName: 'applies',
  }
);

export default Apply;
