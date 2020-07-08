import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spin, Button } from 'antd';
import { withRouter } from 'react-router-dom';

import { getForms } from '../../store/forms/form.actions';
import { setPath } from '../../store/global/global.actions';

const Schemas = ({ getForms, forms, history, setPath }) => {
    useEffect(() => {
        getForms();
    }, []);
    const handleRedirect = () => {
        setPath();
        history.push('/create');
    }
    return (
        <div className='schemas-container'>
            <div className='private-container'>
                <p className='container-title'>Мои схемы</p>
                <div className='schemas-table'>
                    {forms
                        ? forms.lenght > 0
                            ? <div>111</div>
                            : <div>Нет схем</div>
                        : <Spin />
                    }
                </div>
                <Button type='primary' onClick = {handleRedirect}>Создать схему</Button>
            </div>
        </div>
    )
};
Schemas.propTypes = {
    getForms: PropTypes.func.isRequired,
    setPath: PropTypes.func.isRequired,
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
    }
};
export default connect(mapStateToProps, mapDispatchToprops)(withRouter(Schemas));
