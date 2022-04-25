import { Divider, Breadcrumb, Radio, Form, Select, DatePicker, Button, Table, Tag, Image, Space, Pagination, Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate } from "react-router-dom"
import { http } from '../utils/http';
import nullImg from "../assets/null.png"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
export default function Context() {
    const { RangePicker } = DatePicker;
    const navigate = useNavigate()
    //#region 存储频道数据
    const [selectList, setSelectList] = useState([])
    // 频道选择
    const [channel_id, setChannel] = useState('')
    // 分页
    const page = useRef(1)
    const per_page = useRef(10)
    // 单选
    const [radioCheck, setRadio] = useState('')
    // 日期
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndState] = useState('')
    const channelChange = (value, option) => {
        console.log(option.key);
        setChannel(option.key)
    }
    // 筛选收集数据重新发起请求
    const screeningData = () => {
        getTabList()
    }
    // 获取频道数据
    useEffect(() => {
        const getSelectList = async () => {
            let { data: { data } } = await http('/channels')
            // console.log(data);
            setSelectList(data.channels)
        }
        getSelectList()
        // 发起请求
    }, [])
    //#endregion
    //#region 默认单选框
    // 单选框选择
    function onChange(e) {
        console.log(e.target.value);
        setRadio(e.target.value)
    }
    //#endregion
    //#region      日期选择

    function onChangeDate(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        if (dateString) {
            setStartDate(dateString[0])
            setEndState(dateString[1])
        }
    }

    //#endregion
    //#region 表格
    //获取表格数据

    const [tabData, setData] = useState([])
    const [count, setCount] = useState(0)
    const getTabList = async () => {
        console.log(page);
        let { data: { data } } = await http.get('/mp/articles', {
            params: {
                page: page.current,
                per_page: per_page.current,
                status: radioCheck,
                begin_pubdate: startDate,
                end_pubdate: endDate,
                channel_id
            }
        })
        console.log(data);
        setData(data.results)
        setCount(data.total_count)
    }
    useEffect(() => {
        getTabList()
    }, [])
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            key: 'cover',
            render: cover => {
                let image = cover.images.length > 0 ? cover.images[0] : nullImg
                return (
                    <Image width='200px' height='150px' src={image}></Image>
                )
            },

        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: status => {
                const statusLabel = [
                    { text: "草稿", color: "default" },
                    { text: "待审核", color: "blue" },
                    { text: "审核通过", color: "green" },
                    { text: "审核拒绝", color: "red" },
                ];
                return (
                    <Tag color={statusLabel[status].color}>{statusLabel[status].text}</Tag>

                )
            }
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate',
            key: 'pubdate'

        },
        {
            title: '阅读数',
            dataIndex: 'read_count',
            key: 'read_count',

        },
        {
            title: '评论数',
            dataIndex: 'comment_count',
            key: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count',
            key: 'like_count',

        },
        {
            title: '操作',
            key: 'edit',
            render: (state, payload) => {
                return (
                    <Space size="middle">
                        <Button onClick={() => jumpEditPage(state, payload)} style={{ width: '32px', height: '32px', borderRadius: '50%' }} type="primary" icon={<EditOutlined />} />
                        <Button onClick={() => showConfirm(state)} style={{ width: '32px', height: '32px', borderRadius: '50%' }} type="danger" icon={<DeleteOutlined />} />
                    </Space>
                )
            }
        },
    ]
    //#endregion
    //#region  分页

    const paginationChange = (pages, pagesize) => {
        page.current = pages
        per_page.current = pagesize
        getTabList()
    }
    //#endregion
    //#region 编辑
    const jumpEditPage = (state) => {
        console.log(state);
        const { id } = state
        navigate(`/home/edit/${id}`)

    }
    let [isShowState, setShowState] = useState(false)
    // 要删除的id
    let [isDelete, setDelete] = useState(null)
    function showConfirm(state) {
        setShowState(true)
        console.log(isShowState);
        let { id } = state
        setDelete(id)
    }
    //取消
    function hideModal() {
        setShowState(false)
    }
    //确定删除
    let httpdelete = async () => {
        let res = await http.delete(`mp/articles/${isDelete}`)
        console.log(res);
        let { data } = res
        if (data.message == 'OK') {
            message.success('删除文章成功')
            getTabList()
            setShowState(false)
        }
    }
    function isdeleteItem() {
        httpdelete()
    }
    return <div style={{ widht: '100%', height: '100%', overflow: 'scroll' }}>
        <div style={{ backgroundColor: '#fff' }}>
            {/* 面包屑 */}
            <div style={{ paddingTop: '20px', paddingLeft: '20px', boxSizing: 'border-box' }}>
                <Breadcrumb>
                    <Breadcrumb.Item><NavLink to={'/home/'}>首页</NavLink></Breadcrumb.Item>
                    <Breadcrumb.Item>
                        内容管理
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Divider></Divider>
            {/* 筛选框 */}
            <div style={{ padding: '20px', color: '#262626' }}>
                {/* 单选框 */}
                <Form>
                    <Form.Item label="状态">
                        <Radio.Group onChange={onChange} value={radioCheck} >
                            <Radio value=''>全部</Radio>
                            <Radio value='0'>草稿</Radio>
                            <Radio value='1'>待审核</Radio>
                            <Radio value='2'>审核通过</Radio>
                            <Radio value='3'>审核失败</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {/* 下拉框 */}
                    <Form.Item label="频道" wrapperCol={{ span: 6 }}>
                        <Select placeholder="请选择文章频道" onChange={channelChange} >
                            {
                                selectList?.map(item =>
                                    <Select.Option value={item.name} key={item.id} >{item.name}</Select.Option>
                                )
                            }
                        </Select>
                    </Form.Item>
                    {/* 日期 */}
                    <Form.Item label="日期" wrapperCol={{ span: 6 }}>
                        <RangePicker
                            showTime={{ format: 'HH:mm' }}
                            format="YYYY-MM-DD HH:mm"
                            onChange={onChangeDate}
                        />
                    </Form.Item>
                    {/* 筛选按钮 */}
                    <Button onClick={screeningData} type="primary">筛选</Button>
                </Form>
            </div>
        </div>
        <div style={{ marginTop: '20px', backgroundColor: '#fff', padding: '20px' }}>
            <p style={{ color: '#333' }}>根据筛选条件共查询到{count}条结果</p>

            <Table pagination={false} columns={columns} dataSource={tabData}  >

            </Table>
            {/* 分页 */}
            <Pagination current={page.current} pageSize={per_page.current} onChange={paginationChange} style={{ margin: '20px auto' }} total={count} />
        </div>
        <Breadcrumb></Breadcrumb>
        {/* 对话框 */}
        <Modal
            title="温馨提示"
            visible={isShowState}
            okText="确认"
            cancelText="取消"
            onCancel={hideModal}
            okText="确认"
            onOk={isdeleteItem}
        >
            <p>此操作将永久删除该文章，是否继续？</p>

        </Modal>
    </div >
}     