import {$authHost, $host} from "./index";
import {IResponse} from "../types/IResponse";


export const UserApi = {
    async signup(email: string, password: string, checkEmail: boolean) {
        const timezoneOffset = Math.round(new Date().getTimezoneOffset() / 60) * -1
        const {data} = await $host.post('signup', {email, password, timezoneOffset, checkEmail}) as IResponse
        localStorage.setItem('accessToken', data.accessToken)
        return data
    },

    async login(email: string, password: string): Promise<IResponse> {
        let response = await $host.post('login', {email, password}) as IResponse
        const data = response.data
        localStorage.setItem('accessToken', data.data.accessToken);
        return data
    },

    async getUser() {
        const {data} = await $authHost.get('getUser') as IResponse
        return data
    },

    async logout() {
        const {data} = await $host.post('logout',) as IResponse
        localStorage.removeItem('accessToken')
        return data
    },

    async resendActivationLink(email: string, password: string) {
        const {data} = await $host.post('resendActivationLink', {email, password}) as IResponse
        return data
    },

    async updateFirstName(newFirstName: string) {
        const {data} = await $authHost.post(`updateFirstName`, {newFirstName}) as IResponse
        return data
    },
    async updateLastName(newLastName: string) {
        const {data} = await $authHost.post(`updateLastName`, {newLastName}) as IResponse
        return data
    },


    async changePassword(oldPassword: string, newPassword: string) {
        const {data} = await $authHost.post(`changePassword`, {oldPassword, newPassword}) as IResponse
        return data;
    },

    async sendNewPassword(email: string) {
        const {data} = await $host.post(`sendNewPassword`, {email}) as IResponse
        return data;
    },
}

