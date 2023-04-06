import React from 'react';
import { Button, Form, Input, Select, Space, Tooltip, Typography, Table } from 'antd';

const { Option } = Select;

const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
};



const App: React.FC = () => {
    const [form] = Form.useForm();
    const columns = ({ fields, remove }) => {
        return [
            {
                title: '名字',
                dataIndex: '11111',
                width: 200,
                // render: (val, row, index) => {
                //     console.log(val, form.getFieldValue('materialDetailList')[index]?.name)
                //     // return form.getFieldValue()
                // }
            },
            {
                title: '物料类型',
                width: 200,
                render: (_, val, index) => {
                    const field = fields[index];
                    console.log(fields, index, field, "field")
                    return (
                        <Form.Item
                            {...field}
                            name={[field.name, 'gramWeight']}
                        >
                            <Input
                                placeholder="请输入"
                                min={0}
                                max={999999.99}
                                precision={2}
                                step={0.01}
                            />
                        </Form.Item>
                    );
                },
            }
        ]
    }

    return (
        <Form
            form={form}
            name="complex-form"
            onFinish={onFinish}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
                materialDetailList: [{ name: '1111' }],
            }}
        >
            <Form.List name='materialDetailList'>
                {
                    (fields, { add, remove }) => {
                        console.log(fields, "asdasdas")
                        return <Form.Item  >
                            <Table
                                key={fields.length}
                                rowKey="name"
                                columns={columns({ fields, remove })}
                                dataSource={fields}
                                pagination={false}
                                footer={() => (
                                    <Button
                                        block
                                        type="dashed"
                                        onClick={() => add()}
                                    >
                                        新增一行
                                    </Button>
                                )}
                            />
                        </Form.Item>

                    }
                }

            </Form.List>
            <Form.Item label=" " colon={false}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form >
    )
}

export default App;