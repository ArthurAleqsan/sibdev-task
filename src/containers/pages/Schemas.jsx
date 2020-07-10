import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin, Button, Modal } from 'antd';
import { withRouter } from 'react-router-dom';

import { getForms, removeTask } from '../../store/forms/form.actions';
import { setPath } from '../../store/global/global.actions';

const Schemas = ({ getForms, forms, history, setPath, removeTask }) => {
    useEffect(() => {
        getForms();
    }, []);
    const [visible, setVisible] = useState(false);
    const [selectedId, selectId] = useState(null);
    const openModal = (id) => {
        setVisible(true);
        selectId(id);
    };
    const handleOk = () => {
        removeTask(selectedId);
        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    const handleRedirect = (id) => {
        setPath();
        history.push(id ? `/task/${id}` : '/create');
    }
    return (
        <div className='schemas-container'>
            <div className='private-container'>
                <p className='container-title'>Мои схемы</p>
                <div className='schemas-table'>
                    {forms ? forms.map(form => {
                        if (!form) {
                            return <div>Нет схем</div>
                        }
                        return <div key={form.id} className='simple-schema'>
                            <div onClick={() => handleRedirect(form.id)} className='name-container'>
                                <span>{form.schema.name}</span>
                            </div>
                            <div className='buttons-container'>
                                <span onClick = {() => history.push(`/edit/${form.id}`)}>Изменить</span>
                                <span onClick = {() => openModal(form.id)}>Удалить</span>
                            </div>

                        </div>
                    }) : <Spin />
                    }
                </div>
                <Button type='primary' onClick={handleRedirect}>Создать схему</Button>
            </div>
            <Modal
                title='Вы действительно хотите удалить схему?'
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            />
        </div >
    )
};
Schemas.propTypes = {
    getForms: PropTypes.func.isRequired,
    setPath: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    forms: PropTypes.array,
    history: PropTypes.object,
};
const mapStateToProps = state => {
    return {
        forms: state.forms.forms,
    }
};
const mapDispatchToprops = dispatch => {
    return {
        getForms: () => dispatch(getForms()),
        setPath: () => dispatch(setPath('/create')),
        removeTask: (id) => dispatch(removeTask(id))
    }
};
export default connect(mapStateToProps, mapDispatchToprops)(withRouter(Schemas));
