import { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  ssl: {
    rejectUnauthorized: true
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('API Route accessed:', req.method, req.url);
  console.log('Environment variables:', {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
  });

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Attempting to create database connection...');
    const connection = await mysql.createConnection(dbConfig);
    console.log('Database connection established successfully');
    
    let query = 'SELECT * FROM artists WHERE isActive = true';
    const category = req.query.category;
    
    if (category) {
      query += ' AND category = ?';
      console.log('Executing query:', query, 'with category:', category);
      const [rows] = await connection.execute(query, [category]);
      await connection.end();
      console.log('Query results:', rows);
      return res.status(200).json(rows);
    }

    console.log('Executing query:', query);
    const [rows] = await connection.execute(query);
    await connection.end();
    console.log('Query results:', rows);
    return res.status(200).json(rows);
    
  } catch (error) {
    console.error('Database error details:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      sqlMessage: error.sqlMessage
    });
    return res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message,
      code: error.code
    });
  }
}