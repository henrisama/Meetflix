import type { NextApiRequest, NextApiResponse } from 'next';
import isAuthaticated from '@/src/middlewares/isAuthanticated';
import { addWatched, delWatched, getWatched } from '@/src/controller/watched';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

	switch (req.method) {
	case 'GET':
		await getWatched(req,res);
		break;
	case 'POST':
		await addWatched(req.body.id, req, res);
		break;
	case 'DELETE':
		await delWatched(req.body.id, req, res);
		break;
	
	default:
		return res.status(405).send({ message: `Method ${req.method} not allowed` });
	}
};

export default isAuthaticated(handler);