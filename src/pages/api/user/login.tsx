import LoginController from '@/src/controller/login';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	return new Promise(() => {
		switch (req.method) {
		case 'POST':
			console.log('test');
			LoginController(req,res);
			break;
		
		default:
			return res.status(405).send({ message: `Method ${req.method} not allowed` });
		}
	});
};

export default handler;