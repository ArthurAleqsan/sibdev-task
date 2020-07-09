import React, { useState, Fragment } from 'react';
import { Form, Input, Divider, Collapse, Button, message } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createForm } from '../../store/forms/form.actions';
import SimplePanel from '../../components/SimplePanel';
import { validateForm } from './validator';
import { removeFromArray } from '../../utils/helpers';

const CreateSchema = ({ createSchema }) => {
    const BASIC_FIELDS_SCHEMA = {
        id: 1,
        key: '',
        label: '',
        type: '',
        validation: {
            required: false,
        }
    }
    const [form, setForm] = useState({
        name: '',
        fields: [
            BASIC_FIELDS_SCHEMA,
        ],
    });
    const handleChange = (name) => {
        setForm({ ...form, name });
    };
    const hanldeAddNewMethod = () => {
        const newMethodFields = [...form.fields, { ...BASIC_FIELDS_SCHEMA, id: form.fields.length + 1 }];
        setForm({ ...form, fields: newMethodFields });
        console.log(newMethodFields);
    };
    const handleRemove = (e, id) => {
        e.stopPropagation();
        const newFormFields = removeFromArray(form.fields, item => item.id == id);
        setForm({...form, fields: newFormFields});
    }
    console.log(form);
    const handleSave = () => {
        validateForm(form);
        if (form.type == 'select' && form.options) {
            const options = form.options.filter(option => option.key && option.value);
            if (options.length > 0) {
                createSchema({ ...form, options });
            } else {
                return message.error('Надо минимум одно значение');
            }
        } else {
            createSchema(form);
        }
    };

    const genExtra = (id) => (<img src='/assets/images/bin.png' style={{ width: 20, height: 20 }} onClick={(e) => handleRemove(e, id)} />)


    return (
        <div className='create-schema-container'>
            <div className='private-container'>
                <p className='container-title'>Новая схема</p>
                <Form className='schema-title-container'>
                    <Form.Item label="Название схемы" name="name" required className='schema-form-item'>
                        <Input
                            placeholder='Укажите название схемы'
                            className='schema-input'
                            value={form.value}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </Form.Item>
                    <Divider className='divider' />
                    <p className='container-title schema-method-title'>Свойства схемы</p>
                    <h4 className='schema-description'>Схема должна содержать хотя бы одно свойство</h4>
                    <Collapse defaultActiveKey={['1']} >
                        {form.fields.map((data, i) => {
                            return <Collapse.Panel key={i} header={`Свойство ${i + 1}`} extra={genExtra(i + 1)}>
                                <SimplePanel data={data} setForm={setForm} form={form} />
                            </Collapse.Panel>
                        })}

                    </Collapse>
                    <div className='schema-buttons-container'>
                        <Button type='ghost' onClick={hanldeAddNewMethod}>Добавить новое свойство</Button>
                        <Button type='primary' onClick={handleSave}>Сохранить схему</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
};
CreateSchema.propTypes = {
    createSchema: PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => {
    return {
        createSchema: (data) => dispatch(createForm(data)),
    }
};

export default connect(null, mapDispatchToProps)(CreateSchema);
