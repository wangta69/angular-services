import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
import { LocalStorageService } from 'ng-storages';

@Injectable()
export class SocketService {
    private url = 'http://xxx.xxx.xxx.xxx:portNumber';
    public socket;
    _rooms = [];

    constructor(protected storage: LocalStorageService) {
    }

    init(url) {

        this.url = url;

        this.socket = io(this.url);

        this.On('connection').subscribe(obj => {
            this.setLogin();
        });

        this.socket.on('error', (error) => {
            console.log('socket error');
            console.log(error);
        });

        this.socket.on('disconnect', (reason) => {
            console.log('disconnected');
            console.log(reason);
        });

        this.socket.on('reconnect', (attemptNumber) => {
            console.log('reconnecting..' + attemptNumber);
        });
    }

    setLogin() {
        this.storage.getObject('user').then((res) => {
            this.Emit('login', res); // 로그인 정보를 node에 전달한다.
        });
    }

    On(key) { // 두개의 인자값을 받아서 하나의 object로 결합하워 callback
        const observable = new Observable(observer => {
            this.socket.on(key, (...arg: any[]) => {
                observer.next(arg);
            });
            return () => { // unsubscribe 시 socket자체가 disconnect되는 것을 방지하기 위해 아래는 주석 처리한다.
                // this.socket.disconnect();
            };
        });

        return observable;
    }

    Emit(...args: any[]) {
        this.socket.emit(...args);
    }

    /*
    removeAllListener(eventName, callback):Promise<any> {
        return new Promise(resolve => {
            resolve(true);
        });
    }
    */

    removeListener(name): Promise<any> {
        this.socket.off(name);

        return new Promise(resolve => {
            resolve(true);
        });
    }

    /**
    [server side]
    socket.on('joinRoom', function(req){
         try{
            assert(req.room);
            socket.join(req.room);
        }catch(e){
            console.log('joinRoom error occur');
            console.log(e);
        }
    });
    **/
    joinRoom(room): Promise<boolean> {
        if (!this.in_array(room, this._rooms)) {
            this.room = room;
            this.Emit('joinRoom', {room: room});
        }

        return new Promise(resolve => {
            resolve(true);
        });
    }

    /**
    [server side]
    socket.on('leaveRoom', function(req){
         try{
            assert(req.room);
            socket.leave(req.room);
        }catch(e){
            console.log('leaveRoom error occur');
            console.log(e);
        }
    });
    */
    leaveRoom(room): Promise<boolean> {
        const index = this._rooms.indexOf(room);
        this._rooms.splice(index, 1);

        this.Emit('leaveRoom', {room: room});

        return new Promise(resolve => {
            resolve(true);
        });
    }

    /**
    * leave from all rooms
    */
    leaveRooms(): Promise<boolean> {
        for (let i = 0; i < this._rooms.length; i++) {
            const room = this._rooms[i];
            this.Emit('leaveRoom', {room: room});
        }
        this._rooms = [];
        return new Promise(resolve => {
            resolve(true);
        });
    }

    set room(room: string) {
        this._rooms.push(room);
    }
    /*
    get rooms():any{
        return this._rooms;
    }
    */

    private in_array(needle, haystack) {
        for (const i in haystack) {
            if (haystack.hasOwnProperty(i)) {
                if (haystack[i] === needle) { return true; }
            }
        }
        return false;
    }
}
