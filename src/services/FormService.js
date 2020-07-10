import Request from './Request';


class FormService extends Request {
    constructor() {
        super('/form');
    }
    getForms() {
        const options = {
            method: 'GET',
        };
        return this.send({
            path: '/',
            options,
        }).then((res) => (res));
    }
    createForm(data) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
        };
        return this.send({
            path: '/',
            options,
        }).then((res) => (res));
    }
    getTask(id) {
        const options = {
            method: 'GET',
        };
        return this.send({
            path: `/${id}`,
            options,
        }).then((res) => (res));
    }
    editTask(id, data) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
        };
        return this.send({
            path: `/${id}`,
            options,
        }).then((res) => (res));
    }
    
    removeTask(id) {
        const options = {
            method: 'DELETE'
        };
        return this.send({
            path: `/${id}`,
            options,
        }).then((res) => (res));
    }
}

export default new FormService();