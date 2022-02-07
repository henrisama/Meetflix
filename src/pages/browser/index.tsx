// import type { NextPage } from 'next';
import { Container } from '@/src/components/container';
import { Center } from '@/src/components/center';
import React, { useEffect, useState } from 'react';
import Profile from '@/src/paterns/profile';
import { setCookie } from 'nookies';
import Link from 'next/link';
import { Grid } from '@/src/components/grid';
import { FiEdit } from 'react-icons/fi';
import { BsPatchCheckFill } from 'react-icons/bs';
import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';

interface ProfileInterface {
	name: string,
	list: Array<object>
}

const CustomEdit = styled.div`
	height: 250px;
  width: 250px;
  border-radius: 50px;
	padding-left: 10px;

  //tablet
  @media(max-width: 1400px){
    height: 200px;
    width: 200px;
		padding-left: 40px;
  }

  //mobile
  @media(max-width: 600px){
    height: 150px;
    width: 150px;
		padding-left: 70px;
  }
`;



const Browser: React.FC= () => {
	const [profiles, setProfiles] = useState<Array<ProfileInterface>>([]);	
	const [editMode, setEditMode] = useState(false);

	const getProfiles = async () => {
		const response = await fetch(
			'/api/user/profiles',
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
			setProfiles(response.data);
		}else{
			alert(response.err.toString());
		}
	};

	const addProfiles = async () => {
		const name = prompt('name of profile?')?.toString();
		
		if(name && name.length < 10){
			const response = await fetch(
				'/api/user/profiles',
				{
					method: 'POST',
					body: JSON.stringify({
						name: name
					}),
					headers: {
						'Content-Type': 'application/json'
					},
				}
			).then((value: Response) => {
				return value.json();
			});
	
			if(response.success){
				getProfiles();
			}else{
				alert(response.err.toString());
			}
		}else{
			alert('error getting name');
		}
	};

	const updProfiles = async (key: number) => {
		const name = prompt('new name of profile?')?.toString();
		
		if(name 
			&& name.length < 10 
			&& (key != undefined)
			&& key < 5
		){
			const response = await fetch(
				'/api/user/profiles',
				{
					method: 'PUT',
					body: JSON.stringify({
						name: name,
						id_profile: key
					}),
					headers: {
						'Content-Type': 'application/json'
					},
				}
			).then((value: Response) => {
				return value.json();
			});
	
			if(response.success){
				getProfiles();
			}else{
				alert(response.err.toString());
			}
		}else{
			alert('error getting new name');
		}
	};

	const delProfiles = async (key: number) => {
		if((key != undefined) && key < 5){
			if(confirm('Are you sure you want to delete the profile?')){
				const response = await fetch(
					'/api/user/profiles',
					{
						method: 'DELETE',
						body: JSON.stringify({
							id_profile: key
						}),
						headers: {
							'Content-Type': 'application/json'
						},
					}
				).then((value: Response) => {
					return value.json();
				});
		
				if(response.success){
					getProfiles();
				}else{
					alert(response.err.toString());
					return;
				}
			}
		}else{
			alert('error key value');
		}
	};

	const setUserProfile = (key: number) => {
		setCookie(null, 'id_profile', key.toString(), {
			maxAge: 60*60*1000,
			path: '/'
		});
	};

	useEffect(() => {
		getProfiles();
	}, []);

	return (
		<Container>
			<Center>
				<div>
					<Container
						display='flex'
					>
						<Grid>
							{profiles ? profiles.map(function (item, i) {
								return (
									<div key={i}>
										<Link href={editMode? '/browser': '/profile'} passHref>
											<div 
												onClick={
													() => setUserProfile(i)
												}
											>
												<Profile 
													name={item.name}
													id_profile={i}
													editMode={editMode}
													delProfile={delProfiles}
													updProfile={updProfiles}
												/>
											</div>
										</Link>
									</div>
								);
							}): 'Make login' }
							<Container>
								<div>	
									<CustomEdit>
										<Center>
											{
												editMode
													? <div style={{display: 'flex'}}>
														<AiOutlinePlus 
															size={70}
															color="orange"
															title="Add" 
															cursor='pointer'
															onClick={addProfiles}
														/>
														<div style={{width: '50px'}}/>
														<BsPatchCheckFill 
															onClick={
																() => { setEditMode(false); }
															}
															size={70} 
															color='#21703f'
															cursor='pointer'
														/>
													</div>
													
													: <FiEdit 
														onClick={
															() => { setEditMode(true); }
														}
														size={70} 
														color='#3f8e91'
														cursor='pointer'
													/>
											}
										</Center>
									</CustomEdit>
								</div>
							</Container>
						</Grid>
					</Container>
				</div>
			</Center>
		</Container>
	);
};

export default Browser;
