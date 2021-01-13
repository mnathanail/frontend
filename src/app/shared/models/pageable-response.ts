import {Pageable} from './pageable';
import {Sort} from './sort';

export interface PageableResponse<T> {
    content: T;
    pageable: Pageable;
    //sort: Sort;
    totalElements: number;
}
