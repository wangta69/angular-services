import { Injectable }			from '@angular/core';
import { LocalStorageService }       from 'ng-storages'
import { HttpService }          from './http.service';
export class UserInfo {
    name?: string;
    email?: string;
}

@Injectable()
export class AuthService {
	constructor(protected storage: LocalStorageService, protected http: HttpService) {}

    public validate():Promise<any> {
		return new Promise(function(resolve, reject) {
			this.storage.get('userToken')
			   .then((token) => {
				   if(token == null){
	                   resolve(false);
	               }else{
	                   this.tokenValidation(token).then((obj) => {
	                        //유효성 체크
	                       if(obj.result == true)
	                         resolve(obj);
	                       else
	                         resolve(false);
	                   });
	               }
			   });
		}.bind(this));//return new Promise(function(resolve, reject) {

	};

	public tokenValidation(token):Promise<any>{
		return new Promise(function(resolve, reject) {
	        this.http.get({url:'validToken', headers:{Authorization: 'Bearer '+token}}).then((data) => {
                 resolve(data);
            })
        }.bind(this));
    };
}
