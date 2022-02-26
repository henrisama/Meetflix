import type { NextApiRequest, NextApiResponse } from 'next';
import isAuthaticated from '@/src/middlewares/isAuthanticated';
import { addProfile, getProfile, delProfile, updProfile } from '@/src/controller/profiles';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
	case 'GET':
		await getProfile(req, res);
		break;
	case 'POST':
		await addProfile(req, res);
		break;
	case 'DELETE':
		await delProfile(req, res);
		break;
	case 'PUT':
		await updProfile(req,res);
		break;
	default:
		return res.status(405).send({ message: `Method ${req.method} not allowed` });
	}
};

export default handler;