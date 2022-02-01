import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { NextPageContext } from 'next';


const isLogged = (context: NextPageContext): boolean => {
	const { res, req } = context;
	let result = true;

	if(!(req as any).cookies.jwt){
		// no token
		console.log('no token');
		result = false;
	}

	/* else if(!(req as any).session || !(req as any).session.user){
		// no user
		result = false;
	} */
	else{
		try {
			jwt.verify((req as any).cookies.jwt, process.env.TOKEN_SECRET as string);
		} catch (error) {
			result = false;
		}
	}

	return result;
};

export default isLogged;