import { Center } from '@/src/components/center';
import { Col } from '@/src/components/col';
import { Container } from '@/src/components/container';
import { Row } from '@/src/components/row';
import Banner from '@/src/paterns/banner';
import Header from '@/src/paterns/header';
import { useEffect, useState } from 'react';

interface TrendingInterface{
	adult: string,
	id: number,
	original_language: string,
	original_title: string,
	original_name: string,
	name: string,
	overview: string,
	poster_path: string,
	release_date: string,
	title: string,
	vote_average: number,
	media_type: string
}

const Home: React.FC = () => {
	const [trending, setTrending] = useState<Array<TrendingInterface>>([]);

	const loadTrending = async () => {
		const params = new URLSearchParams(window.location.search);
		const page = params.get('page');

		const response = await fetch(
			'/api/user/browser?page='+ page,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
			}
		).then((value: Response) => {
			return value.json();
		});

		if(response.success){
			setTrending(response.data);
		}else{
			alert('error');
		}
	};

	useEffect(() => {
		loadTrending();
	}, []);

	return (
		<div>
			<Header />
			<Container>

				{/* Banners */}
				<Container
					padding='40px 0px'
					//backgroundColor='blue'
				>
					<Center>
						<Row>
							{
								trending? trending.map(function (item, i) {
									return(
										<Col key={i}>
											<Banner 
												id={item.id}
												adult={item.adult}
												media_type={item.media_type}
												original_language={item.original_language}
												original_title={(item.original_name)? item.original_name : item.original_title}
												overview={item.overview}
												poster_path={item.poster_path}
												release_date={item.release_date}
												title={(item.name)? item.name : item.title}
												vote_average={item.vote_average}
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

export default Home;