import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageServicesOder.scss'
import { LANGUAGES } from '../../../utils'
import DatePicker from '../../../components/Input/DatePicker'
import { FormattedMessage } from 'react-intl';
import { getListPatientForDoctorService, sendRemedyService, getAllCodeService, cancelPatientService } from '../../../services/userService';
import moment from 'moment';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import _ from 'lodash';

class ManageServicesOder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
            listStatus: []
        }
    }

    async componentDidMount() {
        await this.getDataPatient()
    }

    getDataPatient = async () => {
        let { user } = this.props
        let { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime()
        let res = await getListPatientForDoctorService({
            doctorId: user.id,
            date: 'ALL',
            statusId: 'ALL'
        })

        let resStatus = await getAllCodeService('STATUS')

            if (res && res.errCode === 0 && resStatus && resStatus.errCode === 0) {

                let dataStatus = resStatus.data

                if (dataStatus && dataStatus.length > 0) {
                    dataStatus.unshift({
                        createdAt: null,
                        keyMap: 'ALL',
                        type: "STATUS",
                        valueEn: "All",
                        valueVi: 'Tất cả'
                    })
                }

                this.setState({
                    dataPatient: res.data,
                    listStatus: dataStatus ? dataStatus : []
                })
            }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        },async () => {
            await this.getDataPatient()
        })
    }

    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            patientEmail: item.patientData.email,
            patientName: item.patientData.firstName,
            timeType: item.timeType
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }

    handleBtnCancel = async (item) => {
        let res = await cancelPatientService({
            doctorId: item.doctorId,
            patientId: item.patientId,
        })
        if (res && res.errCode === 0) {
            toast.success('Cancel appointment succeed!')
            await this.getDataPatient()
        } else {
            toast.error('Cancel appointment failed!')
        }
    }

    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state
        this.setState({
            isShowLoading: true
        })

        let res = await sendRemedyService({
            email: dataChild.email,
            imageBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        })
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Send remedy succeed!')
            this.closeRemedyModal()
            await this.getDataPatient()
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Send remedy failed!')
        }
    }

    handleFormatDate = (date) => { 
        let formatDate = new Intl.DateTimeFormat('en-US').format(date);
        return formatDate;
    }

    handleViewServiceOder = (id) => { 
        if (this.props.history) {
            this.props.history.push(`/doctor/manage-service-orders-detail/${id}`)
        }
    }

    handleOnChangeSelect = async (event) => {
        let { user } = this.props
        let { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime()
        let res = await getListPatientForDoctorService({
                doctorId: user.id,
                date: formatedDate,
                statusId: event.target.value
            })
            
        if (res && res.errCode === 0) {
            let data = res.data
            this.setState({
                dataPatient: data
            })
        }
    }

    render() {
        let { dataPatient, isOpenRemedyModal, dataModal, listStatus } = this.state
        let { language } = this.props
        console.log(dataPatient);
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <div className='manage-patient-container'>
                        <div className='m-p-title'>
                            <FormattedMessage id="menu.doctor.manage-service-orders"/>
                        </div>
                        <div className='manage-patient-body row'>
                            <div className='col-12 table-manage-patient'>
                                <table id="customers">
                                    <tbody>
                                        <tr>
                                            <th><FormattedMessage id="manage-user.numeric"/></th>
                                            <th>Email</th>
                                            <th><FormattedMessage id="manage-user.time"/></th>
                                            <th><FormattedMessage id="manage-user.name"/></th>
                                            <th><FormattedMessage id="manage-user.gender"/></th>
                                            <th><FormattedMessage id="manage-user.address"/></th>
                                            <th><FormattedMessage id="manage-user.status" /></th>
                                            <th><FormattedMessage id="manage-user.action"/></th>
                                        </tr>
                                        { dataPatient && dataPatient.length > 0 ? 
                                            dataPatient.map((item, index) => {
                                                let time = language === LANGUAGES.VI
                                                    ? item.timeTypeDataPatient.valueVi
                                                    : item.timeTypeDataPatient.valueEn
                                                let gender = language === LANGUAGES.VI
                                                    ? item.patientData.genderData.valueVi
                                                    : item.patientData.genderData.valueEn
                                                let statusCheck = language === LANGUAGES.VI
                                                    ? item.statusTypeDataPatient.valueVi
                                                    : item.statusTypeDataPatient.valueEn
                                                console.log('check: ', item)
                                                return (
                                                    <tr key={index}>
                                                        <td>{ index + 1 }</td>
                                                        <td>{ item.patientData.email}</td>
                                                        <td>{ this.handleFormatDate(item.date) }</td>
                                                        <td>{ item.patientData.firstName}</td>
                                                        <td>{ gender }</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{ statusCheck }</td>
                                                        <td>
                                                            <button className='btn-edit'
                                                                onClick={() => this.handleViewServiceOder(item.patientId)}
                                                            >
                                                                <i className="fas fa-pencil-alt"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })

                                            : <tr></tr>
                                        }
                                    </tbody>    
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenRemedyModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {    
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageServicesOder);
