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
        let dateFormat; // korAMPM 오전 몇시

        Proto.prototype.intervalId = intervalId;

        Proto.prototype.stopTimer = function() {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };

        Proto.prototype.setDateFormat = function(format) {
            dateFormat = format;
        };

        /**
        *@param DateTime nowDateTime  2018-08-29T01:44:36.839Z
        */
        Proto.prototype.refresh_nowDateTime = function (nowDateTime) {
            startTime = new Date(Date.parse(nowDateTime)).getTime(); // UnixTime으로 변경
        };

        Proto.prototype.countdownStart = function (nowDateTime, callback) {

            const set_nowDateTime = function(DateTime) { // 현재 시간을 세팅한다. 서버 시간으로 세팅
                startTime = new Date(Date.parse(DateTime)).getTime(); // UnixTime으로 변경
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

            /**
            * new Date 는 모든 데이타를 로컬라이징 시킨다.
            * 따라서 현재 시간을 offset을 구하여 빼면 UTC 타임이 되고 이곳에서 한국시간을 더하면 한국 시간이 된다.
            */
            const localAsiaSeoul = function (utime?) {
                utime = utime ? utime : startTime;

                const LocalDateTime = new Date(utime); // .toLocaleString('en-US', {timeZone: 'UTC'});
                const userTimezoneOffset = LocalDateTime.getTimezoneOffset() * 60000;

                return new Date(LocalDateTime.getTime() + userTimezoneOffset + 32400000);
            };

            const getRound = function () {
                const startDateTime = localAsiaSeoul();

                const H = startDateTime.getHours();
                const i = startDateTime.getMinutes();
                const s = startDateTime.getSeconds();

                const timer = H * 60 * 60 + i * 60 + s;
                return Math.ceil(timer / (60 * gameterm));
            };

            const countdown_humanreadable = function () {
                const obj: any = {};

                const startDateTime = localAsiaSeoul();

                obj.Y = startDateTime.getFullYear();
                obj.m = startDateTime.getMonth();
                obj.d = startDateTime.getDate();
                obj.H = startDateTime.getHours();
                obj.i = startDateTime.getMinutes();
                obj.s = startDateTime.getSeconds();

                obj.i = checkTime(obj.i);
                obj.s = checkTime(obj.s);
                obj.m = checkTime(obj.m + 1);

                const pass_seconds = startDateTime.getTime() % (60 * gameterm * 1000);
                const countdown_seconds = Math.ceil(((60 * gameterm * 1000) - pass_seconds) / 1000);
                obj.countdown_ii = Math.floor(countdown_seconds / 60);
                obj.countdown_ss = countdown_seconds % 60;
                return obj;
            };

            const formatAMPM = function(settedTime) {
                const d = localAsiaSeoul(settedTime);
                const h = d.getHours();
                return (h < 12 ? '오전' : '오후') + ' '  + (h % 12 || 12)
                    + ':' + ('0' + d.getMinutes().toString()).slice(-2);
            };

            const formatYMDAMPM = function(settedTime) {
                const d = localAsiaSeoul(settedTime);
                const h = d.getHours();
                return d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate() + ' ' + (h < 12 ? 'AM' : 'PM') + ' '  + (h % 12 || 12)
                    + ':' + ('0' + d.getMinutes().toString()).slice(-2) + ':' + ('0' + d.getSeconds().toString()).slice(-2);
            };

            const displayTimer = function () {
                const obj = countdown_humanreadable();
                // 하단은 좌측 출력용
                obj.remainsecond = obj.countdown_ii * 60 + obj.countdown_ss;
                obj.next_no = getRound() + 1;

                let localTime;
                switch (dateFormat) {
                    case 'korAMPM':
                        localTime = formatAMPM(startTime); // 오전 3:32
                    break;
                    default:
                        localTime = formatYMDAMPM(startTime); // 2018.08.10 PM 6:31
                    break;
                }

                if (typeof callback !== 'undefined') { // 이후 되도록 callback을 이용하여 함수처리
                    callback({next_no: obj.next_no, countdown_ii: obj.countdown_ii,
                    countdown_ss: obj.countdown_ss, remainsecond: obj.remainsecond, c_datetime: localTime});
                }
            };

            intervalId = setInterval(() => {
                startTime = startTime + 1000; // 시간을 1초식 올린다.
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
