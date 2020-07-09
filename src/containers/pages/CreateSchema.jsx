import React, { useState } from 'react';
import { Form, Input, Divider, Collapse, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createForm } from '../../store/forms/form.actions';
import SimplePanel from '../../components/SimplePanel';

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
    const handleSave = () => {
        createSchema(form);
    };


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
                    <Collapse defaultActiveKey={['1']}>
                        {form.fields.map((data, i) => {
                            return <Collapse.Panel header={`Свойство ${i + 1}`} key={i + 1}>
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
const mapStateToProps = state => {
    return {

    }
};
const mapDispatchToProps = dispatch => {
    return {
        createSchema: (data) => dispatch(createForm(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSchema);
