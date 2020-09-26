import React from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col } from 'antd'


import styles from '../../index.less'
const Filter: React.FC<{}> = () => {
    const [from] = Form.useForm();
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    // 下拉项组件
    const { Option } = Select;
    // 时间开始结束组件
    const { RangePicker } = DatePicker;

    const handleFromFilter = (fieldsValue): void => {
        console.log(fieldsValue);
    }
    return (
        <div className={styles.filterContain}>
            <Form
                {...layout}
                form={from}
                onFinish={handleFromFilter}
            >
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item label='用户名' name='username'>
                            <Input placeholder='请输入用户名'></Input>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='手机号' name='numberPhone'>
                            <Input placeholder='请输入手机号'></Input>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='证件号码' name='numberCertificate'>
                            <Input placeholder='请输入证件号'></Input>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item label='车牌号' name='numberPlate'>
                            <Input placeholder='请输入车牌号'></Input>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='审核状态' name='approvalStatus'>
                            <Select placeholder='请选择审核状态'>
                                <Option value='全部'>全部</Option>
                                <Option value='待审核'>待审核</Option>
                                <Option value='已通过'>已通过</Option>
                                <Option value='未通过'>未通过</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='申请日期' name='dateOfApplication'>
                            <RangePicker></RangePicker>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item label='审核日期' name='reviewDate'>
                            <RangePicker></RangePicker>
                        </Form.Item>
                    </Col>
                </Row>
                <div className='filter-button'>
                    <Button type='primary' htmlType="submit">查 询</Button>
                </div>
            </Form>
        </div >
    );
}

export default Filter;
