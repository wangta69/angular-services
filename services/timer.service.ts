import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map, take } from 'rxjs/operators';

@Injectable()
export class TimerService {
    constructor() {
    }

    gameTimer () {
        const Proto = function () {};
        let startTime;
        let gameterm;
        let intervalId;

        Proto.prototype.intervalId = intervalId;

        Proto.prototype.stopTimer = function() {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };

        Proto.prototype.refresh_nowDateTime = function (nowDateTime) {
            startTime    = new Date(Date.parse(nowDateTime));
        };

        Proto.prototype.countdownStart = function (nowDateTime, callback) {

            const set_nowDateTime = function(DateTime) { // 현재 시간을 세팅한다. 서버 시간으로 세팅
                startTime    = new Date(Date.parse(DateTime));
                gameterm = 2; // 2분 게임 셑
            };

            set_nowDateTime(nowDateTime);

            const checkTime = function (i) {//
                if (i < 10) { i = '0' + i; }  // add zero in front of numbers < 10
                return i;
            };

            const synctime = function () {
                // $.post("/lib/ajax.class.pick.regis.php?action=synctime", {}, function(data){
                //    let obj = jQuery.parseJSON(data);
                //    set_nowDateTime(obj.nowTime, game);
                // });
            };

            const getRound = function () {
                const H    = startTime.getHours();
                const i    = startTime.getMinutes();
                const s    = startTime.getSeconds();

                const timer = H * 60 * 60 + i * 60 + s;
                return Math.ceil(timer / (60 * gameterm));
            };

            const countdown_humanreadable = function () {
                const obj: any = {};

                obj.Y    = startTime.getFullYear();
                obj.m    = startTime.getMonth();
                obj.d    = startTime.getDate();
                obj.H    = startTime.getHours();
                obj.i    = startTime.getMinutes();
                obj.s    = startTime.getSeconds();

                obj.i = checkTime(obj.i);
                obj.s = checkTime(obj.s);
                obj.m = checkTime(obj.m + 1);

                // calculate remain time
                const pass_seconds = startTime.getTime() % (60 * gameterm * 1000);
                const countdown_seconds = Math.ceil(((60 * gameterm * 1000) - pass_seconds) / 1000);
                obj.countdown_ii = Math.floor(countdown_seconds / 60);
                obj.countdown_ss = countdown_seconds % 60;
                return obj;
            };

            const displayTimer = function () {
                const obj = countdown_humanreadable();
                // 하단은 좌츠 출력용
                obj.remainsecond = obj.countdown_ii * 60 + obj.countdown_ss;
                obj.next_no = getRound() + 1;

                if (typeof callback !== 'undefined') { // 이후 되도록 callback을 이용하여 함수처리
                    callback({next_no: obj.next_no, countdown_ii: obj.countdown_ii,
                    countdown_ss: obj.countdown_ss, remainsecond: obj.remainsecond});
                }
            };

            intervalId = setInterval(() => {
                startTime = new Date(Date.parse(startTime) + 1000); // 시간을 1초식 올린다.

                const H    = startTime.getHours();
                const i    = startTime.getMinutes();
                const s    = startTime.getSeconds();
                const timer = H * 60 * 60 + i * 60 + s;

                if (timer % 60 === 0) { synctime(); } // 시간을 동기화 시킨다.
                displayTimer();

            }, 1000);

        };

        return {
            getInstance: function () {
                return new Proto();
            }
        };

    }

}