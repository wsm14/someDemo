import React from 'react';
import { Button, Checkbox, Form, Input, InputNumber } from 'antd';

//scrollToFirstError
//validateTrigger
//dependencies

//onFieldsChange   字段修改后包含字段  属性名等的对象
//onValuesChange  单独字段出发后的对象


const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

const validateMessages = {
    required: "'${name}' 必须填嗷",
    // ...
};

const App: React.FC = () => {
    const [form] = Form.useForm();

    return <>
        <Button onClick={() => {

            // console.log(form.getFieldError('password'));//获取错误


            // form.setFields([{
            //     errors: ['错误的'],
            //     name: 'password'
            // }]) //设置单项的错误

            // form.resetFields(['username']) //重置到默认值


            // console.log(form.getFieldInstance('username'))


            // console.log(form.getFieldsError(['password', 'username']))//获取一组错误信息


            // form.validateFields(['password']).then(res => {
            //     console.log(res)
            // })//触发单个校验或者整体校验


            // console.log(form.getFieldValue('username')) //获取一个字段的值   传空获取所有的值

            // console.log(form.getFieldsValue(['username'])) //获取多个字段的值  数组可传多个字段   传空或true获取所有的值



            // form.setFieldValue('password', "1111") //设置单项的值
            // form.setFieldsValue({
            //     password: '222'
            // })//设置一个对象  可以多个值
        }}>点击</Button>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            validateMessages={validateMessages}
            form={form}
            initialValues={{
                username: '111'
            }}
        // onFieldsChange={(val) => {
        //     console.log(val, "val======")
        // }}
        // onValuesChange={(val) => {
        //     console.log(val, "val1==========")
        // }}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, }]}
                tooltip='你好'
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, type: 'number', max: 10, message: '哈哈哈' }]}
            // required={true}
            >
                <InputNumber />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form >
    </>
}

export default App;