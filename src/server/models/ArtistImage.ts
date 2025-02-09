import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import Artist from './Artist';

class ArtistImage extends Model {
  declare id: number;
  declare artistId: number;
  declare image: string;
  declare sort_order: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

ArtistImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'artists',
        key: 'id',
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sort_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'ArtistImage',
    tableName: 'artist_images',
  }
);

// Artist와의 관계 설정
Artist.hasMany(ArtistImage, {
  foreignKey: 'artistId',
  as: 'images',
});

ArtistImage.belongsTo(Artist, {
  foreignKey: 'artistId',
  as: 'artist',
});

export default ArtistImage;
