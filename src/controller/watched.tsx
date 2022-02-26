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
						err: 'User not found (Get Watched)'
					});
				return;
			}
			return user;
		}).catch(function (err){
			res
				.status(502)
				.json({ 
					success: false,
					err: 'Error getting wached list in mongodb (Get Watched)'
				});
			return;
		});

		const watchedList: Array<number> = user
			.profiles[Number(id_profile)]
			.list
			.watched;

		var watched_list = [];
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
	}else{
		res
			.status(400)
			.json({
				success: false,
				err: 'Missing data (Get Watched)'
			});
		return;
	}
};

export const addWatched = async (
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
							err: 'User not found  (Add Watched)'
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
						err: 'Error getting watched list in mongodb (Add Watched)'
					});
				return;
			});

		try{
			const index = (user.profiles[id_profile].list.watched as Array<number>)
				.findIndex(element => element === id);

			if(index === -1){
				(user.profiles[Number(id_profile)].list.watched as Array<number>).push(id);
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
					err: 'Could not add movie/tv (Add Watched)'
				});
			return;
		}
  
		res
			.status(200)
			.json({
				success: true,
				message: 'Successfuly added (Add Watched)'
			});
		return;
	}else{
		res
			.status(400)
			.json({
				success: false,
				err: 'Missing data (Add Watched)'
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
							err: 'User not found (Delete Watched)'
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
						err: 'Error getting watched list in mongodb (Delete Watched)'
					});
				return;
			});

		try{
			const index = (user.profiles[id_profile].list.watched as Array<number>)
				.findIndex(element => element === id);

			if(index >= 0){
				(user.profiles[id_profile].list.watched as Array<number>).splice(index, 1);
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
					err: 'Could not remove movie/tv (Delete Watched)'
				});
			return;
		}
  
		res
			.status(200)
			.json({
				success: true,
				message: 'Successfuly deleted (Delete Watched)'
			});
	}else{
		res
			.status(400)
			.json({
				success: false,
				err: 'Missing data (Delete Watched)'
			});
	}
};