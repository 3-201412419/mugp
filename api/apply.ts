import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // 백엔드 서버로 요청 전달
    const response = await axios.post(process.env.BACKEND_URL + '/api/apply', req.body, {
      headers: {
        ...req.headers,
        host: undefined,
        'content-length': undefined,
      },
    });

    return res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error('Error forwarding request:', error);
    return res.status(error.response?.status || 500).json({
      message: 'Error processing request',
      error: error.response?.data || error.message,
    });
  }
}
