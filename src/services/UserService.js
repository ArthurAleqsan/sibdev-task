import Request from './Request';


class UserService extends Request {
    constructor() {
        super('/users');
    }
    getUser() {
        const options = {
            method: 'GET',
        };
        return this.send({
            path: '/profile',
            options,
        }).then((res) => (res));
    }
}

export default new UserService();