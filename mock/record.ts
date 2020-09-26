import { Request, Response } from 'express'
import Mock from 'mockjs';
const listArr = [];
for (let i = 0; i < 100; i++) {
    listArr.push({
        id: i + 1,
        username: '张三' + i,
        numberPhone: 15619270901,
        numberCertificate: 12345678,
        numberPlate: 12345678,
        approvalStatus: 12345678,
    })
}

export default {
    'POST /api/recordList': (req: Request, res: Response) => {
        const { pageIndex, pageSize } = req.body;
        let startIndex = (pageIndex - 1) * pageSize;
        let endIndex = pageIndex * pageSize;
        const arr = listArr.slice(startIndex, endIndex);
        res.send({
            status: 'ok',
            list: [...arr],
            total: listArr.length,
        })
    },
    'POST /api/recordDetail': Mock.mock({
        data: {
            'list|5': [{
                'id|+1': 1,
                'auditName|1': ['陈皮安', '阿良', '许乐', '徐凤年'], //审核人员
                'auditResults|1': ['已通过', '不通过'], //审核状态
                'reviewDate': '@date(yyyy-MM-dd)', //审核日期,
                'reasonForFailure|1': [
                    '陈皮安:我有一剑,可搬山,倒海',
                    '阿良:我叫阿良,善良的良',
                    '许乐:来自东林的一块石头',
                    '柿子:第九剑叫六千里'
                ]
            }],
            'approvalStatus|1': [0, 1, 2], //审核状态 0不通过 1待审核 2已通过
            'accordingToTheStandard|1': [1, 2, 3], //依据标准 1新标准 2旧标准 3都不符合
            registrationNumber: 123456, //登记序号
            manufacturer: '爱马', //制造商
            trademark: '爱马商标1234', //中文商标
            vehicleCode: Math.floor(Math.random() * 1000), //整车编码
            vehicleModel: Math.floor(Math.random() * 100), //车辆型号
            productCertification: Math.floor(Math.random() * 1000), //产品合格证
            bodyLength: Math.floor(Math.random() * 10), //车身长度
            bodyWidth: Math.floor(Math.random() * 10), // 车身宽度
            bodyHeight: Math.floor(Math.random() * 10), //车身高度
            rechargeMileage: Math.floor(Math.random() * 10000), // 续航里程
        }

    })
}
