import React, { useState, Fragment } from 'react';
import { Form, Input, Select, Row, Col, Switch, Button } from 'antd';
import PropTypes from 'prop-types';

import { OPTIONS } from '../utils/conf';
import { updateInArray } from '../utils/helpers';


const SimplePanel = ({ setForm, data, form }) => {
    const [dropDownItems, setDropDownItems] = useState([]);
    const [initialItem, setInitialItem] = useState({
        key: '',
        value: '',
    });
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
    };
    const handleValidationInputChange = (name, value) => {
        const mutatedObj = { ...data, validation: { ...data.validation, [name]: value } }
        const newFields = updateInArray(form.fields, obj => obj.id == data.id, () => mutatedObj);
        setForm({ ...form, fields: newFields });
    };
    const handleSetInitialItem = (value, key) => {
        setInitialItem({ ...initialItem, [key]: value });
    }
    const handleSelectDropDown = () => {
        setDropDownItems([...dropDownItems, initialItem]);
        const newFields = updateInArray();
        setForm({ ...form, options: form.options ? [...form.options, initialItem] : [initialItem] });
    };

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
                    <Select
                        placeholder='Выберите поле для отображения'
                        className='schema-input'
                        onChange={handleSelectChange}
                        defaultValue={form.type}
                    >
                        {OPTIONS.map((option) => {
                            return <Select.Option key={option.id} value={option.type}>
                                {option.name}
                            </Select.Option>
                        })}
                    </Select>
                </Form.Item>
                {data.type == 'select' && <Fragment>
                    <Form.List name="names">
                        {(fields, { add, remove }) => {
                            return (
                                <div className='option-container'>
                                    {fields.map((field, i) => (<Fragment key={field.key}>
                                        <Form.Item
                                            required={false}
                                            className='select-input-container'
                                        >
                                            <Form.Item>
                                                <Input
                                                    placeholder='ключ опции'
                                                    className='schema-input'
                                                    value={dropDownItems[i + 1]?.key || initialItem.key}
                                                    onChange={(e) => handleSetInitialItem(e.target.value, 'key')}
                                                />

                                            </Form.Item>

                                            <div
                                                className="dynamic-delete-button"
                                                onClick={() => {
                                                    let newFields = [...dropDownItems];
                                                    const newArray = [...newFields];
                                                    newArray.splice(field.key, 1);
                                                    setDropDownItems(newArray);

                                                    let options = [...form.options];
                                                    options.splice(field.key + 1, 1);
                                                    setForm({ ...form, options });
                                                    remove(field.name);
                                                }}
                                            >x</div>
                                        </Form.Item>
                                        <Form.Item className='schema-last-input-container'>
                                            <Input
                                                placeholder='значение опции'
                                                className='schema-input'
                                                value={dropDownItems[i + 1]?.value || initialItem.value}
                                                onChange={(e) => handleSetInitialItem(e.target.value, 'value')}
                                            />
                                        </Form.Item>
                                    </Fragment>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => {
                                                handleSelectDropDown();
                                                setInitialItem({ key: '', value: '' });
                                                add();
                                            }}
                                            className='schema-input'
                                        >
                                            Добавить вариант
                                        </Button>
                                    </Form.Item>
                                </div>
                            );
                        }}
                    </Form.List>
                </Fragment>}
            </Col>
            <Col span={12}>
                {data.type && <Fragment>
                    <div className='validation-switch-container'>
                        <Switch size="small" onClick={handleValidationChange} className='switch' />
                        <span>Обязательно для заполнения</span>
                    </div>
                    {data.validation.required && <div className='validation-fields-container'>
                        <Row>
                            {(data.type == 'number' || data.type == 'string' || data.type == 'password') && <Fragment>
                                <Col span={11}>
                                    <Form.Item label="Мин. кол-во символов" className='schema-form-item'>
                                        <Input
                                            className='schema-input small-input'
                                            name="min"
                                            value={data.validation.min}
                                            onChange={(e) => handleValidationInputChange(e.target.name, e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={11} offset={2}>
                                    <Form.Item label="Макс. кол-во символов" className='schema-form-item'>
                                        <Input
                                            className='schema-input small-input'
                                            name="max"
                                            value={data.validation.max}
                                            onChange={(e) => handleValidationInputChange(e.target.name, e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>
                            </Fragment>}
                            {(data.type == 'string' || data.type == 'password') && <Col span={24}>
                                <Form.Item label="Шаблон ввода" className='schema-form-item'>
                                    <Input
                                        className='schema-input'
                                        name="pattern"
                                        value={data.validation.pattern}
                                        onChange={(e) => handleValidationInputChange(e.target.name, e.target.value)}
                                    />
                                </Form.Item>
                            </Col>}
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
