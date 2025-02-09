import { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    
    let query = 'SELECT * FROM artists';
    const category = req.query.category;
    
    if (category) {
      query += ' WHERE category = ?';
      const [rows] = await connection.execute(query, [category]);
      await connection.end();
      return res.status(200).json(rows);
    }

    const [rows] = await connection.execute(query);
    await connection.end();
    return res.status(200).json(rows);
    
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
