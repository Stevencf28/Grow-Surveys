import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react'
import Survey from "../interface/surveyInterface";
import User from "../interface/userInterface";


export default function Surveys() {
	const [surveys, setSurveys] = useState<Survey[]>([]);
	const [user, setUser] = useState<User | null>(null);
	const [surveyNumber, setSurveyNumber] = useState<number>();
	const [deleteModal, setDeleteModal] = useState(false);
	const [answerModal, setAnswerModal] = useState(false);
	const [createModal, setCreateModal] = useState(false);
	const cancelButtonRef = useRef(null)
	const navigate = useNavigate();

	const createDisplay = () =>{
		setCreateModal(true);
	}

	const createSurvey = async (e: any) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		if (user != null){
			formData.append('userId', user.userId.toString());
		}
		for (var value of formData.values()) {
			console.log(value); 
		 }
		const url = 'https://localhost:7214/create';
		const requestOptions = {
				method: 'POST',
				body: formData
			}
		await fetch(url, requestOptions)
		  .then(response => response.json())
		  .then((data) => {
			if (data){
				setCreateModal(false);
			  	navigate(0);
			}
		  })
		  .catch((error) => {
			console.log(error);
		  });
	};

	const deleteConfirmation = (surveyId: number) =>{
		setSurveyNumber(surveyId);
		setDeleteModal(true);
	}
	const deleteSurvey = async () => {
		const url = 'https://localhost:7214/delete/' + surveyNumber;
		console.log(url)
		const requestOptions = {
			method: 'DELETE'
		}
		try{
			await fetch (url, requestOptions)
				.then(response => response.json())
				.then(data => console.log(data));
		}
		catch(err){
			console.log(err);
		}
		navigate(0);
	}

	useEffect( () => {
		const retrieveUser = localStorage.getItem("user");
		if (retrieveUser){
			setUser(JSON.parse(retrieveUser));
		} 
		else{
			setUser(null);
		}

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

		
	}, []);

	if (user != null){
		return (
			<>
				<div className='flex flex-col items-center gap-40 mt-40'>
					<h1 className="mt-6 text-center text-3xl font-bold text-gray-900">Available Surveys</h1>
					{
						user.accountType.match("company") &&
							<button 
								className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700"
								onClick={() => createDisplay()}>
								Create Survey
							</button>
					}
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
													{
														user?.userId.toString() === survey.userId.toString() ? 
														<div>
															<div>
																<button 
																	className="border border-transparent text-orange-600 font-bold hover:text-orange-500 rounded-md"
																	>
																	<Link to={"/{id}" + survey.surveyId}>
																		View Answered Surveys
																	</Link>
																</button>
															</div>
															<div>
																<button 
																	className="border border-transparent text-red-600 font-bold hover:text-red-500 rounded-md"
																	onClick={() => deleteConfirmation(survey.surveyId)}>
																	DELETE
																</button>
															</div>

														</div> 
														:
														<button 
															className="border border-transparent text-orange-600 font-bold hover:text-orange-500 rounded-md"
															>
															Answer Survey
														</button>
													}
												</td>
											</tr>
										)
									}) 
							}
						</tbody>
					</table>
				</div>

				{/* Create Fragment Modal */}
				<Transition.Root show={createModal} as={Fragment}>
					<Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setCreateModal}>
						<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
						</Transition.Child>

						<div className="fixed z-10 inset-0 overflow-y-auto">
						<div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
							<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
							<Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
								<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
									<div>
										<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
											<Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
												Create Survey
											</Dialog.Title>
											{/* Content */}
											<div className="mt-2">
												<form className="mt-8 space-y-6" onSubmit={createSurvey} method="POST">
													<div className="flex flex-col gap-10 rounded-md shadow-sm -space-y-px">
														<div>
															<label htmlFor="title" className="sr-only">
															Title
															</label>
															<input
															id="title"
															name="title"
															type="text"
															required
															className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
															placeholder="Title"
															/>
														</div>
														<div>
															<label htmlFor="q1" className="sr-only">
															Question 1
															</label>
															<input
															id="q1"
															name="q1"
															type="text"
															className="appearance rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
															placeholder="Question 1"
															/>
														</div>
														<div>
															<label htmlFor="q2" className="sr-only">
															Question 2
															</label>
															<input
															id="q2"
															name="q2"
															type="text" 
															className="appearance rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
															placeholder="Question 2"
															/>
														</div>
														<div>
															<label htmlFor="q3" className="sr-only">
															Question 3
															</label>
															<input
															id="q3"
															name="q3"
															type="text" 
															className="appearance rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
															placeholder="Question 3"
															/>
														</div>
													</div>
													<div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
														<button
															type="submit"
															className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
														>
															Create Survey
														</button>
														<button
															type="button"
															className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
															onClick={() => setCreateModal(false)}
															ref={cancelButtonRef}
														>
															Cancel
														</button>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
								
							</Dialog.Panel>
							</Transition.Child>
						</div>
						</div>
					</Dialog>
				</Transition.Root>

				{/* Delete Fragment Modal */}
				<Transition.Root show={deleteModal} as={Fragment}>
					<Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setDeleteModal}>
						<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						>
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
						</Transition.Child>

						<div className="fixed z-10 inset-0 overflow-y-auto">
						<div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
							<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
							<Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
								<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<div className="sm:flex sm:items-start">
									<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
									<Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
										Delete Survey
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-sm text-gray-500">
										Are you sure you want to delete this survey? This action cannot be undone.
										</p>
									</div>
									</div>
								</div>
								</div>
								<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
								<button
									type="button"
									className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
									onClick={() => deleteSurvey()}
								>
									Delete Survey
								</button>
								<button
									type="button"
									className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
									onClick={() => setDeleteModal(false)}
									ref={cancelButtonRef}
								>
									Cancel
								</button>
								</div>
							</Dialog.Panel>
							</Transition.Child>
						</div>
						</div>
					</Dialog>
				</Transition.Root>
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
