import type { NextApiRequest, NextApiResponse } from 'next';
import isAuthaticated from '@/src/middlewares/isAuthanticated';

const handler = (req: NextApiRequest, res: NextApiResponse) => {

	switch (req.method) {
	case 'GET':
			
		break;
	
	default:
		return res.status(405).send({ message: `Method ${req.method} not allowed` });
	}
};

export default isAuthaticated(handler);