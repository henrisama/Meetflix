import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/src/models/users.models';

export const getProfile = async (
	req: NextApiRequest, 
	res: NextApiResponse
) => {
	if(req.body.id){
		
	}else{
		res
			.status(400)
			.json({
				success: false,
				err: 'Missing data'
			});
	}
};

export const addProfile = async (
	req: NextApiRequest, 
	res: NextApiResponse
) => {
	if(req.body.id){
		
	}else{
		res
			.status(400)
			.json({
				success: false,
				err: 'Missing data'
			});
	}
};

export const delProfile = async (
	req: NextApiRequest, 
	res: NextApiResponse
) => {
	if(req.body.id){
		
	}else{
		res
			.status(400)
			.json({
				success: false,
				err: 'Missing data'
			});
	}
};

export const updProfile = async (
	req: NextApiRequest, 
	res: NextApiResponse
) => {
	if(req.body.id){
		
	}else{
		res
			.status(400)
			.json({
				success: false,
				err: 'Missing data'
			});
	}
};