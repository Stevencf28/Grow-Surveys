import React, { Component } from 'react';

// NOT COMPLETE

export class Surveys extends Component {
    constructor(props) {
        super(props);
        this.state = {surveys: this.props.surveys}
    }

    render(){
        return(
            <div className='container'>
                <h1 className='header'>Available Surveys</h1>
                <table className='table'>
                    <thead>
                        <tr>
                            <th scope='col'>Title</th>
                            <th scope='col'>Active</th>
                            <th scope='col'></th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${
                            this.state.surveys.forEach(survey => {
                                <tr>
                                    <td>
                                        survey.Title
                                    </td>
                                    <td>
                                        survey.Active
                                    </td>
                                    <td>
                                        if (survey.UserId == user.UserId){
                                            <a href="/surveys/survey.SurveyId/answers">View Answers</a>
                                        } else {
                                            <a href="/surveys/survey.SurveyId/answer">Answer Survey</a>
                                        }
                                    </td>
                                    <td>
                                        if (survey.UserId == user.UserId){
                                            <a href="/surveys/survey.SurveyId/delete">Delete</a>
                                        }
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
