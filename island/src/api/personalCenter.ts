
import { useAxios } from './index';

export interface BaseResponse<T> {
    code: number;
    data: T;
    msg: string;
}

// 用户资料类型
export interface UserProfile {
    username: string;
    avatar: string;
    intro: string;
    // 其他字段...
}
export interface ProfileUpdate {
    username?: string;
    intro?: string;
    avatar?: string;
}

export interface FollowItem {
    id: number;
    name: string;
    img: string;
    introduction: string;
}
export const DEFAULT_PROFILE = {
    USERNAME: '岛友',
    INTRO: '这位岛友很懒，什么也没留下~',
    AVATAR: '/src/assets/image/1.png'  // 确认该路径图片存在
};

export const personalApi = {
    DEFAULT_PROFILE,


    getProfile: () => useAxios.get<BaseResponse<UserProfile>>('/api/info'),

    //更新用户信息
    updateProfile: (data: ProfileUpdate) =>
        useAxios.put<BaseResponse<void>>('/api/profile', data),


    // 获取用户关注列表

    getFollows: () => useAxios.get<BaseResponse<FollowItem[]>>('/api/follows'),

    //取消关注
    unfollow: (itemId: number) =>
        useAxios.delete<BaseResponse<void>>(`/user/follows/${itemId}`)
};

