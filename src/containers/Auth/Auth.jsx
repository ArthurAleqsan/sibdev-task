import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import { signUp, signIn } from '../../store/user/user.actions';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Auth = ({ signUp, signIn }) => {
    const [isLoginPage, setIsLoginPage] = useState(true)
    const onFinish = values => {
        if (isLoginPage) {
            signIn(values);
        } else {
            signUp(values);
            setIsLoginPage(true);
        }
    };

    const onFinishFailed = errorInfo => {
        return message.error(errorInfo);
    };
    return (
        <div className='auth-container'>
            <div className='form-container'>
                <div className='logo-container'>
                    <img src='/assets/images/sibdev-logo.png' />
                </div>
                <Form
                    {...layout}
                    name="auth"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name={'username'}
                        label="Логин"
                        rules={[{ required: true, message: 'user name is required!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={'password'}
                        label="Пароль"
                        rules={[{ required: true, message: 'password is required!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout} className='auth-button-container'>
                        <Button type="primary" htmlType="submit">
                            {isLoginPage ? 'Войти' : 'Зарегистрироватсья'}
                        </Button>
                    </Form.Item>
                    <Form.Item {...{ wrapperCol: { offset: 4, span: 20 } }} className='auth-span-container'>
                        <span>Или</span> <span onClick={() => setIsLoginPage(!isLoginPage)} className='changable-text'>{isLoginPage ? 'Зарегистрироватсья' : 'Войти'}</span>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
};
Auth.propTypes = {
    signUp: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => {
    return {
        signUp: (data) => dispatch(signUp(data)),
        signIn: (data) => dispatch(signIn(data)),
    }
};

export default connect(null, mapDispatchToProps)(Auth);