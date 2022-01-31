import type { NextApiRequest, NextApiResponse } from 'next';
import SignUpController from '@/src/controller/singup';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	return new Promise(() => {
		switch (req.method) {
		case 'POST':
			SignUpController(req, res);
			break;
		
		default:
			return res.status(405).send({ message: `Method ${req.method} not allowed` });
		}
	});
};

export default handler;