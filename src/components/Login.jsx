import { Form, Input, Button, Checkbox, message } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { http } from "../utils/http"
export default function Login() {
    const navigate = useNavigate()
    let [isCheck, setCheck] = useState(true)
    // 用户登陆


    const onFinish = async (values) => {
        // 登陆
        console.log(values);
        let { data: { data } } = await http.post('/authorizations', { mobile: values.username, code: values.password })
        console.log(data);
        if (data.token) {
            navigate('/home')
            message.success('登陆成功')
            window.localStorage.setItem('jiKeYuan', JSON.stringify(data))
        } else {
            message.error('登陆失败请检查用户名和验证码')
        }
    };

    return <div style={{ backgroundImage: `URL(${require('../assets/login.png')})`, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: "440px", height: '350px', boxShadow: 'rgb(0 0 0 / 10%) 0px 0px 50px', backgroundColor: '#fff' }}>
            <img style={{ width: '200px', height: '60px', margin: '20px auto 20px', display: 'block' }} src={require('../assets/logo.png')} alt="" />
            <Form onFinish={onFinish} style={{ padding: '20px' }}>
                <Form.Item name='username' rules={[{ required: true, message: '请输入用户名' }]} >
                    <Input />
                </Form.Item>
                <Form.Item name='password' rules={[{ required: true, message: '请输入验证码' }]} >
                    <Input />
                </Form.Item>
                <div><Checkbox checked={isCheck} />  我已阅读并同意「用户协议」和「隐私条款」</div>
                <Button htmlType="submit" style={{ width: '100%', marginTop: "20px" }} type="primary">登陆</Button>
            </Form>
        </div>
    </div>
}
