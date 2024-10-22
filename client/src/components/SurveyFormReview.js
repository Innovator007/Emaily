import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) =>  {
    const reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div key={name}>
                <label>{ label }</label>
                <p>{ formValues[name] }</p>
            </div>
        );
    });
    return (
        <div className="container">
            <h3>Please Review your entries</h3>
            {reviewFields}
            <button onClick={onCancel} className="yellow darken-3 white-text btn waves-effect">Go Back</button>
            <button onClick={() => submitSurvey(formValues, history)} className="green white-text right btn waves-effect">Send Survey<i className="material-icons right">email</i></button>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        formValues: state.form.surveyForm.values
    };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));