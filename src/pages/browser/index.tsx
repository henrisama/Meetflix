import { Center } from '@/src/components/center';
import { Col } from '@/src/components/col';
import { Container } from '@/src/components/container';
import { Row } from '@/src/components/row';
import Banner from '@/src/paterns/banner';
import Header from '@/src/paterns/header';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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

const NextandPrevious = styled.div`
	font-size: 50pt;
	padding: 10px 30px;
	margin: 0px 10px;
	text-decoration: none;
	border-radius: 100%;
	background-color: #707070;
	cursor: pointer;

	transition: all 0.1s linear;
  -webkit-transition: all 0.1s linear;

	:hover{
		background-color: #3a3a3a;
		-webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
	}
`;

const Home: React.FC = () => {
	const [data, setData] = useState<Array<TrendingInterface>>([]);

	const loadBrowser = async () => {
		const params = new URLSearchParams(window.location.search);
		const page = params.get('page');

		const response = await fetch(
			'/api/user/browser?page='+(page? page : 1),
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
			setData(response.data['results']);
		}else{
			alert('error');
		}
	};

	const pageHandler = (event: string) => {
		const params = new URLSearchParams(window.location.search);
		const page = Number(params.get('page'));

		if(page){
			if(event === 'previous'){
				if(page > 1){
					window.location.href = 'browser?page='+(page-1);
				}
			}
	
			if(event === 'next'){
				if(page <= 100){
					window.location.href = 'browser?page='+(page+1);
				}
			}
		}else{
			if(event === 'next'){
				window.location.href = 'browser?page='+(2);
			}
		}

	};

	useEffect(() => {
		loadBrowser();
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
								data? data.map(function (item, i) {
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

				{/* Next and Previous Buttons */}
				<Container>
					<Center>
						<div>
							<Container
								padding='20px 0px 40px 0px'
								display='flex'
							>
								<NextandPrevious onClick={() => pageHandler('previous')}>{'<'}</NextandPrevious>
								<NextandPrevious onClick={() => pageHandler('next')}>{'>'}</NextandPrevious>
							</Container>
						</div>
					</Center>
				</Container>
			</Container>
		</div>
	);
};

export default Home;