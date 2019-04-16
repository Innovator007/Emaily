import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmail from '../utils/validateEmail';
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, ({ name, label }) => {
            return <Field key={name} type="text" component={SurveyField} name={name} label={label} />
        });
    }
    render() {
        return (
            <div className="container">
                <h3>Create a New Survey</h3>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn waves-effect waves-red white-text">
                        Cancel
                    </Link>
                    <button className="teal btn waves-effect waves-teal right white-text" type="submit">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};
    errors.recipients = validateEmail(values.recipients || '');
    _.each(formFields, ({ name }) => {
        if(!values[name]) {
            errors[name] = 'You must provide a value';
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: "surveyForm",
    destroyOnUnmount: false
})(SurveyForm);