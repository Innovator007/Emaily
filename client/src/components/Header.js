import React, { Component } from 'react';
import M from "materialize-css/dist/js/materialize.min.js";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
	componentDidMount() {
		var elems = document.querySelector('.sidenav');
		var instances = M.Sidenav.init(elems, {
			edge: "left",
	    	inDuration: 250
		});
	}
	renderContent() {
		switch(this.props.auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<a href="/auth/google" className="waves-effect btn">
							{'login with google'.toUpperCase()}
						</a>
					</li>
				);
			default:
				return [
					<li key="4">
						<Link to="/surveys">DashBoard</Link>
					</li>,
					<li key="2">
						<Link to="#!">Credits : {this.props.auth.credits}</Link>
					</li>,
					<li key="3">
						<a href="/api/logout" className="waves-effect btn">
							{'logout'.toUpperCase()}
						</a>
					</li>
				];
		}
	}

	render() {
		return (
			<React.Fragment>
				<ul id="slide-out" className="sidenav">
                    { this.renderContent() }
                </ul>
                <div className="navbar-fixed">
				<nav>
				    <div className="nav-wrapper container">
					    <Link 
					    	to={ this.props.auth ? "/surveys" : "/" } 
					    	className="brand-logo"
					    >
					    	Emaily
					    </Link>
					    <a href="#" data-target="slide-out" className="sidenav-trigger">
		                    <i className="material-icons">menu</i>
		                </a>
					    <ul id="nav-mobile" className="right hide-on-med-and-down">
					        { this.renderContent() }
					    </ul>
				    </div>
				</nav>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	return { auth };
}

export default connect(mapStateToProps)(Header);