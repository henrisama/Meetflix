import { NextApiRequest, NextApiResponse } from 'next';
import getMovieSerie from 'public/js/getMovieSerie';
import User from '../models/users.models';

export const Explore = async (req: NextApiRequest, res: NextApiResponse) => {
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
						message: 'User not found (explore)'
					});
				return null;
			}
			return user;
		}).catch(function (err){
			res
				.status(502)
				.json({ 
					success: false,
					message: 'Error getting explore in mongodb (explore)'
				});
			return null;
		});

		if(!user){ return;	}

		var watched_list_genre_ids = [];
		var watched_media_type = [];

		try{
			const watchedList: Array<number> = user
				.profiles[Number(id_profile)]
				.list
				.watched;
			
        
			for(const item of watchedList){
				const response = await getMovieSerie(item);
				if(response !== null){
					for(const genre of response.genres){
						watched_list_genre_ids.push((genre as any).id);
						watched_media_type.push(response.media_type);
					}
				}
			}

			var uniq_watched_list_genre_ids = Array.from(new Set(watched_list_genre_ids));
			var sliced_uniq_watched_list_genre_ids = uniq_watched_list_genre_ids.slice(0,10);
			var result = [];

			for(const [idx, genre_id] of (sliced_uniq_watched_list_genre_ids as any).entries()){
				var url = 'https://api.themoviedb.org/3/discover/'
          + watched_media_type[idx]
          +'?api_key='+process.env.API_THEMOVIEDB
          +'&language=en-US'
          +'&sort_by=popularity.desc'
          +'&include_adult=false'
          +'&include_video=false'
          +'&with_genres='+genre_id
          +'&with_watch_monetization_types=flatrate';
  
				const response = await fetch(
					url,
					{ method: 'GET'	}
				).then((value: any) => {
					return value.json();
				});

				for(const [idx_result, _] of response.results.entries()){
					response.results[idx_result].media_type = watched_media_type[idx];
				}

				result.push(...response.results);
			}

			result = result.filter((value, index, self) =>
				index === self.findIndex((t) => (
					t.place === value.place && t.name === value.name
				))
			);

			res
				.status(200)
				.json({
					success: true,
					data: result
				});
			return;
		}catch(error){
			res
				.status(404)
				.json({ 
					success: false,
					message: 'Error (explore): '+error
				});
			return;
		}

	}else{
		res
			.status(400)
			.json({
				success: false,
				message: 'Missing data (explore)'
			});
		return;
	}
};