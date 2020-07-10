import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { logout } from '../store/user/user.actions';
import { setPath } from '../store/global/global.actions';

const Header = ({ logout, path, setPath }) => {
    const [visible, setVisible] = useState(false);

    const handleOk = () => {
        logout();
        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    return (
        <header className='main-header'>
            <div className='private-container'>
                <div className='logo-container'>
                    <Link to='/'>
                        <img src='/assets/images/sibdev-logo.png' className='header-logo' />
                    </Link>
                </div>
                <nav className='navigation'>
                    <div className='nav-item' onClick={() => setPath('/')}>
                        <Link to='/'>
                            Мои Схемы
                        </Link>
                        <div className={path == '/' ? 'divider active-divider' : 'divider'}></div>
                    </div>
                    <div className='nav-item' onClick={() => setPath('/create')}>
                        <Link to='/create'>
                            Создать схему
                        </Link>
                        <div className={path == '/create' ? 'divider active-divider' : 'divider'}></div>
                    </div>
                </nav>
                <div className='sign-out-btn'>
                    <span onClick = {()=> setVisible(true)}>Выйти</span>
                    <Modal
                        title='Вы действительно хотите выйти?'
                        visible={visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    />

                </div>
            </div>

        </header>
    )
};
Header.propTypes = {
    logout: PropTypes.func.isRequired,
    setPath: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
};
const mapStateToProps = state => {
    return {
        path: state.global.path
    }
}
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
        setPath: (path) => dispatch(setPath(path)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
