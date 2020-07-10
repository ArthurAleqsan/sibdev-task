import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTask } from '../../store/forms/form.actions';

const Task = ({ getTask }) => {
    const _id = (window.location.pathname).split('/')[(window.location.pathname).split('/').length - 1];
    const id = _id.split('&')[0];
    useEffect(() => {
        getTask(id);
    }, []);
    console.log(id);

    return (
        <div>

        </div>
    )
};
Task.propTypes = {
    getTask: PropTypes.func.isRequired,
};
const mapStateToProps = state => {
    return {}
};
const mapDispatchToProps = dispatch => {
    return {
        getTask: (id) => dispatch(getTask(id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
