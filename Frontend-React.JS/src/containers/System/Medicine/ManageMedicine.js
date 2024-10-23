import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from '../../../store/actions'
import './ManageMedicine.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import TableManageUser from './../Admin/TableManageUser';

class ManageMedicine extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            genderAll: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            userEditId: '',
            action: '',
        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snaptshot) {
        
    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address',]
        for (let i = 0; i < arrCheck.length; i++){
            if (!this.state[arrCheck[i]]) {
                isValid = false
                alert('Missing required parameter: ' + arrCheck[i])
                break
            }
        }
        return isValid
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value

        this.setState({
            ...copyState
        })
    }

    handleEditUserFromParent = (user) => {
        let imgBase64 = '';
        if (user.image) {
            imgBase64 = new Buffer.from(user.image, 'base64').toString('binary')
        }

        this.setState({
                email: user.email,
                password: 'secrethehe',
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phonenumber,
                address: user.address,
                gender: user.gender,
                position: user.positionId,
                role: user.roleId,
                avatar: '',
                previewImgURL: imgBase64,
                action: CRUD_ACTIONS.EDIT,
                userEditId: user.id
            })
    }

    render() {
        let genderData = this.state.genderAll;
        let language = this.props.language;        
        let {email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar} = this.state
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    <FormattedMessage id="manage-user.title"/> 
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-4'><strong><FormattedMessage id="manage-user.add"/></strong></div>
                            <div className='row col-12 my-2'>
                                <div className='col-3'>
                                    <label><FormattedMessage id="Mã thuốc"/></label>
                                    <input className='form-control' type='email'
                                        value={email}
                                        onChange={(event) => { this.onChangeInput(event, 'email') }}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    />
                                </div>
                                <div className='col-5'>
                                    <label><FormattedMessage id="Tên thuốc"/></label>
                                    <input className='form-control' type='text'
                                        value={firstName}
                                        onChange={(event) => {this.onChangeInput(event, 'firstName')}}
                                    />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="Giá thuốc"/></label>
                                    <input className='form-control' type='text'
                                        value={lastName}
                                        onChange={(event) => {this.onChangeInput(event, 'lastName')}}
                                    />
                                </div>
                            </div>
                            <div className='row col-12 my-2'>
                                <div className='col-3'>
                                    <label><FormattedMessage id="Loại thuốc"/></label>
                                    <select className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                        value={gender}
                                    >
                                        {genderData && genderData.length > 0 &&
                                            genderData.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id="Đơn vị"/></label>
                                    <select className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                        value={gender}
                                    >
                                        {genderData && genderData.length > 0 &&
                                            genderData.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='col-12 mb-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit" />
                                        : <FormattedMessage id="manage-user.save" />}    
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser
                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
                            </div>  
                        </div>
                    </div>
                </div>
                
                
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.fetchCreateNewUser(data)),
        editUser: (data) => dispatch(actions.fetchEditUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageMedicine);
