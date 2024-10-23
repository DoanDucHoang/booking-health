import React, { Component } from 'react';
import { connect } from "react-redux";
import './ServiceOderModal.scss'
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker'
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from "react-select"
import { postPatientBookingService } from '../../../../services/userService'
import { Toast, toast } from 'react-toastify';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';
import { getAllCategoryTest } from '../../../../services/userService'

const options = [
  { value: 'Thu phí', label: 'Thu phí' },
  { value: 'Miễn phí', label: 'Miễn phí' },
]

class ServiceOderModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryTests: [],
            nameTest: '',
            quantity: '',
            object: '',
            note: '',
            isShowLoading: false
        }
    }

    componentDidMount() {
        this.props.fetchGetAllCategoryTest()
    }

    async componentDidUpdate(prevProps, prevState) {
         if (prevProps.allCT !== this.props.allCT) {
            let dataSelect = this.buildDataInputSelect(this.props.allCT, 'CT')
            let { resCT } = this.props.allCT
            this.setState({
                categoryTests: dataSelect,
            })
        }
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value
        let stateCopy = { ...this.state }
        stateCopy[id] = valueInput
        this.setState({
            ...stateCopy
        })
    }

     buildDataInputSelect = (inputData, type) => {
        let res = []
        let {language} = this.props
        if (inputData && inputData.length > 0) {
            if (type === 'CT') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.name}` 
                    let labelEn = `${item.name}`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.id
                    res.push(object)
                })
            }
        }
        return res
    }

    handleSaveTest = async () => { 
        this.props.fetchSaveTestContent({
            patientId: this.props.idUser,
            nameTest: this.state.nameTest.label,
            quantity: this.state.quantity,
            object: this.state.object.value,
            note: this.state.note
        })
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }

    handleChangeSelect = async (selectedOption, name) => {
        let stateName = name.name
        let stateCopy = { ...this.state }
        stateCopy[stateName] = selectedOption
        this.setState({
            ...stateCopy
        })
    }

    
    render() {
        let { language, isOpenModal, closeServiceModal, categoryTests, idUser } = this.props
        let doctorIdData = ''
        // if (dataTime && !_.isEmpty(dataTime)) {
        //     doctorIdData = dataTime.doctorId
        // }
        return (
            <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
            >
                <Modal
                    isOpen={isOpenModal}
                    className={'booking-modal-container'}
                    size='lg'
                    centered
                >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id="patient.booking-modal.title"/></span>
                        <span className='right'
                            onClick={closeServiceModal}
                        ><i className="fas fa-times"></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="Tên xét nghiệm: "/></label>
                                <Select
                                    value={this.state.nameTest}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.categoryTests}
                                    name="nameTest"
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="Số lượng: "/></label>
                                <input className='form-control'
                                    value={this.state.quantity}
                                    onChange={(event) => this.handleOnChangeInput(event, 'quantity')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                    <label><FormattedMessage id="Đối tượng: " /></label>
                                    <Select
                                        value={this.state.object}
                                        onChange={this.handleChangeSelect}
                                        options={options}
                                        name="object"
                                    />
                                
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="Ghi chú: "/></label>
                                <textarea className='form-control' 
                                    onChange={(event) => this.handleOnChangeText(event, 'note')}
                                    value={this.state.note}
                                >
                                </textarea>
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                            <button className='btn btn-primary btn-booking-confirm'
                                onClick={ () => this.handleSaveTest()}
                        ><FormattedMessage id="patient.booking-modal.btn-confirm"/>
                        </button>
                        <button className='btn btn-danger btn-booking-cancel'
                            onClick={closeServiceModal}
                        ><FormattedMessage id="patient.booking-modal.btn-cancel"/>
                        </button>
                    </div>
                </div>
                </Modal>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = state => {
    return {    
        language: state.app.language,
        allCT: state.admin.allCT,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGetAllCategoryTest: () => dispatch(actions.fetchGetAllCategoryTest()),
        fetchSaveTestContent: (data) => dispatch(actions.fetchSaveTestContent(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceOderModal);
