
interface picsItem {
    format: string;
    height: number;
    originUrl: string;
    pcRectangleUrl: string;
    pcSquareUrl: string;
    rectangleUrl: string;
    squareUrl:string;
    width: number;
}
interface userItem {
    avatarDetail: {
        identityIconUrl: string;
        identityLevel: number;
    }
    backgroundUrl: string;
    backgroundImgIdStr: string;
    backgroundImgId: number;
    avatarUrl: string;
    nickname: string;
}
interface tailMarkItem {
    markType: string;
    markTitle: string;
    markResourceId: string;
    markOrpheusUrl: string;
    circle: {
        imageUrl: string;
        member: string;
        postCount: string;
    }
}







export interface noteRecommendItem {
    id:number;
    actId: number;
    actName: string;
    actType: number;
    uuid: string;
    pics: picsItem[];
    user: userItem;
    tailMark: tailMarkItem;
    json: string;
}

export interface noteRecommendRes {
    code: number;
    events: noteRecommendItem[];
}

interface followTypeItemObj{
    iconUrl: string;
}
interface followTypeItem {
    associator: followTypeItemObj;
}
export interface followItem {
    avatarUrl: string;
    nickname: string;
    signature: string | null;
    time: number;
    userId: number;
    vipRights: followTypeItem;
}
export interface followRes {
    code: number;
    followeds: followItem[];
}