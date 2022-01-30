import type { NextPage } from 'next';
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

const Home: NextPage = () => {
	return (
		<Container padding='20px 50px 0px 0px' display='flex' justifyContent='end'>
			<Link href="/login" passHref>
				<LoginLink>
          Login
				</LoginLink>
			</Link>
		</Container>
	);
};

export default Home;
