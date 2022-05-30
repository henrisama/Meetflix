import { useState } from 'react';
import { Container } from '../components/container';
import { Card, CardDescribe, CardOverview, CardTitle } from '@/src/components/card/banner';
import styled from 'styled-components';
import Stars from './stars';

import { IoAddOutline } from 'react-icons/io5';
import { BsCheck2, BsCheck2All } from 'react-icons/bs';
import { IoIosGlasses } from 'react-icons/io';
import { IoIosShareAlt } from 'react-icons/io';

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
	media_type: string,
	watched: boolean,
	wish: boolean
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
	const [ isWish, setIsWish ] = useState(props.wish);
	const [ isWatched, setIsWatched ] = useState(props.watched);

	const addToWishList = async (id:number, media_type: string) => {
		if(!id && !media_type){
			alert('Not id or media_type provider on adding to wish list');
			return;
		}

		const response: any = await fetch(
			process.env.HOST+'/api/user/profile/wish',
			{
				method: 'POST',
				body: JSON.stringify({
					id: id,
					media_type: media_type
				}),
				headers: {
					'Content-Type': 'application/json'
				},
			}
		).then((value) => {
			return value.json();
		});

		if(response){
			//alert(response.message);
		}else{
			alert('error getting response');
		}

		setIsWish(!isWish);
		return;
	};

	const addToWatchedList = async (id:number, media_type: string) => {
		if(!id && !media_type){
			alert('Not id or media_type provider on adding to watched list');
			return;
		}

		const response: any = await fetch(
			process.env.HOST+'/api/user/profile/watched',
			{
				method: 'POST',
				body: JSON.stringify({
					id: id,
					media_type: media_type
				}),
				headers: {
					'Content-Type': 'application/json'
				},
			}
		).then((value) => {
			return value.json();
		});

		if(response){
			//alert(response.message);
		}else{
			alert('error getting response');
		}

		setIsWatched(!isWatched);
		return;
	};

	const removeOfWishList = async (id:number, media_type: string) => {
		if(!id && !media_type){
			alert('Not id or media_type provider on removing of wish list');
			return;
		}

		const response: any = await fetch(
			process.env.HOST+'/api/user/profile/wish',
			{
				method: 'DELETE',
				body: JSON.stringify({
					id: id,
					media_type: media_type
				}),
				headers: {
					'Content-Type': 'application/json'
				},
			}
		).then((value) => {
			return value.json();
		});

		if(response){
			//alert(response.message);
		}else{
			alert('error getting response');
		}

		setIsWish(!isWish);
		document.location.reload();

		return;
	};

	const removeOfWatchedList = async (id:number, media_type: string) => {
		if(!id && !media_type){
			alert('Not id or media_type provider on removing of wish list');
			return;
		}

		const response: any = await fetch(
			process.env.HOST+'/api/user/profile/watched',
			{
				method: 'DELETE',
				body: JSON.stringify({
					id: id,
					media_type: media_type
				}),
				headers: {
					'Content-Type': 'application/json'
				},
			}
		).then((value) => {
			return value.json();
		});

		if(response){
			//alert(response.message);
		}else{
			alert('error getting response');
		}

		setIsWatched(!isWatched);
		document.location.reload();

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
						<Container
							onClick={() => {}}
							style={{cursor: 'pointer'}}
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
						</Container>

						{/* Add wish and watched list */}
						<Container
							display='flex'
						>

							{/* if id is in getIdOfWishList show remove button with their method, else show Add button with their method */}
							<Container
								display='flex'
							>
								<CustomDivIcon>
									{
										isWish
											?<BsCheck2
												size={30} 
												color="lightgreen"
												title='remove of wish list' 
												onClick={() => {removeOfWishList(props.id, props.media_type);}}
											/>
											:<IoAddOutline
												size={30} 
												title='Add to wish list' 
												onClick={() => {addToWishList(props.id, props.media_type);}}
											/>
									}
								</CustomDivIcon>
								<CustomDivIcon>
									{
										isWatched
											?<BsCheck2All 
												size={30} 
												color="lightblue"
												title='remove of watched list'
												onClick={() => {removeOfWatchedList(props.id, props.media_type);}}
											/>
											: <IoIosGlasses 
												size={30} 
												title='Add to watched list'
												onClick={() => {addToWatchedList(props.id, props.media_type);}}
											/>
									}
									
								</CustomDivIcon>
							</Container>

							<Container padding='0px 10px 0px 0px' textAlign='end'>
								<CustomDivIcon>
									{
										isWatched
											?<IoIosShareAlt 
												size={30}
												title='Share on Twitter'
												onClick={() => { 
													window.open(
														'https://twitter.com/intent/tweet?'
														+	'text=Look%20what%20I%20watched%20%F0%9F%98%84'
														+ '%0A%23'+ props.title.replace(' ', '')
														+ '%20%23Meetflix'
													);
												}}
											/>
											: null
									}
								</CustomDivIcon>
							</Container>
						</Container>
					</Container>
				</CustomDiv>
			</Card>
		</Container>
	);
};

export default Banner;

