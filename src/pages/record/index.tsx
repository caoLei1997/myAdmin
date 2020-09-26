import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'
import { PageContainer } from '@ant-design/pro-layout'
import { Table } from 'antd'
import { ModelState } from './model'
import { connect, Dispatch, Link } from 'umi'
import { TableListItem } from './data.d';
interface recordPageProps {
    record: ModelState;
    dispatch: Dispatch;
    loading: boolean;
}

interface GetListType {
    (
        pageIndex: number,
        pageSize?: number
    ): void
}
const RecordList: React.FC<recordPageProps> = ({ record, dispatch, loading }) => {

    const getList: GetListType = (
        pageIndex = record.pageIndex,
        pageSize = record.pageSize,
        // filter = record.filter  //筛选条件 暂时没做
    ) => {
        dispatch({
            type: "record/fetchList",
            payload: {
                pageIndex,
                pageSize
            }
        })
    }
    useEffect(() => {
        getList(1)
    }, [])
    // table 表头
    const columns: Array<{}> = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '手机号',
            dataIndex: 'numberPhone',
            key: 'numberPhone',
        },
        {
            title: '证件号',
            dataIndex: 'numberCertificate',
            key: 'numberCertificate',
        },
        {
            title: '车牌号',
            dataIndex: 'numberPlate',
            key: 'numberPlate',
        },
        {
            title: '申请状态',
            dataIndex: 'approvalStatus',
            key: 'approvalStatus',
        },
        {
            title: '操作',
            render: (record: TableListItem) => (
                <Link to={'detail/' + record.id}>查看详情</Link>
            )
        }
    ];
    // table 分页
    // const [count, setCount] = useState<number>(initial)

    // 监听分页回调
    const handlePaginationChange = (pageIndex: number, pageSize?: number) => {
        getList(pageIndex, pageSize)
    }
    const pagination = {
        total: record.total,
        current: record.pageIndex,
        pageSize: record.pageSize,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共${total}条`,
        onChange: handlePaginationChange,
    }

    return (
        <PageContainer>
            <div className='layout-container'>

                <Filter></Filter>
                <Table
                    columns={columns}
                    dataSource={record.list}
                    rowKey='id'
                    className='mt-20'
                    pagination={pagination}
                    loading={loading}
                ></Table>
            </div>
        </PageContainer>
    );
}

export default connect(
    ({
        record,
        loading
    }: {
        record: ModelState,
        loading: any
    }) => ({
        record,
        loading: loading.models.recordList
    })
)(RecordList);
