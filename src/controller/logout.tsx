import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

const LogoutController = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		res.setHeader('Set-Cookie', [
			cookie.serialize(
				'jwt',
				'',
				{
					httpOnly: true,
					secure: process.env.NODE_ENV !== 'development',
					maxAge: -1,
					sameSite: 'strict',
					domain: process.env.NODE_ENV === 'development'? 'http://localhost:3000' : 'https://meetflix.vercel.app',
					path: '/'
				}
			),
			cookie.serialize(
				'id_user',
				'',
				{
					httpOnly: true,
					secure: process.env.NODE_ENV !== 'development',
					maxAge: -1,
					sameSite: 'strict',
					domain: process.env.NODE_ENV === 'development'? 'http://localhost:3000' : 'https://meetflix.vercel.app',
					path: '/'
				}
			),
			cookie.serialize(
				'id_profile',
				'',
				{
					httpOnly: true,
				  secure: process.env.NODE_ENV !== 'development',
					maxAge: -1,
					sameSite: 'strict',
					domain: process.env.NODE_ENV === 'development'? 'http://localhost:3000' : 'https://meetflix.vercel.app',
					path: '/'
				}
			)
		]);


		res
			.status(200)
			.json({
				success: true
			});
		return;

	} catch (error) {
		res
			.status(500)
			.json({
				success: false,
				err: error
			});
		return;
	}
};

export default LogoutController;