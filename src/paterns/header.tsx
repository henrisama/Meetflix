import Link from 'next/link';
import React from 'react';
import { FcSearch } from 'react-icons/fc';
import { FaUser } from 'react-icons/fa';
import styled from 'styled-components';
import { Container } from '../components/container';
import { FiLogOut } from 'react-icons/fi';

const CustomDiv = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;

	//tablet
	@media(max-width: 1100px){
		
	}

	//mobile
	@media(max-width: 700px){
		
	}
`;

const HeaderTitle = styled.h3`
	padding: 0px 30px 0px 10px;
	font-size: 40pt;
	cursor: pointer;

	//tablet
	@media(max-width: 1100px){
		font-size: 20pt;
	}

	//mobile
	@media(max-width: 700px){
	}
`;

const HeaderLink = styled.a`
	padding: 0px 10px;
	font-size: 15pt;
	text-decoration: none;
	color: white;

	//tablet
	@media(max-width: 1100px){
		font-size: 12pt;
	}

	//mobile
	@media(max-width: 700px){
	}
`;

const HeaderSearch = styled.div`
	display: flex;
	align-items: center;

	input{
		height: 30px;
		width: 300px;
		padding: 0px 10px 0px 40px;
		color: white;
		font-size: 14pt;
		border: none;
		border-radius: 10px;
		background-color: #7c1e1e;
	}
`;

const Header: React.FC = () => {

	const logoutHandler = async() => {
		const response = await fetch(
			'/api/user/logout',
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
			window.location.pathname = '/login';
		}else{
			alert('Error when logging out');
		}
	};

	/* const headerSearchBar = document.getElementById('header-search-bar') as HTMLInputElement;
		headerSearchBar.onkeydown = (value: any) => {
			if(value.keyCode === 13){
				//window.location.pathname = '/browser/search?query='+value.target.value.toString();
			}
		}; */

	return (
		<Container backgroundColor='#e63535' height='75px'>
			<CustomDiv>
				{/* Title and Links */}
				<Container
					display='flex'
					height='auto'
					width='auto'
					alignItems='center'
				>
					<HeaderLink href='browser'>
						<HeaderTitle>
								Meetflix
						</HeaderTitle>
					</HeaderLink>
					
					<Link href='/browser/wish' passHref>
						<HeaderLink>
								Wish
						</HeaderLink>
					</Link>

					<Link href='/browser/watch' passHref>
						<HeaderLink>
								Watch
						</HeaderLink>
					</Link>

					<Link href='/profile' passHref>
						<HeaderLink>
								Profiles
						</HeaderLink>
					</Link>
					
				</Container>

				{/* Search */}
				<Container
					height='auto'
					width='auto'
					display='flex'
					alignItems='center'
				>
					<HeaderSearch>
						<FcSearch  size={25} cursor='pointer' style={{transform: 'translateX(30px)'}}/>
						<input type="text" name="" id="header-search-bar" />
					</HeaderSearch>

					<Container
						padding='0px 10px 0px 30px'
					>
						<FiLogOut size={40} cursor='pointer' onClick={logoutHandler}/>
					</Container>
						
				</Container>
			</CustomDiv>
		</Container>
	);
};

export default Header;