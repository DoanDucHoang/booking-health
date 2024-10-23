import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Register.scss';
import { FormattedMessage } from 'react-intl';
import { handleregisterApi } from '../../services/userService';
import { createNewUserService } from '../../services/userService'
import { emitter } from '../../utils/emitter';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            password: '',
            roleId: 'R3',
            errMessage: '',
            genderData: [
                'Nam',
                'Nữ',
                'Khác',
            ],
        }
    }

    handleOnChangeFirstName = (event) => {
        this.setState({
            firstName: event.target.value
        })
    }

    handleOnChangeLastName = (event) => {
        this.setState({
            lastName: event.target.value
        })
    }

    handleOnChangeAddress = (event) => {
        this.setState({
            address: event.target.value
        })
    }

    handleOnChangePhone = (event) => {
        this.setState({
            phoneNumber: event.target.value
        })
    }

    handleOnChangeGender = (event) => {
        this.setState({
            gender: event.target.value
        })
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleRegister = async (data) => {
        this.setState({
            errMessage: ''
        })
        try {
            // let res = await createNewUserService(data)
            // if (res && res.errCode !== 0) {
            //     alert(res.errMessage)
            // } else {
            //     await this.getAllUsersFromReact()
            //     this.setState({
            //         isOpenModalUser: false
            //     })
            //     emitter.emit('EVENT_CLEAR_MODAL_DATA')
            // }
            // console.log( this.state);
        } catch (e) {
            if(e.response){
                if(e.response.data){
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
            
        }    
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value

        this.setState({
            ...copyState
        })
    }

    handleKeyDown = (event) => {
        if (event.key === "Enter" || event.keyCode === 13) {
            this.handleRegister()
        }
    }

    render() {
        //JSX
        let { userInfo } = this.props
        userInfo = this.state.dataUser
        return (
           <div className='register-background'>
                <div className='register-container'>
                    <div className='register-content row'>
                        <div className='col-12 text-register'>Signup</div>
                        <div className='col-12 form-group register-input'>
                            <label>Email:</label>
                            <input type='text' 
                            className='form-control' 
                            placeholder='Enter your email'
                            value={this.state.email}
                            onChange={(event) => this.handleOnChangeEmail(event)}
                            />
                        </div>
                        <div className='col-12 form-group register-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'} 
                                    className='form-control' 
                                    placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />
                                <span onClick={() => {this.handleShowHidePassword()}}>
                                    <i className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-6 form-group register-input'>
                            <label>First Name:</label>
                            <input type='text' 
                            className='form-control' 
                            placeholder='Enter your first name'
                            value={this.state.firstName}
                            onChange={(event) => this.handleOnChangeFirstName(event)}
                            />
                        </div>
                        <div className='col-6 form-group register-input'>
                            <label>Last Name:</label>
                            <input type='text' 
                            className='form-control' 
                            placeholder='Enter your last name'
                            value={this.state.lastName}
                            onChange={(event) => this.handleOnChangeLastName(event)}
                            />
                        </div>
                        <div className='col-6 form-group register-input'>
                            <label>Phone:</label>
                            <input type='text' 
                            className='form-control' 
                            placeholder='Enter your phone'
                            value={this.state.phoneNumber}
                            onChange={(event) => this.handleOnChangePhone(event)}
                            />
                        </div>
                        <div className='col-6 form-group register-input'>
                            <label>Gender:</label>
                            <select className="form-control"
                                onChange={(event) => { this.handleOnChangeGender(event, 'gender') }}
                                value={this.state.gender}
                            >
                                {this.state.genderData && this.state.genderData.length > 0 &&
                                    this.state.genderData.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {item}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='col-12 form-group register-input'>
                            <label>Address:</label>
                            <input type='text' 
                            className='form-control' 
                            placeholder='Enter your address'
                            value={this.state.address}
                            onChange={(event) => this.handleOnChangeAddress(event)}
                            />
                        </div>
                        
                        
                        <div className='col-12' style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        
                        <div className='col-12'>
                            <button className='btn-register' onClick={() => {this.handleRegister()}}>Signup</button>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-register'>Or signup with:</span>
                        </div>
                        <div className='col-12 social-register'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userregisterSuccess: (userInfo) => dispatch(actions.userregisterSuccess(userInfo)),
        // userregisterFail: () => dispatch(actions.userregisterFail()),
        //userregisterSuccess: (userInfo) => dispatch(actions.userregisterSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
