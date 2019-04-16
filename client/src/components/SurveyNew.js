import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    state = {
        formReview: false
    }

    renderContent() {
        if(this.state.formReview === true) {
            return <SurveyFormReview onCancel={() => this.setState({ formReview: false })} />;
        } else {
            return <SurveyForm onSurveySubmit={() => this.setState({ formReview: true })} />;
        }
    }

    render() {
        return (
            <div>
                { this.renderContent() }
            </div>
        );
    }
}

export default reduxForm({
    form: "surveyForm"
})(SurveyNew);