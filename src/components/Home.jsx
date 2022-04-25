import { Layout, Popconfirm, Menu } from 'antd';
import { HomeOutlined, CopyOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"
export default function Home() {
    const navigate = useNavigate()
    // 用户退出
    const onQuitClick = () => {
        navigate('/login')
    }
    const { Header, Footer, Sider, Content } = Layout;
    return <div style={{ height: '100%' }}>
        <Layout style={{ height: '100%' }}>
            <Sider style={{ height: '100%' }}>
                <img src={require('../assets/logo.png')} style={{ width: '165px', display: 'block', margin: '10px auto' }} alt="" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    rigger={null}

                >
                    <Menu.Item onClick={() => navigate('/home/')} key="1" icon={<HomeOutlined />}>
                        数据概览
                    </Menu.Item>
                    <Menu.Item onClick={() => navigate('/home/article')} key="2" icon={<CopyOutlined />}>
                        内容管理
                    </Menu.Item>
                    <Menu.Item onClick={() => navigate('/home/publish')} key="3" icon={<EditOutlined />}>
                        发布文章
                    </Menu.Item>
                </Menu>
            </Sider>
            <Content style={{ overflow: 'hidden', height: '100%', color: '#fff', }}>
                <div style={{ backgroundColor: '#001529', height: '65px' }}>
                    <div style={{ float: 'right', padding: '20px' }}>
                        <span style={{ marginRight: '20px' }}>黑马先锋</span>
                        <Popconfirm
                            title="是否确认退出？"
                            onConfirm={onQuitClick}
                            okText="确认"
                            cancelText="取消"
                        >
                            <span><LogoutOutlined ></LogoutOutlined>  退出</span>
                        </Popconfirm>
                    </div>
                </div>

                <div style={{ padding: '30px', width: '100%', height: '100%' }}>
                    <Outlet />
                </div>

            </Content>
        </Layout>
    </div >
}
