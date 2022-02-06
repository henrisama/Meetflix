import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/src/models/users.models';

export const getProfile = async (
	req: NextApiRequest, 
	res: NextApiResponse
) => {
	if(req.cookies.id_user){

		const user = await User.findById({ _id: req.cookies.id_user })
			.then(function(user) {
				return user;
			});

		console.log(user);
		
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
				data: user.profiles
			});
		return;

	}else{
		res
			.status(400)
			.json({
				success: false,
				err: 'Missing id user'
			});
	}
};

export const addProfile = async (
	req: NextApiRequest, 
	res: NextApiResponse
) => {
	const { id, name } = req.body;

	if(id && name){
		const user = await User.find({email: id})
			.then((value) => {
				return value;
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

		if(user[0].profiles.length >= 4){
			res
				.status(402)
				.json({ 
					success: false,
					err: 'Limit of only 4 profiles'
				});
			return;
		}

		try{
			user[0].profiles.push({
				name: name
			});

			await User.findOneAndUpdate({ 
				email: id 
			}, {
				profiles: user[0].profiles
			});
		}catch(err){
			res
				.status(502)
				.json({ 
					success: false,
					err: 'Could not create'
				});
			return;
		}

		res
			.status(200)
			.json({
				success: true,
				message: 'successfuly created'
			});
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
	const { id, id_profile } = req.body;

	if(id && (id_profile != undefined)){
		const user = await User.find({email: id})
			.then((value) => {
				return value;
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

		if(user[0].profiles.length === 0){
			res
				.status(402)
				.json({ 
					success: false,
					err: 'There is no profile'
				});
			return;
		}

		if(user[0].profiles[id_profile] == undefined){
			res
				.status(404)
				.json({ 
					success: false,
					err: 'Profile does not exist'
				});
			return;
		}

		try{
			user[0].profiles.splice(id_profile, 1);

			await User.findOneAndUpdate({ 
				email: id 
			}, {
				profiles: user[0].profiles 
			});
		}catch(err){
			res
				.status(502)
				.json({ 
					success: false,
					err: 'Could not create'
				});
			return;
		}

		res
			.status(200)
			.json({
				success: true,
				message: 'successfuly deleted'
			});
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
	const { id, id_profile, name } = req.body;

	if(id	&& id_profile	&& name){
		const user = await User.find({email: id})
			.then((value) => {
				return value;
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

		if(user[0].profiles.length === 0){
			res
				.status(402)
				.json({ 
					success: false,
					err: 'There is no profile'
				});
			return;
		}

		if(user[0].profiles[id_profile] == undefined){
			res
				.status(404)
				.json({ 
					success: false,
					err: 'Profile does not exist'
				});
			return;
		}

		try{
			user[0].profiles[id_profile].name = name;

			await User.findOneAndUpdate({ 
				email: id 
			}, {
				profiles: user[0].profiles 
			});
		}catch(err){
			res
				.status(502)
				.json({ 
					success: false,
					err: 'Could not update'
				});
			return;
		}

		res
			.status(200)
			.json({
				success: true,
				message: 'successfuly updated'
			});
	}else{
		res
			.status(400)
			.json({
				success: false,
				err: 'Missing data'
			});
	}
};