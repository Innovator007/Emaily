import React, { Component } from 'react';
import M from "materialize-css/dist/js/materialize.min.js";
import { Link } from 'react-router-dom';
import Payments from './Payments';
import SurveyList from './SurveyList';

class Dashboard extends Component {
    componentDidMount() {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems, {
            direction: "top",
            hoverEnabled: false
        });
    }
    render() {
        return (
            <div className="container">
                <h2>Surveys</h2>
                <SurveyList />
              
                <div className="fixed-action-btn">
                  <a className="btn-floating btn-large red">
                    <i className="large material-icons">create</i>
                  </a>
                  <ul>
                    <li><Payments /></li>
                    <li><Link to="/surveys/new" className="btn-floating teal"><i className="material-icons">add</i></Link></li>
                  </ul>
                </div>
            </div>
        );
    }
}

export default Dashboard;