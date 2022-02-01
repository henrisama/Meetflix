import type { NextPage } from 'next';
import Head from 'next/head';
import { Center } from '../components/center';
import { Container } from '../components/container';
import styled from 'styled-components';
import Link from 'next/link';

const Input = styled.input`
  height: 30px;
  width: 250px;
  margin: 5px 0px;
	padding: 0px 0px 0px 5px;
`;

const LoginButton = styled.button`
  height: 30px;
  margin: 5px 0px;
  width: 100px;
`;

const SingUpButton = styled.button`
	height: 30px;
  margin: 5px 5px 5px 0px;
  width: 100px;
`;

const Label = styled.label`
`;

const validate = (event: React.FormEvent<HTMLFormElement>) => {
	//event.preventDefault();
  
	const email = (event.target as any).email.value.toLowerCase();
	const errorHandlerSpan = document.getElementById('errorHandler') as HTMLSpanElement;

	// email varification
	if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))){
		errorHandlerSpan.textContent = 'Invalid email';
		return false;
	}

	return true;
};

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
							<form 
								action="/api/user/login" 
								method="post"
								onSubmit={validate}>
								<Label>
									Email
								</Label>
								<br />
								<Input 
									type="email" 
									name="email" 
									id=""
									placeholder='example@example.com' 
									required/>
								<br />
								<Label>
									Password
								</Label>
								<br />
								<Input 
									type="password" 
									name="password" 
									id="" 
									minLength={8}
									maxLength={30}
									required/>
								<br />
								<Center>
									<div>
										<Link href='/signup' passHref>
											<SingUpButton>Sign Up</SingUpButton>
										</Link>
										<LoginButton type="submit">Login</LoginButton>
									</div>
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