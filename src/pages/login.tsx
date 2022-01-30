import type { NextPage } from 'next';
import Head from 'next/head';
import { Center } from '../components/center';
import { Container } from '../components/container';
import styled from 'styled-components';

const Input = styled.input`
  height: 30px;
  width: 250px;
  margin: 5px 0px;
`;

const LoginButton = styled.button`
  height: 30px;
  margin: 5px 0px;
  width: 150px;
`;

const Login: NextPage = () => {
	return (
		<Container>
			<Head>
				<title>Login</title>
			</Head>
			<Center>
				<div>
					<Container 
						backgroundColor='red' 
						height='400px' 
						width='400px' 
						style={{
							borderRadius: '30px', 
							border: '4px outset red'
						}}>
						<Center>
							<form action="/api/user/auth" method="post">
								<Input type="email" name="email" id=""/><br />
								<Input type="password" name="password" id="" /><br />
								<Center>
									<LoginButton type="submit">Log In</LoginButton>
								</Center>
							</form>
						</Center>
					</Container>
				</div>
			</Center>
		</Container>
	);
};

export default Login;