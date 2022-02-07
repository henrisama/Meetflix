import { NextApiRequest, NextApiResponse } from 'next';
import User from '@/src/models/users.models';

export const getProfile = async (
	req: NextApiRequest, 
	res: NextApiResponse
) => {
	const { id_user } = req.cookies;

	if(id_user){
		const user = await User.findById({ _id: id_user })
			.then(function(user) {
				return user;
			})
			.catch(() => {
				return null;
			});
		
		if(!user){
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
	const { name } = req.body;
	const { id_user } = req.cookies;

	if(id_user && name){
		const user = await User.findById({ _id: id_user })
			.then(function(user) {
				return user;
			})
			.catch(() => {
				return null;
			});

		if(!user){
			res
				.status(404)
				.json({ 
					success: false,
					err: 'User not found'
				});
			return;
		}

		if(user.profiles.length >= 4){
			res
				.status(402)
				.json({ 
					success: false,
					err: 'Limit of only 4 profiles'
				});
			return;
		}

		try{
			user.profiles.push({
				name: name
			});

			await User.findByIdAndUpdate({ 
				_id: id_user 
			}, {
				profiles: user.profiles
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
				message: 'Successfuly created'
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
	const { id_profile } = req.body;
	const { id_user } = req.cookies;

	if(id_user && (id_profile != undefined)){
		const user = await User.findById({ _id: id_user })
			.then(function(user) {
				return user;
			})
			.catch(() => {
				return null;
			});

		if(!user){
			res
				.status(404)
				.json({ 
					success: false,
					err: 'User not found'
				});
			return;
		}

		if(user.profiles.length === 0){
			res
				.status(402)
				.json({ 
					success: false,
					err: 'There is no profile'
				});
			return;
		}

		if(user.profiles[id_profile] == undefined){
			res
				.status(404)
				.json({ 
					success: false,
					err: 'Profile does not exist'
				});
			return;
		}

		try{
			user.profiles.splice(id_profile, 1);

			await User.findByIdAndUpdate({ 
				_id: id_user 
			}, {
				profiles: user.profiles 
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
				message: 'Successfuly deleted'
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
	const { id_profile, name } = req.body;
	const { id_user } = req.cookies;

	if(id_user	&& (id_profile != undefined)	&& name){
		const user = await User.findById({ _id: id_user })
			.then(function(user) {
				return user;
			})
			.catch(() => {
				return null;
			});

		if(!user){
			res
				.status(404)
				.json({ 
					success: false,
					err: 'User not found'
				});
			return;
		}

		if(user.profiles.length === 0){
			res
				.status(402)
				.json({ 
					success: false,
					err: 'There is no profile'
				});
			return;
		}

		if(user.profiles[id_profile] == undefined){
			res
				.status(404)
				.json({ 
					success: false,
					err: 'Profile does not exist'
				});
			return;
		}

		try{
			user.profiles[id_profile].name = name;

			await User.findByIdAndUpdate({ 
				_id: id_user
			}, {
				profiles: user.profiles 
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
				message: 'Successfuly updated'
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