import { NextApiRequest, NextApiResponse } from 'next';
import User from '../models/users.models';

export const getIdsList = async (
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
						message: 'User not found (ids list)'
					});
				return null;
			}
			return user;
		}).catch(function (err){
			res
				.status(502)
				.json({ 
					success: false,
					message: 'Error getting wishlist in mongodb (ids list)'
				});
			return null;
		});

		if(!user){ return;	}

		var ids_list = {
			wish: {
				movie: [0],
				tv: [0]
			},
			watched: {
				movie: [0],
				tv: [0]
			}
		};

		try{
			const wishList: Array<number> = user
				.profiles[Number(id_profile)]
				.list
				.wish;
	
			for(const item of wishList){
				if((item as any).media_type === 'movie'){
					ids_list.wish.movie.push((item as any).id);
				}else if((item as any).media_type === 'tv'){
					ids_list.wish.tv.push((item as any).id);
				}
			}

			const watchedList: Array<number> = user
				.profiles[Number(id_profile)]
				.list
				.watched;
	
			for(const item of watchedList){
				if((item as any).media_type === 'movie'){
					ids_list.watched.movie.push((item as any).id);
				}else if((item as any).media_type === 'tv'){
					ids_list.watched.tv.push((item as any).id);
				}
			}
			
			res
				.status(200)
				.json({
					success: true,
					data: ids_list
				});
			return;
		}catch(error){
			res
				.status(404)
				.json({ 
					success: false,
					message: 'User not found (ids list)'
				});
			return;
		}

	}else{
		res
			.status(400)
			.json({
				success: false,
				message: 'Missing data (ids list)'
			});
		return;
	}
};