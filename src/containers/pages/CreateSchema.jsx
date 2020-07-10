import React, { useState, useEffect } from 'react';
import { Form, Input, Divider, Collapse, Button, message, Spin } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createForm, getTask, editTask } from '../../store/forms/form.actions';
import SimplePanel from '../../components/SimplePanel';
import { validateForm } from './validator';
import { removeFromArray } from '../../utils/helpers';

const CreateSchema = ({ createSchema, getTask, task, editTask }) => {
    const idFromEdit = window.location.pathname.includes('/edit/');
    const _id = (window.location.pathname).split('/')[(window.location.pathname).split('/').length - 1];
    const id = _id.split('&')[0];
    const BASIC_FIELDS_SCHEMA = {
        id: 1,
        key: '',
        label: '',
        type: '',
        validation: {
            required: false,
        }
    };

    const [form, setForm] = useState(null);
    useEffect(() => {
        if (idFromEdit) {

            getTask(id);
        } else {
            setForm({
                name: '',
                fields: [
                    BASIC_FIELDS_SCHEMA,
                ],
            });
        }
    }, []);
    if (idFromEdit && !form && task) {
        setForm(task.schema);
    }
    const handleChange = (name) => {
        setForm({ ...form, name });
    };
    const hanldeAddNewMethod = () => {
        const newMethodFields = [...form.fields, { ...BASIC_FIELDS_SCHEMA, id: form.fields.length + 1 }];
        setForm({ ...form, fields: newMethodFields });
    };
    const handleRemove = (e, id) => {
        e.stopPropagation();
        const newFormFields = removeFromArray(form.fields, item => item.id == id);
        setForm({ ...form, fields: newFormFields });
    }
    const handleSave = () => {
        if (validateForm(form) == 'ok') {
            console.log(8888);
            if (form.type == 'select' && form.options) {
                const options = form.options.filter(option => option.key && option.value);
                if (options.length > 0) {
                    idFromEdit ? editTask(id, { ...form, options }) : createSchema({ ...form, options });
                } else {
                    return message.error('Надо минимум одно значение');
                }
            } else {
                idFromEdit ? editTask(id, form) : createSchema(form);
            }
        }
    };

    const genExtra = (id) => (<img src='/assets/images/bin.png' style={{ width: 20, height: 20 }} onClick={(e) => handleRemove(e, id)} />)

    console.log(form);
    return (
        <div className='create-schema-container'>
            {form ? <div className='private-container'>
                <p className='container-title'>Новая схема</p>
                <Form className='schema-title-container' initialValues={form}>
                    <Form.Item label="Название схемы" name="name" required className='schema-form-item'>
                        <Input
                            placeholder='Укажите название схемы'
                            className='schema-input'
                            value={form.name}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </Form.Item>
                    <Divider className='divider' />
                    <p className='container-title schema-method-title'>Свойства схемы</p>
                    <h4 className='schema-description'>Схема должна содержать хотя бы одно свойство</h4>
                    <Collapse defaultActiveKey={['1']} >
                        {form.fields.map((data, i) => {
                            return <Collapse.Panel key={i} header={`Свойство ${i + 1}`} extra={genExtra(i + 1)}>
                                <SimplePanel data={data} setForm={setForm} form={form} idFromEdit={idFromEdit} />
                            </Collapse.Panel>
                        })}

                    </Collapse>
                    <div className='schema-buttons-container'>
                        <Button type='ghost' onClick={hanldeAddNewMethod}>Добавить новое свойство</Button>
                        <Button type='primary' onClick={handleSave}>Сохранить схему</Button>
                    </div>
                </Form>
            </div>
                : <Spin />}
        </div>
    )
};
CreateSchema.propTypes = {
    createSchema: PropTypes.func.isRequired,
    getTask: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
    task: PropTypes.object,
};
const mapStateToProps = state => {
    return {
        task: state.forms.task,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        createSchema: (data) => dispatch(createForm(data)),
        getTask: (id) => dispatch(getTask(id)),
        editTask: (id, schema) => dispatch(editTask(id, schema)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSchema);
