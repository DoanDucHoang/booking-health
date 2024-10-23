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

const options = [
  { value: 'uống', label: 'Uống' },
  { value: 'nhai', label: 'Nhai' },
  { value: 'ngậm', label: 'Ngậm' },
  { value: 'tiêm', label: 'tiêm' },
]

const times = [
  { value: 'sang', label: 'sáng' },
  { value: 'trua', label: 'Trưa' },
  { value: 'chieu', label: 'Chiều' },
  { value: 'toi', label: 'Tối' },
  { value: 'sang,trua', label: 'Sáng, Trưa' },
  { value: 'sang,chieu', label: 'Sáng, Chiều' },
]

const meals = [
  { value: 'truoc', label: 'Trước khi ăn' },
  { value: 'sau', label: 'Sau khi ăn' },
]

class PrescriptionModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listDiagnose: [],
            idDiagnose: '',
            using: '',
            quantityPerDay: '',
            time: '',
            timeInDay: '',
            meal: '',
            searchIdDiagnose: '',
            searchNameDiagnose: '',
            category: '',
            unit: '',
            note: '',
            totalPages: '',
            totalItems: '',
            quantity: '',
            isShowLoading: false,
            page: 1,
        }
    }

    async componentDidMount() {
        this.props.getAllUnitMedicine()
        this.props.fetchGetAllCategoryTest()
        this.props.getAllCategoryMedicine()
        this.props.getAllMedicine({
            limit: 10,
            page: 1,
            keyword: "",
        })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.allMedicine !== this.props.allMedicine) {
            let { totalPages, totalItems } = this.props.allMedicine
            this.setState({
                totalPages: totalPages,
                totalItems: totalItems
            })
        }

        if (prevState.page !== this.state.page) { 
            this.props.getAllMedicine({
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

    handleOnChangeDiagnose = (item) => { 
        this.setState({
            idDiagnose: item.id,
            nameDiagnose: item.name,
            content: item.content,
            producer: item.producer,
            country: item.country,
            numberR: item.numberR,
            category: this.buildDataInputSelect(item.categoryId, "CM"),
            unit: this.buildDataInputSelect(item.unitId, "UM"),
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

    buildDataInputSelect = (id, type) => {
        if (type === 'CM') {
            const data = this.props.allCM.data.find((item) => item.id == id)?.name
            return data
        } else { 
            const data = this.props.allUnit.data.find((item) => item.id == id)?.name
            return data
        }
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
        this.props.getAllMedicine({
            limit: 10,
            page: 1,
            keyword: this.state.searchNameDiagnose,
        })
    }

    
    render() {
        let { language, isOpenModal, closeServiceModal, categoryTests, idUser } = this.props
        let doctorIdData = ''
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
                        <span className='left'><FormattedMessage id="Thông tin thuốc"/></span>
                        <span className='right'
                            onClick={closeServiceModal}
                        ><i className="fas fa-times"></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        <div className='row'>
                            <div className='col-1 form-group'>
                                    <label><FormattedMessage id="Mã thuốc: " /></label>
                                    <input className='form-control'
                                        value={this.state.idDiagnose}
                                        onChange={(event) => this.handleOnChangeInput(event, 'idDiagnose')}
                                    />
                            </div>
                            <div className='col-4 form-group'>
                                <label><FormattedMessage id="Tên thuốc: "/></label>
                                <input className='form-control'
                                    value={this.state.nameDiagnose}
                                    onChange={(event) => this.handleOnChangeInput(event, 'nameDiagnose')}
                                />
                            </div>
                            <div className='col-4 form-group'>
                                <label><FormattedMessage id="Hàm lượng: "/></label>
                                <input className='form-control'
                                    value={this.state.content}
                                    onChange={(event) => this.handleOnChangeInput(event, 'nameDiagnose')}
                                />
                            </div>
                            <div className='col-3 form-group'>
                                <label><FormattedMessage id="Loại thuốc: "/></label>
                                <input className='form-control'
                                    value={this.state.category}
                                    onChange={(event) => this.handleOnChangeInput(event, 'nameDiagnose')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="Nhà sản xuất: "/></label>
                                <input className='form-control'
                                    value={this.state.producer}
                                    onChange={(event) => this.handleOnChangeInput(event, 'nameDiagnose')}
                                />
                            </div>
                            <div className='col-2 form-group'>
                                <label><FormattedMessage id="Quốc gia: "/></label>
                                <input className='form-control'
                                    value={this.state.country}
                                    onChange={(event) => this.handleOnChangeInput(event, 'nameDiagnose')}
                                />
                            </div>
                            <div className='col-2 form-group'>
                                <label><FormattedMessage id="Số đăng ký: "/></label>
                                <input className='form-control'
                                    value={this.state.numberR}
                                    onChange={(event) => this.handleOnChangeInput(event, 'nameDiagnose')}
                                />
                            </div>
                            <div className='col-1 form-group'>
                                <label><FormattedMessage id="Đơn vị: "/></label>
                                <input className='form-control'
                                    value={this.state.unit}
                                    onChange={(event) => this.handleOnChangeInput(event, 'nameDiagnose')}
                                />
                            </div>
                            <div className='col-1 form-group'>
                                <label><FormattedMessage id="Số lượng: "/></label>
                                <input className='form-control'
                                    value={this.state.quantity}
                                    onChange={(event) => this.handleOnChangeInput(event, 'quantity')}
                                />
                            </div>
                            <div className='col-2 form-group'>
                                <label><FormattedMessage id="Cách dùng: "/></label>
                                <Select
                                    value={this.state.using}
                                    onChange={this.handleChangeSelect}
                                    options={options}
                                    name="using"
                                />
                            </div>
                            <div className='col-2 form-group'>
                                <label><FormattedMessage id="Số lượng/ngày: "/></label>
                                <input className='form-control'
                                    value={this.state.quantityPerDay}
                                    onChange={(event) => this.handleOnChangeInput(event, 'quantityPerDay')}
                                />
                            </div>
                            <div className='col-2 form-group'>
                                <label><FormattedMessage id="Số lần chia: "/></label>
                                <input className='form-control'
                                    value={this.state.time}
                                    onChange={(event) => this.handleOnChangeInput(event, 'time')}
                                />
                            </div>
                            <div className='col-2 form-group'>
                                <label><FormattedMessage id="Vào lúc: "/></label>
                                <Select
                                    value={this.state.timeInDay}
                                    onChange={this.handleChangeSelect}
                                    options={times}
                                    name="timeInDay"
                                />
                                <Select
                                    value={this.state.meal}
                                    onChange={this.handleChangeSelect}
                                    options={meals}
                                    name="meal"
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
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id="Tên thuốc: "/></label>
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
                                <FormattedMessage id="Danh sách thuốc: " />
                            </h4>
                            <Table
                                hover
                                responsive
                                striped
                                size="sm"
                            >
                                <thead>
                                    <tr>
                                    <th>
                                        Mã thuốc
                                    </th>
                                    <th>
                                        Tên thuốc
                                    </th>
                                    <th>
                                        Hàm lượng
                                    </th>
                                    <th>
                                        Loại thuốc
                                    </th>
                                    <th>
                                        Nhà sản xuất
                                    </th>
                                    <th>
                                        Quốc gia
                                    </th>
                                    <th>
                                        Số đăng ký
                                    </th>
                                    <th>
                                        Đơn vị tính
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.allMedicine.data && this.props.allMedicine.data.length > 0 ? 
                                        this.props.allMedicine.data.map((item, index) => { 
                                            return (
                                                <tr key={index}>
                                                    <td>{ item.id}</td>
                                                    <td>{ item.name}</td>
                                                    <td>{ item.content}</td>
                                                    <td>{ this.buildDataInputSelect(item.categoryId, "CM")}</td>
                                                    <td>{ item.producer}</td>
                                                    <td>{ item.country}</td>
                                                    <td>{ item.numberR}</td>
                                                    <td>{ this.buildDataInputSelect(item.unitId, "UM")}</td>
                                                    <button className='btn-plus'
                                                        onClick={ () => this.handleOnChangeDiagnose(item)}
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
                                onClick={() => this.props.onChangeMedicine(
                                    this.state.nameDiagnose,
                                    this.state.content,
                                    this.state.unit,
                                    this.state.quantity,
                                    this.state.note,
                                    this.state.using,
                                    this.state.quantityPerDay,
                                    this.state.using,
                                    this.state.time,
                                    this.state.timeInDay,
                                    this.state.meal
                                )}
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
        allMedicine: state.admin.allMedicine,
        allUnit: state.admin.allUnit,
        allCM: state.admin.allCM,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGetAllCategoryTest: () => dispatch(actions.fetchGetAllCategoryTest()),
        fetchSaveTestContent: (data) => dispatch(actions.fetchSaveTestContent(data)),
        getAllDiagnose: (data) => dispatch(actions.fetchGetAllDiagnose(data)),
        getAllMedicine: (data) => dispatch(actions.fetchGetAllMedicine(data)),
        getAllUnitMedicine: () => dispatch(actions.fetchGetAllUnitMedicine()),
        getAllCategoryMedicine: () => dispatch(actions.fetchGetAllCategoryMedicine()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionModal);
