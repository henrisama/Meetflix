import type { NextApiRequest, NextApiResponse } from 'next';
import isAuthaticated from '@/src/middlewares/isAuthanticated';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'DELETE') {
		return res.status(405).send({ message: 'Only DELETE requests allowed' });
	}

	console.log(req.body);
	return;
};

export default isAuthaticated(handler);