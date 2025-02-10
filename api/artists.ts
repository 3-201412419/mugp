import { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';


console.log('All environment variables:', {
  MYSQLHOST: process.env.MYSQLHOST,
  MYSQLPORT: process.env.MYSQLPORT,
  MYSQLUSER: process.env.MYSQLUSER,
  MYSQLDATABASE: process.env.MYSQLDATABASE,
  // 비밀번호는 보안을 위해 존재 여부만 로깅
  MYSQLPASSWORD_EXISTS: !!process.env.MYSQLPASSWORD
});

const dbConfig = {
  host: process.env.MYSQLHOST,
  port: parseInt(process.env.MYSQLPORT || '3306'),
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  ssl: {
    rejectUnauthorized: false
  }
};

console.log('Database configuration:', {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  database: dbConfig.database,
  // 비밀번호는 보안을 위해 로깅하지 않음
  ssl: dbConfig.ssl
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 환경 변수 로깅
  console.log('Database Config:', {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    database: process.env.MYSQLDATABASE
  });

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  let connection;
  try {
    // 1. 데이터베이스 연결 시도
    console.log('Attempting to connect to database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('Database connection successful');

    // 2. 테이블 존재 여부 확인
    const [tables] = await connection.query('SHOW TABLES');
    console.log('Available tables:', tables);

    // 3. artists 테이블 구조 확인
    const [columns] = await connection.query('SHOW COLUMNS FROM artists');
    console.log('Artists table structure:', columns);

    // 4. 간단한 쿼리 실행
    const categoryParam = req.query.category;
    let query = 'SELECT * FROM artists';
    let params: string[] = [];
    
    if (categoryParam) {
        // 배열인 경우 첫 번째 값만 사용
        const category = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;
        query += ' WHERE category = ?';
        params.push(category);
    }

    console.log('Executing query:', query, 'with params:', params);
    const [rows] = await connection.execute(query, params);
    console.log('Query results:', rows);

    return res.status(200).json(rows);
  } catch (error) {
    console.error('Full error object:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      sqlMessage: error.sqlMessage,
      sql: error.sql
    });

    return res.status(500).json({
      message: 'Database error',
      error: error.message,
      code: error.code,
      sqlMessage: error.sqlMessage
    });
  } finally {
    if (connection) {
      try {
        await connection.end();
        console.log('Database connection closed');
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}