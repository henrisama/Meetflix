import { NextApiRequest, NextApiResponse } from 'next';
import getMovieSerie from 'public/js/getMovieSerie';
import User from '../models/users.models';

export const getWish = async (
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
						message: 'User not found (wish list)'
					});
				return null;
			}
			return user;
		}).catch(function (err){
			res
				.status(502)
				.json({ 
					success: false,
					message: 'Error getting wishlist in mongodb (wish list)'
				});
			return null;
		});

		if(!user){ return;	}

		var wish_list = [];

		try{
			const wishList: Array<number> = user
				.profiles[Number(id_profile)]
				.list
				.wish;
	
			for(const item of wishList){
				const response = await getMovieSerie(item);
				if(response !== null){
					wish_list.push(response);
				}
			}
			
			res
				.status(200)
				.json({
					success: true,
					data: wish_list
				});
			return;
		}catch(error){
			res
				.status(404)
				.json({ 
					success: false,
					message: 'User not found (wish list)'
				});
			return;
		}

	}else{
		res
			.status(400)
			.json({
				success: false,
				message: 'Missing data (wish list)'
			});
		return;
	}
};

export const addWish = async (
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
							message: 'User not found (wish list)'
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
						message: 'Error getting wishlist in mongodb (wish list)'
					});
				return null;
			});

		if(!user){ return;	}

		try{

			let wish_list = (user.profiles[id_profile].list.wish as Array<any>);
			
			for(const item of wish_list){
				if(id === (item as any).id){
					res
						.status(200)
						.json({
							success: true,
							message: 'Already added (wish list)'
						});
					return;
				}
			}

			(user.profiles[Number(id_profile)].list.wish as Array<any>).push({media_type: media_type, id: id});

			await User.findByIdAndUpdate({ 
				_id: id_user
			}, {
				profiles: user.profiles 
			});

			res
				.status(200)
				.json({
					success: true,
					message: 'Successfuly added (wish list)'
				});
			return;
		}catch(err){
			res
				.status(502)
				.json({ 
					success: false,
					message: 'Could not add movie/tv (wish list)'
				});
			return;
		}

	}else{
		res
			.status(400)
			.json({
				success: false,
				message: 'Missing data (wish list)'
			});
		return;
	}
};

export const delWish = async (
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
							message: 'User not found (wish list)'
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
						message: 'Error getting wishlist in mongodb (wish list)'
					});
				return null;
			});

		if(!user){ return;	}

		try{
			const index = (user.profiles[id_profile].list.wish as Array<any>)
				.findIndex(item => item.id === id);

			if(index >= 0){
				(user.profiles[id_profile].list.wish as Array<any>).splice(index, 1);

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
					message: 'Successfuly deleted (wish list)'
				});
		}catch(err){
			res
				.status(502)
				.json({ 
					success: false,
					message: 'Could not remove movie/tv (wish list)'
				});
			return;
		}
  
	}else{
		res
			.status(400)
			.json({
				success: false,
				message: 'Missing data (wish list)'
			});
	}
};