import React, { Component } from 'react';
import { connect } from "react-redux";
import './DiagnoseModal.scss'
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
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
import PaginationModal from '../../../../components/PaginationModal';

class DiagnoseModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listDiagnose: [],
            idDiagnose: '',
            searchIdDiagnose: '',
            searchNameDiagnose: '',
            note: '',
            totalPages: '',
            totalItems: '',
            isShowLoading: false,
            page: 1,
        }
    }

    async componentDidMount() {
        this.props.fetchGetAllCategoryTest()
        this.props.getAllDiagnose({
            limit: 10,
            page: 1,
            keyword: "",
        })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDiagnose !== this.props.allDiagnose) {
            let { totalPages, totalItems } = this.props.allDiagnose
            this.setState({
                totalPages: totalPages,
                totalItems: totalItems
            })
        }

        if (prevState.page !== this.state.page) { 
            this.props.getAllDiagnose({
                limit: 10,
                page: this.state.page,
                keyword: this.state.searchNameDiagnose,
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

    handleOnChangeDiagnose = (id, name) => { 
        this.setState({
            idDiagnose: id,
            nameDiagnose: name
        })
    }

    onChangePage = (value) => {
        if (value === "previous" || value === "... ") { 
            this.setState({
                page: this.state.page - 1,
            })
        } else if (value === "next" || value === " ...") { 
            this.setState({
                page: this.state.page + 1,
            })
        } else { 
            this.setState({
                page: value
            })
        }
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

    handleSaveTest = () => { 

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

    handleSearchByName = () => { 
        this.props.getAllDiagnose({
            limit: 10,
            page: 1,
            keyword: this.state.searchNameDiagnose,
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
                    size='xl'
                    centered
                >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id="Thông tin chẩn đoán"/></span>
                        <span className='right'
                            onClick={closeServiceModal}
                        ><i className="fas fa-times"></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        <div className='row'>
                            <div className='col-2 form-group'>
                                    <label><FormattedMessage id="Mã chẩn đoán: " /></label>
                                    <input className='form-control'
                                        value={this.state.idDiagnose}
                                        onChange={(event) => this.handleOnChangeInput(event, 'idDiagnose')}
                                    />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="Tên chẩn đoán: "/></label>
                                <input className='form-control'
                                    value={this.state.nameDiagnose}
                                    onChange={(event) => this.handleOnChangeInput(event, 'nameDiagnose')}
                                />
                            </div>
                            <div className='col-4 form-group'>
                                    <label><FormattedMessage id="Lưu ý: " /></label>
                                    <textarea className='form-control' 
                                        onChange={(event) => this.handleOnChangeText(event, 'note')}
                                        value={this.state.note}
                                    >
                                    </textarea>
                                
                            </div>
                        </div>
                        </div>
                        
                        <div className='search booking-modal-body'>
                            <h4>
                                <FormattedMessage id="Tìm kiếm: " />
                            </h4>
                            
                             <div className='row'>
                                <div className='col-2 form-group'>
                                        <label><FormattedMessage id="Mã chẩn đoán: " /></label>
                                        <input className='form-control'
                                            value={this.state.searchIdDiagnose}
                                            onChange={(event) => this.handleOnChangeInput(event, 'searchIdDiagnose')}
                                        />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="Tên chẩn đoán: "/></label>
                                    <input className='form-control'
                                        value={this.state.searchNameDiagnose}
                                        onChange={(event) => this.handleOnChangeInput(event, 'searchNameDiagnose')}
                                    />
                                </div>
                                <div className='col-2 search-btn'>
                                    <button className='btn btn-primary btn-booking-confirm'
                                        onClick={() => this.handleSearchByName()}
                                    >
                                        <FormattedMessage id="Tìm kiếm" />
                                    </button>
                                </div>

                            </div>
                        </div>

                        <div className='list-diagnose booking-modal-body'>
                            <h4>
                                <FormattedMessage id="Danh sách chẩn đoán ICD 10: " />
                            </h4>
                            <Table
                                hover
                                responsive
                                striped
                                size="sm"
                            >
                                <tbody>
                                    {this.props.allDiagnose.data && this.props.allDiagnose.data.length > 0 ? 
                                        this.props.allDiagnose.data.map((item, index) => { 
                                            return (
                                                <tr key={index}>
                                                    <td>{ item.id}</td>
                                                    <td>{ item.name}</td>
                                                    <button className='btn-plus'
                                                        onClick={ () => this.handleOnChangeDiagnose(item.id, item.name)}
                                                    >
                                                        <i class="fas fa-plus-circle"></i>
                                                    </button>
                                                </tr>
                                            )
                                        }) : ""}
                                </tbody>
                            </Table>
                            <PaginationModal
                                totalPages={this.state.totalPages}
                                onChangePage={this.onChangePage}
                                current={this.state.page}
                                limit={10}
                                siblings={ 1}
                            >
                            </PaginationModal>
                        </div>

                    <div className='booking-modal-footer'>
                            <button className='btn btn-primary btn-booking-confirm'
                                onClick={ () => this.props.onChangeDiagnose(this.state.nameDiagnose)}
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
        allDiagnose: state.admin.allDiagnose,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGetAllCategoryTest: () => dispatch(actions.fetchGetAllCategoryTest()),
        fetchSaveTestContent: (data) => dispatch(actions.fetchSaveTestContent(data)),
        getAllDiagnose: (data) => dispatch(actions.fetchGetAllDiagnose(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiagnoseModal);
