import LoginController from '@/src/controller/login';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
	case 'POST':
		console.log(req.body);
		await LoginController(req,res);
		break;
		
	default:
		return res.status(405).send({ message: `Method ${req.method} not allowed` });
	}
};

export default handler;