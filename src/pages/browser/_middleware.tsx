import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const middleware = (req: NextRequest) => {
	const url = req.nextUrl.clone();

	if(!req.cookies.jwt){
		url.pathname = '/login';
		return NextResponse.rewrite(url);
	}

	try {
		jwt.verify(req.cookies.jwt, process.env.TOKEN_SECRET as string);
	} catch (error) {
		url.pathname = '/login';
		return NextResponse.rewrite(url);
	}

	NextResponse.next();
};

export default middleware;