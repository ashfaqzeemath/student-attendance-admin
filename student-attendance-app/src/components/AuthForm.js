import logo200Image from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { signIn } from '../service/auth.service';
import { withRouter } from 'react-router-dom'

class AuthForm extends React.Component {
  

  constructor(props) {
    super(props);    
    const initInputError = { errorMessage: "",
                              overall: false,
                              required: false,
                              inavlid: false };
    this.state = {username: "", password: "", usernameError: initInputError, passwordError: initInputError}
  }

  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  handleSubmit = event => {
    
    //   console.log('Handle submit:',JSON.stringify(this.props, null, 2));
    // event.preventDefault();
    if (this.state.username != null && this.state.password != null) {     
      // this.props.history.push("/"); 
      
      signIn(this.state.username, this.state.password)
      .then(
        res => res.json()
      )
      .then(json => {
        console.log(JSON.stringify(json, null, 2));
        if (json.statusCode === 200) {
          //call was sucssess.
          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
    
  };

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isSignup) {
      return 'Signup';
    }

    return buttonText;
  }

  render() {
    const {
      showLogo,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      children,
      onLogoClick,
    } = this.props;



    return (
      <Form>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo200Image}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              onClick={onLogoClick}
            />
          </div>
        )}
        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          {/* <Input {...usernameInputProps} /> */}
          {console.log(usernameInputProps)}
          <Input {...usernameInputProps} 
                    value={this.state.username}
                    onChange={(event) => this.setState({username: event.target.value})}
                    onBlur={
                      (event) => {
                        if (event.target.value.trim() === "") {
                          this.setState({usernameError: 
                                          {errorMessage: "This field is required",
                                          overall: true,
                                          required: true,
                                          inavlid: false}})
                        }
                      }
                    }/>
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          {/* <Input {...passwordInputProps} /> */}
          <Input {...passwordInputProps} 
                    value={this.state.password}
                    onChange={(event) => this.setState({password: event.target.value})}
                    onBlur={
                      (event) => {
                        if (event.target.value.trim() === "") {
                          this.setState({passwordError: 
                                          {errorMessage: "This field is required",
                                          overall: true,
                                          required: true,
                                          inavlid: false}})
                        }
                      }
                    }/>
        </FormGroup>
        {this.isSignup && (
          <FormGroup>
            <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
            <Input {...confirmPasswordInputProps} />
          </FormGroup>
        )}
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            {this.isSignup ? 'Agree the terms and policy' : 'Remember me'}
          </Label>
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.handleSubmit}>
          {this.renderButtonText()}
        </Button>

        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
            {this.isSignup ? (
              <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                Login
              </a>
            ) : (
              <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                Signup
              </a>
            )}
          </h6>
        </div>

        {children}
      </Form>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Username',
  usernameInputProps: {
    type: 'text',
    placeholder: 'asze',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
  },
  onLogoClick: () => {},
};

export default withRouter (AuthForm);
