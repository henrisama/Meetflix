import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

const isAuthaticated = (handler: NextApiHandler) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		let token;

		if(req.cookies && req.cookies.jwt){
			token = req.cookies.jwt;
		}

		if(!token){
			return res
				.status(401)
				.json({
					success: false,
					message: 'Please log in to get access'
				});
		}

		try{
			//verify token

			return handler(req, res);
		}catch(error){
			return res
				.status(500)
				.json({
					success: false,
					message: error
				});
		}
	};
};

export default isAuthaticated;