import React, { Component, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageServiceOderDetail.scss';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailDoctorInfoService, getAllTestContent, deleteTestContent, getServiceNoteById } from '../../../services/userService';
import DatePicker from '../../../components/Input/DatePicker'
import ServiceOderModal from './Modal/ServiceOderModal';
import DiagnoseModal from './Modal/DiagnoseModal';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
  { value: '300', label: '300' },
  { value: '301', label: '301' },
  { value: '302', label: '302' },
  { value: '303', label: '303' },
  { value: '304', label: '304' },
  { value: '305', label: '305' },
  
]

class ManageServiceOderDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpenModalService: false,
            isOpenModalDiagnose: false,
            detailPatient: {},
            listSpecialty: [],
            listDiagnose: [],
            currentPatientId: '',
            namePatient: '',
            gender: '',
            birthday: '',
            addressPatient: '',
            selectedSpecialty: '',
            selectedDiagnose: '',
            selectedRoom: '',
            diagnostic: '',
            listServices: [],
            dataTest: [],
            dataNote: {},
            hasOldData: false,
            genderAll: [],
            pdfRef: React.createRef()
        }
    }

    async componentDidMount() {
        await this.getDataServiceNote()
        await this.getDataPatientTest()
        this.props.getRequiredDoctorInfo()
        this.props.getGenderStart();
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            this.setState({
                currentPatientId: id
            })
            let res = await getDetailDoctorInfoService(id)
            if (res && res.errCode === 0) {
                this.setState({
                    detailPatient: res.data,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderAll: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }

        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            let { resSpecialty } = this.props.allRequiredDoctorInfo
            let resDiagnose = this.props.allDiagnose
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
            let dataSelectDiagnose = this.buildDataInputSelect(resDiagnose, 'DIAGNOSE')
            this.setState({
                listSpecialty: dataSelectSpecialty,
                listDiagnose: dataSelectDiagnose,
            })
        }

    }

    downloadPDF = () => { 
        const input = this.state.pdfRef.current;
        html2canvas(input).then((canvas) => { 
            const imgData = canvas.toDataURL('img/png')
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('doctor.pdf')
        })
    }

    getDataPatientTest = async () => { 
        let res = await getAllTestContent(this.props.match.params.id)
        this.setState({
            dataTest: res.data
        })
    }

    getDataServiceNote = async () => { 
        let res = await getServiceNoteById(this.props.match.params.id)
        let { listSpecialty } = this.state
        if (res && res.data && res.errCode === 0) { 

            let specialtyId = '', selectedSpecialty = '', roomId = '', selectedRoom = ''

            if (res.data) { 
                specialtyId = res.data.specialtyId
                roomId = res.data.room
                selectedSpecialty = listSpecialty.find(item => { 
                    return item && item.value === specialtyId
                })
                selectedRoom = options.find(item => { 
                    return item && item.value === roomId
                })

                
            }

            this.setState({
                selectedSpecialty: selectedSpecialty,
                selectedRoom: selectedRoom,
            })
        }
        this.setState({
            dataNote: res.data
        })
    }

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state
        this.props.fetchSaveServiceNote({
            userId: this.state.currentPatientId,
            specialtyId: this.state.selectedSpecialty.value,
            room: this.state.selectedRoom.value,
            diagnostic: this.state.selectedDiagnose,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
        })
    }

    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        let stateName = name.name
        let stateCopy = { ...this.state }
        stateCopy[stateName] = selectedOption
        this.setState({
            ...stateCopy
        })
    }

    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }

    handleDeleteTest = async (id) => { 
        try {
            let res = await deleteTestContent(id)
            if (res && res.errCode === 0) {
                await this.getDataPatientTest()
            } else { 
                alert(res.errMessage)
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleClickServiceOder = () => {
        this.setState({
            isOpenModalService: true,
        })
    }

    closeServiceModal = () => {
        this.setState({
            isOpenModalService: false
        })
    }

    handleClickDiagnoseModal = () => {
        this.setState({
            isOpenModalDiagnose: true,
        })
    }

   closeDiagnoseModal = () => {
        this.setState({
            isOpenModalDiagnose: false
        })
    }

    buildDataInputSelect = (inputData, type) => {
        let res = []
        let {language} = this.props
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.lastName} ${item.firstName}` 
                    let labelEn = `${item.firstName} ${item.lastName}`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.id
                    res.push(object)
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn} USD`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    res.push(object)
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {}
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn}`
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    res.push(object)
                })
            }
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {}
                    object.label = item.name
                    object.value = item.id
                    res.push(object)
                })
            }
            if (type === 'DIAGNOSE') {
                inputData.map((item, index) => {
                    let object = {}
                    object.label = item.name
                    object.value = item.id
                    res.push(object)
                })
            }
            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {}
                    object.label = item.name
                    object.value = item.id
                    res.push(object)
                })
            }
        }
        return res
    }

    onChangeDiagnose = (value) => { 
        this.setState({
            selectedDiagnose: value
        })
    }

    //Life cycle
    //Run Component: 1.Run constructor -> initstate 
    // 2. Did mount (set state)
    // 3. Render 
    render() {
        let genderData = this.state.genderAll;
        let { hasOldData, listSpecialty, listClinic, listDiagnose, isOpenModalService, isOpenModalDiagnose, detailPatient, dataTest, gender, dataNote, selectedSpecialty } = this.state
        return (
            <>
                <div className='manage-service-container' ref={ this.state.pdfRef }>
                <div className='manage-service-title'><FormattedMessage id="menu.doctor.service-orders"/></div>
                <div className='more-service-info'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="Họ tên người bệnh: "/></label>
                        <input className='form-control'
                            disabled      
                            onChange={(event) => this.handleOnChangeText(event, 'namePatient')}
                            value={this.state.detailPatient.firstName}
                        />
                    </div>
                    <div className='col-2 form-group'>
                        <label><FormattedMessage id="Giới tính: "/></label>
                        {/* <div>
                            <input type="radio" value="MALE" name="gender" checked/> Nam
                            <input type="radio" value="FEMALE" name="gender"/> Nữ
                        </div> */}
                        <select className="form-control"
                            disabled
                            onChange={(event) => { this.onChangeInput(event, 'gender') }}
                            value={gender}
                        >
                            {genderData && genderData.length > 0 &&
                                genderData.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {item.valueVi}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    
                    <div className='col-2'>
                        <label><FormattedMessage id="patient.booking-modal.birthday"/></label>
                        <DatePicker
                            disabled
                            onChange={this.handleOnchangeDatePicker}
                            className='form-control'
                            value={this.state.birthday}
                        />
                    </div>
                </div>
                <div className='more-service-info row'>
                    <div className='col-4'>
                        <label><FormattedMessage id="Địa chỉ: "/></label>
                        <input className='form-control' 
                            disabled
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.detailPatient.address}
                        />
                    </div>
                    <div className='col-4'>
                            <label><FormattedMessage id="Chyên khoa: " /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.specialty"/>}
                            name="selectedSpecialty"
                        />
                    </div>
                    <div className='col-2'>
                        <label><FormattedMessage id="Phòng: "/></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={options}
                            placeholder={<FormattedMessage id="Phòng khám"/>}
                            name="selectedRoom"
                        />
                    </div>
                </div>
                <div className='more-service-info row'>
                    <div className='col-12'>
                            <button className='btn btn-primary my-3'
                                onClick={() => this.handleClickDiagnoseModal()}
                                data-html2canvas-ignore="true"
                            >
                                Chọn chẩn đoán
                            </button>
                            <DiagnoseModal
                                isOpenModal={isOpenModalDiagnose}
                                closeServiceModal={this.closeDiagnoseModal} 
                                onChangeDiagnose={this.onChangeDiagnose}
                            />
                            <label><FormattedMessage id="Chẩn đoán: " /></label>
                            <input className='form-control'                              
                                onChange={(event) => this.handleOnChangeText(event, 'selectedSpecialty')}
                                value={dataNote?.diagnostic ? dataNote.diagnostic : this.state.selectedDiagnose}
                            />
                    </div>
                </div>

                <div className='col-12 table-manage-patient'>
                    <button className='btn btn-primary my-3'
                        onClick={() => this.handleClickServiceOder()}
                        data-html2canvas-ignore="true"
                    >
                        Thêm dịch vụ
                    </button>
                                <table id="customers">
                                    <tbody>
                                        <tr>
                                            <th><FormattedMessage id="manage-user.numeric"/></th>
                                            <th>Nội dung </th>
                                            <th>Số lượng</th>
                                            <th>Đối tượng</th>
                                            <th>Ghi chú</th>
                                    <th data-html2canvas-ignore="true">
                                        hành động
                                    </th>   
                                </tr>
                                {dataTest && dataTest.length > 0 ? 
                                    dataTest.map((item, index) => { 
                                        return (
                                            <tr key={index}>
                                                <td>{ index + 1 }</td>
                                                <td>{ item.nameTest}</td>
                                                <td>{ item.quantity}</td>
                                                <td>{ item.object }</td>
                                                <td>{item.note}</td>
                                                <td data-html2canvas-ignore="true">
                                                <button className='btn-trash'
                                                    onClick={ () => this.handleDeleteTest(item.id)}
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                                </td>
                                            </tr>
                                        )
                                    }) : ""}
                                    </tbody>    
                                </table>
                            </div>
                <button className={hasOldData === true ? "btn btn-warning my-3" : "btn btn-primary my-3" }
                        onClick={() => this.handleSaveContentMarkdown()}
                        data-html2canvas-ignore="true"
                >
                    {hasOldData === true ? <FormattedMessage id="manage-doctor.edit" />
                                        : <FormattedMessage id="manage-doctor.save" />}   
                    </button>
                    <button className='btn btn-warning my-3' onClick={ this.downloadPDF} data-html2canvas-ignore="true">
                        Download PDF
                </button>
            </div>
                <ServiceOderModal
                idUser={ this.state.currentPatientId }
                isOpenModal={isOpenModalService}
                closeServiceModal={this.closeServiceModal} 
            />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
        language: state.app.language,
        genderRedux: state.admin.genders,
        allDiagnose: state.admin.allDiagnose,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGetAllDoctors: () => dispatch(actions.fetchGetAllDoctors()),
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
        fetchSaveInfoDoctors: (data) => dispatch(actions.fetchSaveInfoDoctors(data)),
        fetchSaveServiceNote: (data) => dispatch(actions.fetchSaveServiceNote(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageServiceOderDetail);
