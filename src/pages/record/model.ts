
import { Reducer, Effect } from 'umi';
import { getList, getDetail } from '@/services/record'
import { TableListItem } from './data.d'
export interface ModelState {
    list: TableListItem[]
    total: number,
    pageIndex: number,
    pageSize: number,
    detail: any
}
export interface ModelType {
    namespace: string,
    state: ModelState,
    effects: {
        fetchList: Effect,
        fetchDetail: Effect,
        fetchNextStep: Effect
    },
    reducers: {
        changeEle: Reducer,
        changeList: Reducer,
        changeDetail: Reducer
    }
}
const Model: ModelType = {
    namespace: 'record',
    state: {
        list: [],
        total: 0,
        pageIndex: 0,
        pageSize: 10,
        detail: {}
    },
    effects: {
        *fetchList({ payload }, { call, put }) {
            const { pageIndex, pageSize } = payload;
            yield put({
                type: 'changeEle',
                payload: {
                    pageIndex,
                    pageSize
                }
            })
            const response = yield call(getList, payload);
            yield put({
                type: 'changeList',
                payload: response
            })
        },
        *fetchDetail({ payload }, { call, put }) {
            const { id } = payload;
            const response = yield call(getDetail, id)
            yield put({
                type: 'changeDetail',
                payload: response
            })
        },
        *fetchNextStep({ payload, onSuccess }, { call, put }) {
            const { id } = payload;
            // const response = yield call()
            onSuccess(2)
        }
    },
    reducers: {
        changeEle(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        },
        changeList(state, { payload }) {
            return {
                ...state,
                list: payload.list,
                total: payload.total
            }
        },
        changeDetail(state, { payload }) {
            return {
                ...state,
                detail: { ...payload.data }
            }

        }
    }

}

export default Model