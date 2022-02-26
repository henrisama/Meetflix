import type { NextApiRequest, NextApiResponse } from 'next';
import SignUpController from '@/src/controller/signup';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	return new Promise(async (resolve, reject) => {
		switch (req.method) {
		case 'POST':
			await SignUpController(req, res);
			break;
		
		default:
			return res.status(405).send({ message: `Method ${req.method} not allowed` });
		}
		resolve('OK');
	});
};

export default handler;