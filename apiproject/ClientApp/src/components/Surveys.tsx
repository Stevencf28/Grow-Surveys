import { useState } from "react";

export default function Surveys() {
	const surveyList = [
		{
			id: 1,
			title: "Title 1",
		},
		{
			id: 2,
			title: "Title 2",
		},
	];

	const [surveys, setSurveys] = useState(surveyList);

	return (
		<div className='container mx-auto'>
			<h1>Available Surveys</h1>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Title</th>
					</tr>
				</thead>
				<tbody>
					{surveys.length &&
						surveys.map((survey) => (
							<tr>
								<td>{survey.id}</td>
								<td>{survey.title}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}
