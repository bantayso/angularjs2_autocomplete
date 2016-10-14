export interface IUser {
    id: number;
    name: string;
    image: string;
    price: string;
    fullName: string;
    profession:string;
}

export interface ITag {
    TagId: number;
    TagName: string;
    Type: string;
}

export interface ITeam {
    GroupId: number;
    Name: string;
    Code: string;    
    IsDelete: boolean;   
}

export interface ITitle {
    TitleId: number;
    Name: string;
    Abbreviation: string; 
}

export interface IContract {
    ContractId: number;
    ContractName: string;
    MemberId: number;
    Member: string;
    Notes: string;
    ItemId: number; 
    ItemName: string; 
    CreateAt: string; 
    GetCreateAt: string; 
    TitleId: number; 
    Abbreviation: string; 
    Closing: string; 
    GetClosing: string; 
    Date: string; 
    GetDate: string; 
    Rating: number; 
    TagId: number; 
    Tag: string; 
    UserId: number; 
    UserName: string; 
    Revenue: number; 
    Probability: number; 
    SourceId: number; 
    SourceName: string;
    ReferanceId: number;  
    ReferanceName: string;  
    ModifyDay: string;  
    GetModifyDay: string;
    IsDelete: boolean; 
}

export interface Pagination {
    CurrentPage : number;
    ItemsPerPage : number;
    TotalItems : number;
    TotalPages: number;
}

export class PaginatedResult<T> {
    result :  T;
    pagination : Pagination;
}

export interface Predicate<T> {
    (item: T): boolean
}
export class NavigableObject<T> {
    constructor(private obj: T, private path: string[] = []) { }

    To<R>(p: (x: T) => R): NavigableObject<R> {
        return new NavigableObject<R>(p(this.obj),
            this.path.concat(this.getPropName(p)));
    }

    getPath() {
        return this.path;
    }

    private static propertyRegEx = /\.([^\.;]+);?\s*\}$/;

    private getPropName(propertyFunction: Function) {
        return NavigableObject.propertyRegEx.exec(propertyFunction.toString())[1];
    }
}