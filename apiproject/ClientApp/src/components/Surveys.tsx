import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Survey from "../interface/surveyInterface";
import User from "../interface/userInterface";


export default function Surveys() {
	const [surveys, setSurveys] = useState<Survey[]>([]);
	const [user, setUser] = useState<User | null>();
	const navigate = useNavigate();

	useEffect( () => {
		const url = 'https://localhost:7214/Survey';
	
		const fetchData = async () => {
			try{
				const response = await fetch(url);
				const data = await response.json();
				setSurveys(data);
			}
			catch (error){
				console.log("error", error);
			}
		}
		fetchData();

		const retrieveUser = localStorage.getItem("user");
		if (retrieveUser){
			setUser(JSON.parse(retrieveUser));
		} 
		else{
			setUser(null);
		}
	}, []);

	const deleteSurvey = async (surveyId: number) => {
		const url = 'https://localhost:7214/Survey/delete/' + surveyId;
		console.log(url)
		const requestOptions = {
			method: 'DELETE'
		}
		fetch (url, requestOptions)
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(err => console.log(err));
		navigate(0);
	}

	if (user != null){
		return (
			<>
				<div className='flex flex-col items-center gap-40 mt-40'>
					<h1 className="mt-6 text-center text-3xl font-bold text-gray-900">Available Surveys</h1>
	
					<table className="table-auto w-1/2 mx-auto border-separate border-2 border-spacing-0 rounded-md border-gray-800">
						<thead>
							<tr className='bg-gray-800 text-gray-300'>
								<th className='rounded-tl-sm p-2'>Id</th>
								<th className='p-2'>Title</th>
								<th className='rounded-tr-sm p-2'>Action</th>
							</tr>
						</thead>
						<tbody>
							{
								surveys &&
								surveys.map(survey => 
									{
										return (
											<tr key={survey.surveyId}>
												<td className='border-t-2 border-gray-500 text-center px-4 py-2 border-r-2'>{survey.surveyId}</td>
												<td className='border-t-2 border-gray-500 text-center px-4 py-2 border-r-2'>{survey.title}</td>
												<td className='border-t-2 border-gray-500 text-center px-4 py-2'>
													<button className="border border-transparent text-orange-600 font-bold hover:text-orange-500 rounded-md">
														<Link to={survey.surveyId.toString()}>Answer</Link>
													</button>
													{
														user?.userId.toString() === survey.userId.toString() &&
														<div>
															<button 
															className="border border-transparent text-red-600 font-bold hover:text-red-500 rounded-md"
															onClick={() => deleteSurvey(survey.surveyId)}>
																DELETE
															</button>
														</div>
															
													}
												</td>
											</tr>
										)
									}) 
							}
						</tbody>
					</table>
				</div>
			</>
		);
	} 
	else
	{
		navigate("/login", {replace: true});
		navigate(0);
		return(<></>);
	}
}
