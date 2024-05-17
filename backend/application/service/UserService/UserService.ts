import UserDomainService from "../../../core/domainService/UserDomainService";
import {User} from "../../../core/domain/User/User";
import bcrypt from "bcryptjs";
import uuid from "uuid";
import RegisterUserDto from "../../dtos/RegisterUserDto";

export default class UserService {
    constructor(readonly userDomainService: UserDomainService) {}

    async getAll() {
        return this.userDomainService.getAll();
    }

    async getOne(key:string, value:any) {
        return this.userDomainService.getOne(key, value);
    }


    async getOneByEmail(email: string) {
        return this.userDomainService.getOneByEmail(email);
    };

    async register(email:string, password:string, timezoneOffset:number){
        return this.userDomainService.register(email, password, timezoneOffset);
    };



    async checkUserExists(email: string) {
        return this.userDomainService.checkUserExists(email);
    }
    async activate(activationLink: string) {
        return this.userDomainService.activate(activationLink);
    };

    async updateUserLogs(email: string) {
        return this.userDomainService.updateUserLogs(email);
    };

    async checkPassword(email: string, password: string) {
        return this.userDomainService.checkPassword(email, password);
    };


    async setNewPassword(email: string, newPassword: string) {
        return this.userDomainService.setNewPassword(email, newPassword);
    };

    async checkSubscription(endOfSubscription: Date) {
        return this.userDomainService.checkSubscription(endOfSubscription);
    };

    async removeSubscription(email: string) {
        return this.userDomainService.removeSubscription(email);
    };

    async validateStrike(email:string) {
        return this.userDomainService.validateStrike(email);
    };

    async resetStrike(email: string) {
        return this.userDomainService.resetStrike(email);
    };

    async validateSubscriptionStatus(email:string) {
        return this.userDomainService.validateSubscriptionStatus(email);
    }

    async update(email:string, newData:{}) {
        return this.userDomainService.update(email, newData);
    }
}
