import { Container } from '../components/container';
import { Card, CardDescribe, CardOverview, CardTitle } from '@/src/components/card/banner';
import styled from 'styled-components';
import Stars from './stars';

import { IoAddOutline } from 'react-icons/io5';
import { BsCheck2 } from 'react-icons/bs';


import { IoIosGlasses } from 'react-icons/io';

interface BannerInterface {
	adult: string,
	id: number,
	original_language: string,
	original_title: string,
	overview: string,
	poster_path: string,
	release_date: string,
	title: string,
	vote_average: number,
	media_type: string
}

const CustomDiv = styled.div`
	height: 100%;
	padding: 0px 10px 10px 10px;
	color: transparent;
	display: flex;
	align-items: end;
	border-radius: 18px;
	
	transition: all 0.5s linear;
	opacity: 0;

	:hover {
		background-image: linear-gradient( 
			to bottom, 
			transparent, 
			black,
			black
		);

		opacity: 1;
	}
`;
const CustomDivIcon = styled.div`
	margin-right: 5px;
	cursor: pointer;

	transition: all 0.1s linear;
	-webkit-transition: all 0.1s linear;

	color: white;

	:hover{
		color: gray;
		-webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
	}
`;

const Banner: React.FC<BannerInterface> = (props) => {
	const addToWishList = async (id:number) => {
		if(!id){
			alert('Not id provider on adding to wish list');
			return;
		}

		const response: any = await fetch(
			'http://localhost:3000/api/user/profile/wish',
			{
				method: 'POST',
				body: JSON.stringify({
					id: id
				}),
				headers: {
					'Content-Type': 'application/json'
				},
			}
		).then((value) => {
			return value.json();
		});

		if(response){
			alert(response.message);
		}else{
			alert('error getting response');
		}

		return;
	};

	const addToWatchedList = async (id:number) => {
		if(!id){
			alert('Not id provider on adding to watched list');
			return;
		}

		const response: any = await fetch(
			'http://localhost:3000/api/user/profile/watched',
			{
				method: 'POST',
				body: JSON.stringify({
					id: id
				}),
				headers: {
					'Content-Type': 'application/json'
				},
			}
		).then((value) => {
			return value.json();
		});

		if(response){
			alert(response.message);
		}else{
			alert('error getting response');
		}

		return;
	};


	return (
		<Container>
			<Card 
				image_path={props.poster_path}
			>
				<CustomDiv>
					<Container
						height='auto'
					>
						{/* Title */}
						<Container
							textAlign='center'
						>
							<CardTitle>
								{props.title}
							</CardTitle>
						</Container>

						{/* Describe */}
						<Container>
							<CardDescribe>
								{props.release_date? `${props.release_date.split('-')[0]} | `: ''} 
								{props.vote_average? `${props.vote_average} | `: ''} 
								{props.media_type? `${props.media_type.toUpperCase()} | `: ''} 
								{props.original_language? `${props.original_language.toUpperCase()}`: ''} 
							</CardDescribe>
						</Container>

						{/* Overview */}
						<Container>
							<CardOverview>
								{props.overview}
							</CardOverview>
						</Container>

						{/* Star Rating */}
						<Container>
							<Stars rating={props.vote_average? props.vote_average : 0}/>
						</Container>

						{/* Add wish and watched list */}
						<Container
							display='flex'
						>

							{/* if id is in getIdOfWishList show remove button with their method, else show Add button with their method */}
							<CustomDivIcon>
								<IoAddOutline
									size={30} 
									title='Add to wish list' 
									onClick={() => {addToWishList(props.id);}}
								/>
							</CustomDivIcon>
							<CustomDivIcon>
								<IoIosGlasses 
									size={30} 
									title='Add to watched list'
									onClick={() => {addToWatchedList(props.id);}}
								/>
							</CustomDivIcon>
						</Container>
					</Container>
				</CustomDiv>
			</Card>
		</Container>
	);
};

export default Banner;

