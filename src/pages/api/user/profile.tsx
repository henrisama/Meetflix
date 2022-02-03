import type { NextApiRequest, NextApiResponse } from 'next';
import isAuthaticated from '@/src/middlewares/isAuthanticated';
import { addProfile, getProfile, delProfile, updProfile } from '@/src/controller/profile';

const handler = (req: NextApiRequest, res: NextApiResponse) => {

	switch (req.method) {
	case 'GET':
		getProfile(req, res);
		break;
	case 'POST':
		addProfile(req, res);
		break;
	case 'DELETE':
		delProfile(req, res);
		break;
	case 'PUT':
		updProfile(req,res);
		break;
	default:
		return res.status(405).send({ message: `Method ${req.method} not allowed` });
	}
};

export default isAuthaticated(handler);