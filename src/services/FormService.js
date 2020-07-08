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
}

export default new FormService();