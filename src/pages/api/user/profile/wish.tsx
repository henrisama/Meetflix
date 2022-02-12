import type { NextApiRequest, NextApiResponse } from 'next';
import isAuthaticated from '@/src/middlewares/isAuthanticated';
import { addWish, delWish, getWish } from '@/src/controller/wish';

const handler = (req: NextApiRequest, res: NextApiResponse) => {

	switch (req.method) {
	case 'GET':
		getWish(req,res);
		break;
	case 'POST':
		addWish(req.body.id, req, res);
		break;
	case 'DELETE':
		delWish(req.body.id, req, res);
		break;
	default:
		return res.status(405).send({ message: `Method ${req.method} not allowed` });
	}
};

export default isAuthaticated(handler);