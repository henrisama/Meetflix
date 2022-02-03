import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/src/models/users.models';

export const getProfile = async (
	req: NextApiRequest, 
	res: NextApiResponse
) => {
	if(req.query.id){

		const user = await User.find({ email: req.query.id })
			.then(function(user) {
				return user;
			});
		
		if(user.length === 0){
			res
				.status(404)
				.json({ 
					success: false,
					err: 'User not found'
				});
			return;
		}

		res
			.status(200)
			.json({ 
				success: true,
				data: user[0].profiles
			});
		return;

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