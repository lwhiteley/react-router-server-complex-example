
const login = {
    path: 'login',
    method: 'get',
    action(req, res){
        return res.send({login: true});
    }
};

export default [
    login
];