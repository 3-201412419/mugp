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
  logging: false,
});

export const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database connected successfully');
    
    // 테이블 자동 생성
    await sequelize.sync({ alter: true });
    console.log('Database synchronized - Tables created');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

export default sequelize;
