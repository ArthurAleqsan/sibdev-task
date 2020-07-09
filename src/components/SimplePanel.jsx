import React, { useState, Fragment } from 'react';
import { Form, Input, Select, Row, Col, Switch } from 'antd';
import PropTypes from 'prop-types';
import { OPTIONS } from '../utils/conf';
import { updateInArray } from '../utils/helpers';


const SimplePanel = ({ setForm, data, form }) => {
    const handleInputChange = (name, value) => {
        const mutatedObj = { ...data, [name]: value }
        const newFields = updateInArray(form.fields, obj => obj.id == data.id, () => mutatedObj);
        setForm({ ...form, fields: newFields });
    };
    const handleSelectChange = (type) => {
        const mutatedObj = { ...data, type }
        const newFields = updateInArray(form.fields, obj => obj.id == data.id, () => mutatedObj);
        setForm({ ...form, fields: newFields });
    };
    const handleValidationChange = (required) => {
        const mutatedObj = { ...data, validation: { required } }
        const newFields = updateInArray(form.fields, obj => obj.id == data.id, () => mutatedObj);
        setForm({ ...form, fields: newFields });
    }
    console.log(data);
    console.log(form);
    return (
        <Row className='schema-title-container simple-panel'>
            <Col span={12}>
                <Form.Item label="Ключ свойства" required className='schema-form-item'>
                    <Input
                        placeholder='Укажите ключ свойства'
                        className='schema-input'
                        name='key'
                        value={data.key}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    />
                </Form.Item>
                <Form.Item label="Название свойства" required className='schema-form-item'>
                    <Input
                        placeholder='Укажите название свойства'
                        className='schema-input'
                        name="label"
                        value={data.label}
                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                    />
                </Form.Item>
                <Form.Item label="Поле для отображения" name="type" required className='schema-form-item select-container'>
                    <Select placeholder='Выберите поле для отображения' className='schema-input' onChange={handleSelectChange}>
                        {OPTIONS.map((option) => {
                            return <Select.Option key={option.id} value={option.type}>
                                {option.name}
                            </Select.Option>
                        })}
                    </Select>
                </Form.Item>
            </Col>
            <Col span={12}>
                {data.type && <Fragment>
                    <div className='validation-switch-container'>
                        <Switch size="small" onClick={handleValidationChange} className='switch' />
                        <span>Обязательно для заполнения</span>
                    </div>
                    {data.validation.required && <div className='validation-fields-container'>
                        <Row>
                            <Col span={11}>
                                <Form.Item label="Мин. кол-во символов" className='schema-form-item'>
                                    <Input
                                        className='schema-input small-input'
                                        name="label"
                                        value={data.key}
                                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={11} offset={2}>
                                <Form.Item label="Макс. кол-во символов" className='schema-form-item'>
                                    <Input
                                        className='schema-input small-input'
                                        name="label"
                                        value={data.key}
                                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span = {24}>
                                <Form.Item label="Шаблон ввода" className='schema-form-item'>
                                    <Input
                                        className='schema-input'
                                        name="pattern"
                                        value={data.validation.pattern}
                                        onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                    </div>}
                </Fragment>}
            </Col>
        </Row>
    )
};
SimplePanel.propTypes = {
    setForm: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
};
export default SimplePanel;
