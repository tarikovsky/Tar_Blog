export interface IComment{
    createdAt:Date,
    body:string,
    id: string
}

export interface IPost{
    id:number,
    createdAt: Date,
    userName: string,
    title: string,
    body:string;
    comments: IComment[]
}