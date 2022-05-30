import { NextApiRequest, NextApiResponse } from 'next';
import getMovieSerie from 'public/js/getMovieSerie';
import User from '../models/users.models';

export const getWatched = async (
	req: NextApiRequest, 
	res: NextApiResponse
): Promise<void> => {
	const { id_user, id_profile } = req.cookies;

	if(id_user && id_profile){
		const user = await User.findById({
			 _id: id_user 
		}).then(async function (user){
			if(!user){
				res
					.status(404)
					.json({ 
						success: false,
						message: 'User not found (watched list)'
					});
				return null;
			}
			return user;
		}).catch(function (err){
			res
				.status(502)
				.json({ 
					success: false,
					message: 'Error getting watched list in mongodb (watched list)'
				});
			return null;
		});

		if(!user){ return;	}

		var watched_list = [];

		try{
			const watchedList: Array<number> = user
				.profiles[Number(id_profile)]
				.list
				.watched;
	
			for(const item of watchedList){
				const response = await getMovieSerie(item);
				if(response !== null){
					watched_list.push(response);
				}
			}
			
			res
				.status(200)
				.json({
					success: true,
					data: watched_list
				});
			return;
		}catch(error){
			res
				.status(404)
				.json({ 
					success: false,
					message: 'User not found (watched list)'
				});
			return;
		}

	}else{
		res
			.status(400)
			.json({
				success: false,
				message: 'Missing data (watched list)'
			});
		return;
	}
};

export const addWatched = async (
	req: NextApiRequest, 
	res: NextApiResponse
): Promise<void> => {
	const { id_user, id_profile } = req.cookies;
	const { media_type, id } = req.body;

	if(id_user	&& id_profile && id && media_type){
		const user = await User.findById({ _id: id_user })
			.then(function(user) {
				if(!user){
					res
						.status(404)
						.json({ 
							success: false,
							message: 'User not found (watched list)'
						});
					return null;
				}
				return user;
			})
			.catch(() => {
				res
					.status(502)
					.json({ 
						success: false,
						message: 'Error getting watched list in mongodb (watched list)'
					});
				return null;
			});

		if(!user){ return;	}

		try{

			let wish_list = (user.profiles[id_profile].list.watched as Array<any>);
			
			for(const item of wish_list){
				if(id === (item as any).id){
					res
						.status(200)
						.json({
							success: true,
							message: 'Already added (watched list)'
						});
					return;
				}
			}

			(user.profiles[Number(id_profile)].list.watched as Array<any>).push({media_type: media_type, id: id});

			await User.findByIdAndUpdate({ 
				_id: id_user
			}, {
				profiles: user.profiles 
			});

			res
				.status(200)
				.json({
					success: true,
					message: 'Successfuly added (watched list)'
				});
			return;
		}catch(err){
			res
				.status(502)
				.json({ 
					success: false,
					message: 'Could not add movie/tv (watched list)'
				});
			return;
		}

	}else{
		res
			.status(400)
			.json({
				success: false,
				message: 'Missing data (watched list)'
			});
		return;
	}
};

export const delWatched = async (
	id: number,
	req: NextApiRequest, 
	res: NextApiResponse
): Promise<void> => {
	const { id_user, id_profile } = req.cookies;

	if(id_user	&& (id_profile != undefined) && id){
		const user = await User.findById({ _id: id_user })
			.then(function(user) {
				if(!user){
					res
						.status(404)
						.json({ 
							success: false,
							message: 'User not found (watched list)'
						});
					return null;
				}
				return user;
			})
			.catch(() => {
				res
					.status(502)
					.json({ 
						success: false,
						message: 'Error getting wishlist in mongodb (watched list)'
					});
				return null;
			});

		if(!user){ return;	}

		try{
			const index = (user.profiles[id_profile].list.watched as Array<any>)
				.findIndex(item => item.id === id);

			if(index >= 0){
				(user.profiles[id_profile].list.watched as Array<any>).splice(index, 1);

				await User.findByIdAndUpdate({ 
					_id: id_user
				}, {
					profiles: user.profiles 
				});
			}

			res
				.status(200)
				.json({
					success: true,
					message: 'Successfuly deleted (watched list)'
				});
		}catch(err){
			res
				.status(502)
				.json({ 
					success: false,
					message: 'Could not remove movie/tv (watched list)'
				});
			return;
		}
  
	}else{
		res
			.status(400)
			.json({
				success: false,
				message: 'Missing data (watched list)'
			});
	}
};