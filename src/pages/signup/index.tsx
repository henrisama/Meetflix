import type { NextPage } from 'next';
import Head from 'next/head';
import { Center } from '@/src/components/center';
import { Container } from '@/src/components/container';
import styled from 'styled-components';
import React from 'react';
import { IoMdArrowRoundBack} from 'react-icons/io';
import Link from 'next/link';


const Input = styled.input`
  height: 30px;
  width: 250px;
  margin: 5px 0px 15px 0px;
  padding: 0px 0px 0px 5px;
`;

const InputName = styled.input`
  height: 30px;
  width: 120px;
  margin: 5px 0px 15px 0px;
  padding: 0px 0px 0px 5px;
`;

const SingUpButton = styled.button`
  height: 30px;
  margin: 15px 0px;
  width: 150px;
`;

const Label = styled.label`
`;

const CustomDiv = styled.div`
  height: 100%;
	background-image: url('/img/home-background.jpg');
  background-position: center;
  background-size: cover;
`;

const CustomOpacity = styled.div`
  height: 100%;
  background-color: rgba(0,0,0,0.6);
`;

const submit = async (event: React.FormEvent<HTMLFormElement>) => {
	event.preventDefault();
  
	const firstName = (event.target as any).firstName.value;
	const lastName = (event.target as any).lastName.value;
	const born = (event.target as any).born.value;
	const email = (event.target as any).email.value.toLowerCase();
	const password = (event.target as any).password.value;
	const confirmPassword = (event.target as any).confirmPassword.value;
	const errorHandlerSpan = document.getElementById('errorHandler') as HTMLSpanElement;

	// restrict child access
	const currentYear = parseInt(new Date(Date.now()).getFullYear().toString());
	if(parseInt( born.split('-')[0] ) + 9 > currentYear){
		errorHandlerSpan.textContent = 'You need to be over 10 years old';
		return false;
	}

	// email varification
	if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))){
		errorHandlerSpan.textContent = 'Invalid email';
		return false;
	}

	// passwords don't match
	if(password !== confirmPassword){
		errorHandlerSpan.textContent = 'Passwords don`t match';
		return false;
	}

	const response = await fetch(
		'https://meetflix.vercel.app/api/user/signup',
		{
			method: 'POST',
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password,
				born: born.toString(),
			}),
			headers: {
				'Content-Type': 'application/json'
			},
		}
	).then((value: Response) => {
		return value.json();
	});

	if(response.success){
		alert(response.message);
		window.location.pathname = '/login';
	}else{
		alert(response.err.toString());
	}

	return;
};

const SignUp: NextPage = () => {
	return (
		<CustomDiv>
			<CustomOpacity>
				<Container>
					<Head>
						<title>Sing Up</title>
					</Head>
					<Center>
						<div>
							<Container 
								backgroundColor='red' 
								padding='10px 40px 20px 40px'
								style={{
									borderRadius: '30px', 
									border: '4px outset red'
								}}>
								<div>
									<Link href='/login' passHref>
										<IoMdArrowRoundBack size={40} cursor='pointer'/>
									</Link>
								</div>
								<Center>
									<form
										method="post"
										onSubmit={submit}>
										<Center style={{height: '30px'}}>
											<span id='errorHandler'/>
										</Center>
										<br />
										<Label>Name</Label> 
										<br />
										<InputName 
											type='text' 
											name='firstName' 
											placeholder='first'
											minLength={2} 
											maxLength={15} 
											required/>
										<InputName 
											type='text' 
											name='lastName' 
											placeholder='last' 
											minLength={2}
											style={{marginLeft: '10px'}} 
											maxLength={15}  
											required/> 
										<br />
										<Label>Born</Label> 
										<br />
										<Input 
											type="date" 
											name="born" 
											defaultValue="2000-01-01" 
											required/>
										<br />
										<Label>Email</Label> 
										<br />
										<Input 
											type="email" 
											name="email" 
											placeholder='example@example.com' 
											required/>
										<br />
										<Label>New Password</Label> 
										<br />
										<Input 
											type="password" 
											name="password" 
											minLength={8}
											maxLength={30}
											required/>
										<br />
										<Label>Confirm Password</Label> 
										<br />
										<Input 
											type="password" 
											name="confirmPassword" 
											minLength={8}
											required/>
										<br />
										<Center>
											<SingUpButton 
												type="submit">Sign Up</SingUpButton>
										</Center>
									</form>
								</Center>
							</Container>
						</div>
					</Center>
				</Container>
			</CustomOpacity>
		</CustomDiv>
	);
};

export default SignUp;