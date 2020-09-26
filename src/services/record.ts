import request from '@/utils/request';


export interface AuthorListParams {
    pageIndex: number,
    pageSize: number,
    filter?: object
}

export async function getList(params: AuthorListParams) {
    return request('/api/recordList', {
        method: 'POST',
        data: params
    })
}

export async function getDetail(id: number) {
    return request('/api/recordDetail', {
        method: 'POST',
    })
}