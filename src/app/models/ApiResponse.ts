export class ApiResponse<T> {
    StatusCode:any;
    IsSuccess?:boolean;
    ErrorMessages:any;
    Result:T | undefined;
}
