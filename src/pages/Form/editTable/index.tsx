import type { ProColumns } from '@ant-design/pro-components';
import { EditableProTable, ProCard, ProFormField } from '@ant-design/pro-components';
import { Button, Input } from 'antd';
import React, { useState, useRef } from 'react';
import { history } from "@umijs/max"

type DataSourceType = {
    id: React.Key;
    title?: string;
    decs?: string;
    state?: string;
    created_at?: string;
    children?: DataSourceType[];
};

const defaultData: DataSourceType[] = new Array(3).fill(1).map((_, index) => {
    return {
        id: (Date.now() + index).toString(),
        title: `活动名称${index}`,
        decs: '这个活动真好玩',
        state: 'open',
        created_at: '1590486176000',
    };
});

export default () => {
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
        defaultData.map((item) => item.id),
    );
    const [dataSource, setDataSource] = useState<readonly DataSourceType[]>(() => defaultData);
    const editRef = useRef()


    const columns: ProColumns<DataSourceType>[] = [
        {
            title: '活动名称',
            dataIndex: 'title',
            width: '30%',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        whitespace: true,
                        message: '此项是必填项',
                    },
                    {
                        message: '必须包含数字',
                        pattern: /[0-9]/,
                    },
                    {
                        max: 16,
                        whitespace: true,
                        message: '最长为 16 位',
                    },
                    {
                        min: 6,
                        whitespace: true,
                        message: '最小为 6 位',
                    },
                ],
            },
        },
        {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
            valueType: 'select',
            valueEnum: {
                all: { text: '全部', status: 'Default' },
                open: {
                    text: '未解决',
                    status: 'Error',
                },
                closed: {
                    text: '已解决',
                    status: 'Success',
                },
            },
        },
        {
            title: '描述',
            dataIndex: 'decs',
        },
        {
            title: '单价',
            dataIndex: 'price',
        },
        {
            title: '数量',
            dataIndex: 'number',
        },
        {
            title: '总价',
            dataIndex: 'total',
            // editable: false,
            // formItemProps: {
            //     value: 1111
            // }
            renderFormItem: (item) => {
                console.log(item.entry, "item======")
                return <Input.TextArea value='哈哈哈哈哈' onChange={() => { }}></Input.TextArea>
            }
            // render: (val, row) => (row.number || 0) * (row.price || 0)
        },
        {
            title: '操作',
            valueType: 'option',
            width: 250,
            render: () => {
                return null;
            },
        },
    ];
    // console.log(dataSource, "data================")
    return (
        <>
            {/* <Button onClick={() => {
                history.push({
                    pathname: '/access',
                    search: '?a=b&c=d',
                    hash: 'anchor',
                }, { a: 11111 })
            }}>点击跳转</Button> */}
            <EditableProTable<DataSourceType>
                headerTitle="可编辑表格"
                columns={columns}
                rowKey="id"
                scroll={{
                    x: 960,
                }}
                value={dataSource}
                onChange={setDataSource}
                recordCreatorProps={{
                    newRecordType: 'dataSource',
                    record: () => ({
                        id: Date.now(),
                    }),
                }}
                editableFormRef={editRef}
                toolBarRender={() => {
                    return [
                        <Button
                            type="primary"
                            key="save"
                            onClick={() => {
                                // dataSource 就是当前数据，可以调用 api 将其保存
                                console.log(dataSource);
                            }}
                        >
                            保存数据
                        </Button>,
                    ];
                }}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    actionRender: (row, config, defaultDoms) => {
                        return [defaultDoms.delete];
                    },
                    onValuesChange: (record, recordList) => {
                        console.log(editRef.current.getRowsData(), editRef.current.getRowData(record.id))
                        // editRef.current.setRowData(record.id, {
                        //     total: 1111
                        // })
                        setDataSource(recordList);
                    },
                    onChange: setEditableRowKeys,
                }}
            />
            <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
                <ProFormField
                    ignoreFormItem
                    fieldProps={{
                        style: {
                            width: '100%',
                        },
                    }}
                    mode="read"
                    valueType="jsonCode"
                    text={JSON.stringify(dataSource)}
                />
            </ProCard>
        </>
    );
};