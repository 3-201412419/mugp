import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

// .env 파일의 절대 경로 지정
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'zxasqw1!',
  database: process.env.MYSQL_DATABASE || 'mugp',
  logging: console.log, 
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    timestamps: true
  }
});

export const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database connected successfully');
    
    // force: true로 변경하여 테이블을 강제로 재생성
    await sequelize.sync({ force: true });
    console.log('Database synchronized - Tables created');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export default sequelize;
