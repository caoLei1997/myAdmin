import React, { useEffect } from 'react'
import styles from '../index.less'
import { PageContainer } from '@ant-design/pro-layout'
import { Divider, Descriptions, Image, Table, Row, Col, Button, Message } from 'antd'
import { connect, Dispatch, history } from 'umi'
import { IsItEmpty } from '@/utils/utils'
const imgUlr = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
interface propsType {
    dispatch: Dispatch,
    record: any,
    match: any
}
const RecordDetail: React.FC<propsType> = ({ dispatch, record, match }) => {
    const id = match.params.id
    const getDetail = () => {
        dispatch({
            type: 'record/fetchDetail',
            payload: {
                id
            }
        })
    }
    useEffect(() => {
        getDetail()
    }, [])

    const isAccTheStandard = (isAcc: number): string => {
        if (isAcc === 1) return '新标准'
        if (isAcc === 2) return '旧标准'
        return '都不符合'
    }
    const approvalStatus = (status: number): any => {
        if (status === 1) return <span className='font-default'>待审核</span>
        if (status === 2) return <span className='font-success'>已通过</span>
        return <span className='font-danger'>不通过</span>

    }
    const { detail } = record;
    const columns = [
        {
            title: '审核人',
            dataIndex: 'auditName',
            key: 'auditName',
        },
        {
            title: '审核日期',
            dataIndex: 'reviewDate',
            key: 'reviewDate',

        },
        {
            title: '审核结果',
            dataIndex: 'auditResults',
            key: 'auditResults',
            render: (auditResults: number): string => approvalStatus(auditResults)

        },
        {
            title: '不通过原因',
            dataIndex: 'reasonForFailure',
            key: 'reasonForFailure',
        }
    ]


    const getNextStep = (callback: Function) => {
        dispatch({
            type: 'record/fetchNextStep',
            payload: { id },
            onSuccess: callback
        })
    }
    const handlePrevious = () => {
        const previous = (id: number) => {
            if (id) {
                history.push(`/record/detail/${id}`);
                window.scrollTo(0, 0);
            } else {
                Message.error({
                    title: '当前为第一条'
                })
            }
        }
        getNextStep(previous)
    }
    const handleNext = () => {

    }
    return (
        <>
            <PageContainer className='bg-white'>
                <div className={styles.container}>
                    <h4>
                        审核状态 :
                        {approvalStatus(detail.approvalStatus)}
                    </h4>
                    <Divider></Divider>
                    <h3>车辆信息</h3>
                    <Divider></Divider>
                    <Descriptions title="" column={2}>
                        <Descriptions.Item label="登记序号">
                            {IsItEmpty(detail.registrationNumber)}
                        </Descriptions.Item>
                        <Descriptions.Item label="依据标准">
                            {IsItEmpty(isAccTheStandard(detail.accordingToTheStandard))}
                        </Descriptions.Item>
                        <Descriptions.Item label="车辆制造商">
                            {IsItEmpty(detail.manufacturer)}
                        </Descriptions.Item>
                        <Descriptions.Item label="车辆中文商标">
                            {IsItEmpty(detail.trademark)}
                        </Descriptions.Item>
                        <Descriptions.Item label="整车编码">
                            {IsItEmpty(detail.vehicleCode)}
                        </Descriptions.Item>
                        <Descriptions.Item label="车辆型号">
                            {IsItEmpty(detail.vehicleModel)}
                        </Descriptions.Item>
                        <Descriptions.Item label="产品合格证">
                            {IsItEmpty(detail.productCertification)}
                        </Descriptions.Item>
                        <Descriptions.Item label="车身长度">
                            {IsItEmpty(detail.bodyLength)}
                        </Descriptions.Item>
                        <Descriptions.Item label="车身宽度">
                            {IsItEmpty(detail.bodyWidth)}
                        </Descriptions.Item>
                        <Descriptions.Item label="车身高度">{
                            IsItEmpty(detail.bodyHeight)}
                        </Descriptions.Item>
                        <Descriptions.Item label="续航里程">
                            {IsItEmpty(detail.rechargeMileage)}
                        </Descriptions.Item>
                    </Descriptions>
                    <Divider></Divider>
                    <h3>车辆图片</h3>
                    <Divider></Divider>
                    <Descriptions title="" column={1}>
                        <Descriptions.Item label="车辆正面照">
                            <Row gutter={24}>
                                <Col span={4}>
                                    <Image
                                        width='100%'
                                        src={imgUlr}
                                    />
                                </Col>
                                <Col span={4}>
                                    <Image
                                        width='100%'
                                        src={imgUlr}
                                    />
                                </Col>
                                <Col span={4}>
                                    <Image
                                        width='100%'
                                        src={imgUlr}
                                    />
                                </Col>
                            </Row>
                        </Descriptions.Item>
                        <Descriptions.Item label="车辆背面照">
                            <Row gutter={24}>
                                <Col span={4}>
                                    <Image
                                        width='100%'
                                        src={imgUlr}
                                    />
                                </Col>
                                <Col span={4}>
                                    <Image
                                        width='100%'
                                        src={imgUlr}
                                    />
                                </Col>
                            </Row>
                        </Descriptions.Item>
                    </Descriptions>
                    <Divider></Divider>
                    <h3>审核信息</h3>
                    <Divider></Divider>
                    <Table rowKey='id' columns={columns} dataSource={detail.list}></Table>
                </div>
            </PageContainer>
            <div className={`${styles.detailFooter} mt-20`}>
                <Row justify="space-around">
                    <Col span={4}>
                        <div onClick={handlePrevious}>上一条</div>
                    </Col>
                    <Col span={4}>
                        <Button type='primary'>审核通过</Button>
                        <span className='w-10'></span>
                        <Button type='primary' danger>审核拒绝</Button>
                    </Col>
                    <Col span={4}>
                        <div onClick={handleNext}>下一条</div>
                    </Col>
                </Row>
            </div>
        </>
    );
}
export default connect(
    ({ record }: any) => ({ record })
)(RecordDetail) 