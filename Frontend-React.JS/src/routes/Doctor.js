import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
import Header from '../containers/Header/Header';
import ManagePatient from '../containers/System/Doctor/ManagePatient'
import ManageServicesOder from '../containers/System/Doctor/ManageServicesOder'
import ManageServicesOderDetail from '../containers/System/Doctor/ManageServiceOderDetail'
import ManagePrescription from '../containers/System/Doctor/ManagePrescription'
import ManagePrescriptionDetail from '../containers/System/Doctor/ManagePrescriptionDetail'

class Doctor extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/doctor/manage-schedule" component={ManageSchedule} />
                            <Route path="/doctor/manage-patient" component={ManagePatient} />
                            <Route path="/doctor/manage-service-orders" component={ManageServicesOder} />
                            <Route path="/doctor/manage-service-orders-detail/:id" component={ManageServicesOderDetail} />
                            <Route path="/doctor/manage-test-result" component={ManagePatient} />
                            <Route path="/doctor/manage-prescription" component={ManagePrescription} />
                            <Route path="/doctor/manage-prescription-detail/:id" component={ManagePrescriptionDetail} />
                            {/* <Route component={() => { return (<Redirect to={ManagePatient} />) }} /> */}
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
