const getMovieSerie = async (item: any) => {
	let response;

	if(item.media_type === 'movie'){
		response = await fetch(
			`https://api.themoviedb.org/3/movie/${item.id}?api_key=${process.env.API_THEMOVIEDB}`,
			{ method: 'GET'	}
		).then((value: any) => {
			return value.json();
		});
	}else if(item.media_type === 'tv'){
		response = await fetch(
			`https://api.themoviedb.org/3/tv/${item.id}?api_key=${process.env.API_THEMOVIEDB}`,
			{ method: 'GET'	}
		).then((value: any) => {
			return value.json();
		});
	}

	if(response.success && response.success === false){
		return null;
	}

	response.media_type = item.media_type;
	return response;
};

export default getMovieSerie;