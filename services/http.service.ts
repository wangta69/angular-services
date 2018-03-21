import { Injectable }			from '@angular/core';
import { RestHttpClient } from 'ng-rest-http';

@Injectable()
export class HttpService  {
	constructor(protected http: RestHttpClient) {}

    private default_url = 'https://xxx.xxx';

	public post(obj:any): Promise<any> {
        obj.url = this.default_url+obj.url;

        if(typeof obj.headers != undefined)
            obj.headers = {};
        obj.headers.Authorization = 'Bearer '+this.authToken();

		return new Promise(resolve => {
	        this.http.post(obj).then((res) => {
	            resolve(res);
	        });
		});
	}

    public get(obj:any): Promise<any>{
        obj.url = this.default_url+obj.url;

        if(typeof obj.headers != undefined)
            obj.headers = {};
        obj.headers.Authorization = 'Bearer '+this.authToken();

		return new Promise(resolve => {
        	this.http.get(obj).then((res) => {
	            resolve(res);
	        });
		});
    }

	public getDirect(obj:any): Promise<any>{
        obj.url = obj.url;

        if(typeof obj.headers != undefined)
            obj.headers = {};

			return new Promise(resolve => {
	        	this.http.get(obj).then((res) => {
		            resolve(res);
		        });
			});
    }


    private authToken(){
        return localStorage.getItem('userToken');
    }
}
