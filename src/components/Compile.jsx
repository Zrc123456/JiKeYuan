import { useParams } from "react-router-dom"
import { Breadcrumb, Divider } from 'antd';
import { NavLink } from "react-router-dom"
import Content from "./Content";
export default function Compile(props) {
    // const route = useRoutes()
    // console.log(route);
    const { id } = useParams()
    console.log(id);
    return <div style={{
        width: '100%', height: '100%',
        backgroundColor: '#fff',
        overflow: 'auto'
    }}>
        < Breadcrumb style={{ padding: '20px 0px 0px 20px' }}>
            <Breadcrumb.Item><NavLink to='/home'>主页</NavLink></Breadcrumb.Item>
            <Breadcrumb.Item>
                编辑文章
            </Breadcrumb.Item>
        </Breadcrumb>
        <Divider />
        <Content id={id}></Content>

    </div >
}
