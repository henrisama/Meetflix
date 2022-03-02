import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const middleware = (req: NextRequest) => {
	const url = req.nextUrl.clone();

	if(!req.cookies.jwt){
		return NextResponse.next();
	}

	try {
		jwt.verify(req.cookies.jwt, process.env.TOKEN_SECRET as string);
		url.pathname = '/browser/1';
		return NextResponse.redirect(url);
	} catch (error) {
		return NextResponse.next();
	}
};

export default middleware;