import type { NextApiRequest, NextApiResponse } from 'next';
import isAuthaticated from '@/src/middlewares/isAuthanticated';
import { Trending } from '@/src/controller/trending';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

	switch (req.method) {
	case 'GET':
		const response = await Trending();
		res
			.status(200)
			.json({
				success: true, 
				data: response
			});
		break;
	
	default:
		return res.status(405).send({ message: `Method ${req.method} not allowed` });
	}
};

export default isAuthaticated(handler);