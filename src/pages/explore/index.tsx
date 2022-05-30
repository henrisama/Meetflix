import { Center } from '@/src/components/center';
import { Col } from '@/src/components/col';
import { Container } from '@/src/components/container';
import { Row } from '@/src/components/row';
import Banner from '@/src/paterns/banner';
import Header from '@/src/paterns/header';
import { NextPage, NextPageContext } from 'next';
import styled from 'styled-components';


interface ResultInterface{
  adult: string,
	id: number,
	original_language: string,
	original_title: string,
	original_name: string,
	name: string,
	overview: string,
	poster_path: string,
  backdrop_path: string,
	release_date: string,
	title: string,
	vote_average: number,
	media_type: string
}

interface Props{
  data: Array<ResultInterface>,
	ids_data: {
		wish: {
			movie: Array<Number>,
			tv: Array<Number>
		},
		watched: {
			movie: Array<Number>,
			tv: Array<Number>
		}
	}
}

const Explore: NextPage<Props> = ({data, ids_data}) => {
	var isWatched = false;
	var isWish = false;

	return(
		<div>
			<Header />
			<Container>

				{/* Banners */}
				<Container
					padding='40px 0px'
				>
					<Container textAlign='center' padding='10px 20px 30px 20px'>
						<h1>Recommended for you</h1>
					</Container>
					<Center>
						<Row>
							{
								data? data.map(function (item, i) {
									if(item.media_type === 'movie'){
										isWatched = ids_data.watched.movie.indexOf(item.id) === -1? false : true ;
										isWish = ids_data.wish.movie.indexOf(item.id) === -1? false : true ;
									}else if(item.media_type === 'tv'){
										isWatched = ids_data.watched.tv.indexOf(item.id) === -1? false : true ;
										isWish = ids_data.wish.tv.indexOf(item.id) === -1? false : true ;
									}

									return(
										<Col key={i}>
											<Banner 
												id={item.id}
												adult={item.adult}
												media_type={item.media_type? item.media_type : ''}
												original_language={item.original_language}
												original_title={(item.original_name)? item.original_name : item.original_title}
												overview={item.overview}
												poster_path={(item.poster_path)? item.poster_path : item.backdrop_path}
												release_date={item.release_date}
												title={(item.name)? item.name : item.title}
												vote_average={item.vote_average}
												watched={isWatched}
												wish={isWish}
											/>
										</Col>
									);
								})
									: 'No movies'
							}
						</Row>
					</Center>
				</Container>
			</Container>
		</div>
	);
};

Explore.getInitialProps = async (ctx: NextPageContext) => {
	if(!ctx.req){
		return { data: [], ids_data: {} };
	}

	const url =  process.env.HOST+'/api/user/explore';

	const response = await fetch(
		url,
		{
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'Cookie': (ctx.req.headers.cookie as any)
			},
		}
	).then((value: Response) => {
		return value.json();
	});

	if(!response.success){
		return {data: [], ids_data: {}};
	}

	const ids_response = await fetch(
		process.env.HOST+'/api/user/profile/list',
		{
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
				'Cookie': (ctx.req.headers.cookie as any)
			},
		}
	).then((value: Response) => {
		return value.json();
	});

	const ids_data = ids_response 
		&& ids_response.success
		? ids_response.data : {};
  
	//console.log(response.data);

	return {
		data: response.data,
		ids_data: ids_data
	};
};

export default Explore;