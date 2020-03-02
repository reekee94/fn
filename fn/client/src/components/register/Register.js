import React, { useState } from 'react';
import './Register.css';
import { Form, Button } from 'react-bootstrap';

const Register = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    console.log(form);

    const changeHandler = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    return (
        <Form className="register">
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" onChange={changeHandler} />
                <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onChange={changeHandler} />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default Register;
