import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTask } from '../../store/forms/form.actions';
import { Spin, Form, Input, Button } from 'antd';

const Task = ({ getTask, task }) => {
    const _id = (window.location.pathname).split('/')[(window.location.pathname).split('/').length - 1];
    const id = _id.split('&')[0];
    useEffect(() => {
        getTask(id);
    }, []);
    return (
        <div className='task-container'>
            {task ? <div className='private-container'>
                <div className = 'create-schema-container'>
                    <p className='container-title'>{task.schema.name}</p>
                    <div className='task-inputs-container'>
                        {task.schema.fields.map((method, i) => {
                            return <Form
                                className='schema-title-container'
                                initialValues={method}
                                key={i}
                            >
                                <Form.Item label='Код товара' name="key" required className='schema-form-item'>
                                    <Input
                                        placeholder='Укажите код товара'
                                        className='schema-input'
                                    // disabled
                                    // onChange={(e) => handleChange(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item label="Название" name="label" required className='schema-form-item'>
                                    <Input
                                        placeholder='Укажите название схемы'
                                        className='schema-input'
                                    // disabled
                                    // onChange={(e) => handleChange(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item label="описание" name="type" required className='schema-form-item'>
                                    <Input
                                        placeholder='Укажите описание схемы'
                                        className='schema-input'
                                    // disabled
                                    // onChange={(e) => handleChange(e.target.value)}
                                    />
                                </Form.Item>
                                <Button type='primary'>Валидация</Button>
                            </Form>
                        })}
                    </div>
                </div>
            </div> : <Spin />}
        </div>
    )
};
Task.propTypes = {
    getTask: PropTypes.func.isRequired,
    task: PropTypes.object,
};
const mapStateToProps = state => {
    return {
        task: state.forms.task
    }
};
const mapDispatchToProps = dispatch => {
    return {
        getTask: (id) => dispatch(getTask(id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
