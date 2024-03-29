import type { NextApiRequest, NextApiResponse } from 'next';
import isAuthaticated from '@/src/middlewares/isAuthanticated';
import LogoutController from '@/src/controller/logout';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
	case 'GET':
		await LogoutController(req, res);
		break;
	default:
		return res.status(405).send({ message: `Method ${req.method} not allowed` });
	}
};

export default isAuthaticated(handler);