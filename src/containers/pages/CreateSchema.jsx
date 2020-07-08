import React, { useState } from 'react';
import { Form, Input, Divider, Collapse, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createForm } from '../../store/forms/form.actions';

const CreateSchema = ({ createSchema }) => {
    const [form, setForm] = useState({});
    return (
        <div className='create-schema-container'>
            <div className='private-container'>
                <p className='container-title'>Новая схема</p>
                <Form className='schema-title-container'>
                    <Form.Item label="Название схемы" name="name" required className='schema-form-item'>
                        <Input
                            placeholder='Укажите название схемы'
                            className='schema-input'
                        />
                    </Form.Item>
                    <Divider className='divider' />
                    <p className='container-title schema-method-title'>Свойства схемы</p>
                    <h4 className='schema-description'>Схема должна содержать хотя бы одно свойство</h4>
                    <Collapse defaultActiveKey={['1']} onChange={(key) => console.log(key)}>
                        <Collapse.Panel header="This is panel header 1" key="1">
                            <p>{'text'}</p>
                        </Collapse.Panel>
                        <Collapse.Panel header="This is panel header 2" key="2">
                            <p>{'text'}</p>
                        </Collapse.Panel>
                    </Collapse>
                    <div className='schema-buttons-container'>
                        <Button type='ghost'>Добавить новое свойство</Button>
                        <Button type='primary'>Сохранить схему</Button>
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
