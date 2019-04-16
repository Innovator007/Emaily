import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Landing extends React.Component {
	renderContent() {
		switch(this.props.auth) {
			case null:
				return;
			case false:
				return(
					<a href="/auth/google" className="waves-effect waves-light btn">
						{'login with google'.toUpperCase()}
					</a>
				);
			default:
				return(
					<Link className="waves-effect waves-light btn" to="/surveys">{'go to dashboard'.toUpperCase()}</Link>
				);
		}
	}
	render() {
		return (
			<div className="container" style={{ textAlign: 'center' }}>
				<h1>Emaily!</h1>
				<h4>Collect Feedback from your users</h4>
				{this.renderContent()}
			</div>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	return { auth };
}

export default connect(mapStateToProps)(Landing);