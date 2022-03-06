import type { NextPage, NextPageContext } from 'next';
import { Container } from '../components/container';
import styled from 'styled-components';
import Link from 'next/link';

const LoginLink = styled.a`
  height: fit-content;
  padding: 10px 25px 10px 25px;
  text-decoration: none;
  color: white;
  font-size: 18pt;
  background-color: red;
  border-radius: 5px;
  border: 2px outset red;
`;

const CustomDiv = styled.div`
  height: 100%;
	background-image: url('/img/home-background.jpg');
  background-position: center;
  background-size: cover;
`;

const CustomLinear = styled.div`
  height: 100%;
  background: linear-gradient(45deg, black, rgba(0,0,0,0.8), rgba(0,0,0,0.6), transparent, transparent);
`;

const Title = styled.h1`
  padding: 0px 0px 30px 30px;
  font-size: 100pt;
  color: rgba(255,0,0);
	text-shadow: 1px 1px white;
`;

const Home: NextPage= () => {
	return (
		<CustomDiv>
			<CustomLinear>
				<Container 
					padding='20px 50px 0px 0px' 
					display='flex' 
					
				>
					<Container
						display='flex'
						alignItems='end'
					>
						<Title>
              Meetflix
						</Title>
					</Container>
					<Container
						display='flex'
						justifyContent='end'
					>
						<Link 
							href="/login" 
							passHref
						>
							<LoginLink>
              Login
							</LoginLink>
						</Link>
					</Container>
				</Container>
			</CustomLinear>
		</CustomDiv>
	);
};

Home.getInitialProps = async (ctx: NextPageContext) => {
	if(!ctx.req){
		return { isAuth: false };
	}

	const response = await fetch(
		'http://localhost:3000/api/user/isAuth',
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
	console.log(response);

	if(response.success){
		ctx.res?.writeHead(307, { Location: '/browser/1' });
		ctx.res?.end();
		return;
	}else{
		return {};
	}
};

export default Home;
