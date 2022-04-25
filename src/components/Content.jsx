import { Form, Input, Radio, Upload } from "antd"
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
export default function Content(props) {
    console.log(props);
    const onRadioChange = () => {
        console.log(123);
    }
    const handleUploadChange = () => {
        console.log(123);
    }
    return <div style={{ width: '800px', }}>
        <Form>
            <Form.Item wrapperCol={{ span: 10 }} label="标题"> <Input></Input></Form.Item>
            <Form.Item wrapperCol={{ span: 10 }} label="频道"> <Input></Input></Form.Item>
            <Form.Item label="封面">
                <Radio.Group onChange={onRadioChange} >
                    <Radio value={1}>单图</Radio>
                    <Radio value={2}>三图</Radio>
                    <Radio value={3}>无图</Radio>
                </Radio.Group>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    onChange={handleUploadChange}
                >

                </Upload>
            </Form.Item>
            <Form.Item label="内容">  <ReactQuill placeholder="请输入文章内容" style={{ height: '500px' }} /></Form.Item>

        </Form>
    </div>
}