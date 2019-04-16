import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
    render() {
        return (
            <StripeCheckout
                name="Emaily"
                description="$2.5 for 5 email survey credits" 
                amount={250}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <a className="btn-floating blue"><i className="material-icons">credit_card</i></a>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);