import { NextApiRequest, NextApiResponse } from 'next';
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
						err: 'User not found'
					});
				return;
			}
			return user;
		}).catch(function (err){
			res
				.status(502)
				.json({ 
					success: false,
					err: 'Error getting wishlist in mongodb'
				});
			return;
		});

		const wishList: Array<number> = user
			.profiles[Number(id_profile)]
			.list
			.wish;
		res
			.status(200)
			.json({
				success: true,
				data: wishList
			});
		return;
	}else{
		res
			.status(400)
			.json({
				success: false,
				err: 'Missing data'
			});
		return;
	}
};

export const addWish = async (
	id: number,
	req: NextApiRequest, 
	res: NextApiResponse
): Promise<void> => {
	const { id_user, id_profile } = req.cookies;

	if(id_user	&& id_profile && id){
		const user = await User.findById({ _id: id_user })
			.then(function(user) {
				if(!user){
					res
						.status(404)
						.json({ 
							success: false,
							err: 'User not found'
						});
					return;
				}
				return user;
			})
			.catch(() => {
				res
					.status(502)
					.json({ 
						success: false,
						err: 'Error getting wishlist in mongodb'
					});
				return;
			});

		try{
			const index = (user.profiles[id_profile].list.wish as Array<number>)
				.findIndex(element => element === id);

			if(index === -1){
				(user.profiles[Number(id_profile)].list.wish as Array<number>).push(id);
			}
  
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
					err: 'Could not add movie/tv'
				});
			return;
		}
  
		res
			.status(200)
			.json({
				success: true,
				message: 'Successfuly added'
			});
		return;
	}else{
		res
			.status(400)
			.json({
				success: false,
				err: 'Missing data'
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
							err: 'User not found'
						});
					return;
				}
				return user;
			})
			.catch(() => {
				res
					.status(502)
					.json({ 
						success: false,
						err: 'Error getting wishlist in mongodb'
					});
				return;
			});

		try{
			const index = (user.profiles[id_profile].list.wish as Array<number>)
				.findIndex(element => element === id);

			if(index >= 0){
				(user.profiles[id_profile].list.wish as Array<number>).splice(index, 1);
			}

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
					err: 'Could not remove movie/tv'
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