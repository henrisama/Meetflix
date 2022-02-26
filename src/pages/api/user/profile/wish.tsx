import type { NextApiRequest, NextApiResponse } from 'next';
import isAuthaticated from '@/src/middlewares/isAuthanticated';
import { addWish, delWish, getWish } from '@/src/controller/wish';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

	switch (req.method) {
	case 'GET':
		await getWish(req,res);
		break;
	case 'POST':
		await addWish(req.body.id, req, res);
		break;
	case 'DELETE':
		await delWish(req.body.id, req, res);
		break;
	default:
		return res.status(405).send({ message: `Method ${req.method} not allowed` });
	}
};

export default handler;