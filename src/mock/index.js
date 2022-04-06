import Mock from 'mockjs';
// const Random = Mock.Random;

/**
 * @description: 登录
 */
Mock.mock('/api/login', 'post', function (req, res) {
    console.log(req);
    console.log(res);
    return {
        code: 200,
        msg: '登录成功',
        token: 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678', // 48位随机数
        result: {
            username: 'admin',
            password: '123456'
        }
    };
});

