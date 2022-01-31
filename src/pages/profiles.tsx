import type { NextPage, NextPageContext } from 'next';
import { Container } from '@/src/components/container';


const Home: NextPage = () => {
	return (
		<Container>
			<h1>Restrict</h1>
		</Container>
	);
};

Home.getInitialProps= async (context: NextPageContext) => {
	const { res, req } = context;

	console.log((req as any).cookies);

	return {
		props:{
      
		}
	};
};

export default Home;
