import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, message } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
};

const Auth = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
    });
    const signIn = () => {
        console.log({ username: (values.user.email), password: values.password });
    };
    const signUp = (values) => {
        console.log(form);
    };

    const onFinishFailed = errorInfo => {
        return message.error(errorInfo);        
    };
    const handleChange = (d) => {
        const key = Object.keys(d)[0];
        setForm({ ...form, [key]: d[key] });
    };
    return (
        <div className='auth-container'>
            <div className='form-container'>
                <Form
                    {...layout}
                    name="auth"
                    initialValues={{ remember: true }}
                    onFinish={() => console.log(555)}
                    onValuesChange={handleChange}
                    // onFinishFailed={onFinishFailed}
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
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="button">
                            Войти
                        </Button>
                        <Button htmlType="button" onClick={signUp}>
                            Регистрация
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
};

export default Auth;