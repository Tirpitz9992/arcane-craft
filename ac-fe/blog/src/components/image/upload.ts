import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const response = await axios.post('http://localhost:8080/upload', req.body, {
            headers: {
                'Content-Type': req.headers['content-type'] || ''
            }
        });
        res.status(200).json(response.data);
    } else {
        res.status(405).end(); // Method Not Allowed
    }
};