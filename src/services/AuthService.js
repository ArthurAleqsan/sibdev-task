import Request from './Request';


class AuthService extends Request {
    constructor() {
        super('/auth');
    }

    login(data) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data)
        };
        return this.send({
            path: '/login',
            options,
        }).then((res) => (res));
    }
    signUp(data) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data)
        };
        return this.send({
            path: '/signup',
            options,
            headers: {
                "authorization": `Basic NXJxaDFkcXZrN3JmdDdpYjZlaDBhbHY1bXUydjRmOkpKdW00NldvV2NNeW5vVTFDV2xraEw=`,
            },
        }).then((res) => (res));
    }
}

export default new AuthService();