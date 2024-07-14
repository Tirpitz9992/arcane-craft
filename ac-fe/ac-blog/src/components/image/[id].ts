import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const response = await axios.get(`http://localhost:8080/image/${id}`);
    res.status(200).send(response.data);
};