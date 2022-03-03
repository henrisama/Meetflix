import isAuthaticated from '@/src/middlewares/isAuthanticated';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
	case 'GET':
		res
			.status(200)
			.json({
				success: true,
				message: 'authenticated user'
			});
		break;
		
	default:
		return res.status(405).send({ message: `Method ${req.method} not allowed` });
	}
};

export default isAuthaticated(handler);