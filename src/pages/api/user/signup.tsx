import type { NextApiRequest, NextApiResponse } from 'next';
import SignUpController from '@/src/controller/signup';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
	case 'POST':
		await SignUpController(req, res);
		break;
		
	default:
		return res.status(405).send({ message: `Method ${req.method} not allowed` });
	}
};

export default handler;