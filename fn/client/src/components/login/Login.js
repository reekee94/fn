import React, { useState, useEffect } from 'react';
import './Login.css';
import { Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { setUserLogged, setUserLoading } from "../../actions";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../Loading-spinner";
import { SignupSchemaLogin } from '../../configs/login-register-config'
import withStoreService from "../hoc";


const addDataToLocalStorage = (token) => {
    localStorage.setItem('accessToken', JSON.stringify(token.accessToken));
    localStorage.setItem('refreshToken', JSON.stringify(token.refreshToken));
    localStorage.setItem('userId', JSON.stringify(token.userId))
}

const USER_DATA = {
    email: '',
    password: ''
};
const eye = <FontAwesomeIcon icon={faEye} />;

const Login = (props, { storeService }) => {
    const [user, setUser] = useState(USER_DATA);
    const [errorMsg, setErrorMsg] = useState('');
    const { setUserLogged, setUserLoading, userLogged, userLoading } = props;
    const { register, errors, handleSubmit } = useForm({
        validationSchema: SignupSchemaLogin
    });
    const [passwordShown, setPasswordShown] = useState(false);

    useEffect(() => {
        setUserLogged(false)
    }, [setUserLogged])

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const handleChange = (event) => {
        event.persist();
        setUser(prevUser => ({ ...prevUser, [event.target.name]: event.target.value }));
    };

    const postUser = async (value) => {
        try {
            setUserLoading();
            const response = await storeService.userLogin(value);
            setUserLogged(true);
            addDataToLocalStorage(response.data);
        } catch (error) {
            setUserLogged(false)
            const { msg } = error.response.data.errors[0]
            setErrorMsg(msg)
        }
    }
    const handleOnSubmit = event => {
        postUser(user);
    };

    if (userLoading) {
        return <LoadingSpinner />
    }

    if (userLogged) {
        return <Redirect to='/' />
    }


    return (
        <div className={'login'}>
            <Form onSubmit={handleSubmit(handleOnSubmit)} >
                <Form.Label className="lable">Log In</Form.Label>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter email"
                        name={'email'}
                        value={user.email}
                        onChange={handleChange}
                        ref={register}
                    />
                    {errors.email && <p className="errorMessage">{errors.email.message}</p>}
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                            </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" >
                    <Form.Label>Password</Form.Label>
                    <Form.Group className="pass-wrapper">
                        <Form.Control
                            type={passwordShown ? "text" : "password"}
                            placeholder="Password"
                            name={'password'}
                            value={user.password}
                            onChange={handleChange}
                            ref={register}
                            autoComplete="on"
                        />
                        <i onClick={togglePasswordVisiblity}>{eye}</i>
                    </Form.Group>
                    {errors.password && <p className="errorMessage">{errors.password.message}</p>}

                </Form.Group>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Remember me"
                />
                <Form.Group >
                    <Button variant="dark" type="submit" block>
                        LOG IN
                        </Button>
                    <span className="errorMessage">{errorMsg}</span>
                </Form.Group>
                <Form.Group className="link">
                    <Link to="/register" className="btn btn-link" >REGISTER</Link>
                </Form.Group>
            </Form>
        </div>
    )
};


const mapDispatchToProps = { setUserLogged, setUserLoading };

const mapStateToProps = ({ authReducer: { userLogged, userLoading } }) => ({
    userLogged, userLoading
});

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(Login));
