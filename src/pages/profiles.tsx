import type { NextApiRequest, NextApiResponse, NextPage, NextPageContext } from 'next';
import { Container } from '@/src/components/container';
import isLogged from '../public/js/isLogged';
import { Center } from '../components/center';


const Home: NextPage = () => {
	return (
		<Container>
			<Center>
				<h1>Restrict</h1>
			</Center>
		</Container>
	);
};

Home.getInitialProps = async (context: NextPageContext) => {
	const { res, req } = context;


	const result = isLogged(context);

	if(!result){
		(res as any).setHeader('location', '/login');
		(res as any).statusCode = 302;
		(res as any).end();
	};

	return {
		props:{
			//profiles: (req as any).session.user.profiles
		}
	};
};

export default Home;
