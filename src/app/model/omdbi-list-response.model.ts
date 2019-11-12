import {OmdbiListItemModel} from './omdbi-list-item.model';

export type BooleanString = 'True' | 'False';
export interface OmdbiListResponseModel {
  Response: BooleanString;
  Search: Array<OmdbiListItemModel>;
  totalResults: number;
  Error: string;
}
