import { useState } from "react";
import { Link } from "react-router-dom";

export interface Survey {
	id: number;
	title: string;
}

export default function Surveys() {
	const surveyList: Survey[] = [
		{
			id: 1,
			title: "Title 1",
		},
		{
			id: 2,
			title: "Title 2",
		},
		{
			id: 3,
			title: "Title 3",
		},
		{
			id: 4,
			title: "Title 4",
		},
		{
			id:5,
			title: "Title 5",
		},
		{
			id: 6,
			title: "Title 6",
		},
	];

	const [surveys, setSurveys] = useState(surveyList);

	return (
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
						surveys.map(({ id, title }) => (
							<tr>
								<td className='border-t-2 border-gray-500 text-center px-4 py-2 border-r-2'>{id}</td>
								<td className='border-t-2 border-gray-500 text-center px-4 py-2 border-r-2'>{title}</td>
								<td className='border-t-2 border-gray-500 text-center px-4 py-2'>
									<button className="border border-transparent text-orange-600 font-bold hover:text-orange-500 rounded-md">
										<Link to={id.toString()}>Answer</Link>
									</button>
								</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
	);
}
