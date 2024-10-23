import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeFooter extends Component {
    
    render() {

        return (
            <div className='home-footer'>
                <strong>
                    <p>Copyright &copy; 2024 Made By
                    <a target='_blank' href='https://www.facebook.com/duyanh.vu.39566/'> Doan Duc Hoang.</a></p>
                </strong>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        //inject
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
