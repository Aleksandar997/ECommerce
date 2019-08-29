import { ResponseBase } from '../responseBase';

export interface ICodebookServiceBase<T> {
    selectAll(): Promise<ResponseBase<Array<T>>>;
}
