import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isMainTab } from './helpers';
import { Modal } from 'antd';
import { logout } from '../store/user/user.actions';

const Header = ({ logout }) => {
    const path = window.location.pathname;
    const [activeTab, setActiveTab] = useState(isMainTab(path, 'create') ? 'create' : 'main');
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
                    <div className='nav-item' onClick={() => setActiveTab('main')}>
                        <Link to='/'>
                            Мои Схемы
                        </Link>
                        <div className={activeTab == 'main' ? 'divider active-divider' : 'divider'}></div>
                    </div>
                    <div className='nav-item' onClick={() => setActiveTab('create')}>
                        <Link to='/create'>
                            Создать схему
                        </Link>
                        <div className={activeTab == 'create' ? 'divider active-divider' : 'divider'}></div>
                    </div>
                </nav>
                <div className='sign-out-btn'>
                    <span onClick = {()=> setVisible(true)}>Выйти</span>
                    <Modal
                        title='Are you want to logout?'
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
};
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    }
};

export default connect(null, mapDispatchToProps)(Header);
