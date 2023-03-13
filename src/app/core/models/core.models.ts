export interface CommonResponse<D = {}> {
  data: D;
  messages: string[];
  fieldsErrors: string[];
  resultCode: number;
}
