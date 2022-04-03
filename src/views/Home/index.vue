<template>
    <div class="home-page">
        <canvas id="myClock" ref="myClock" width="300" height="300"></canvas>
        <div class="time">北京时间：{{ nowTime }}</div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            timer: null,
            nowTime: null
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.clock();
            this.timer = setInterval(() => {
                this.clock();
            }, 1000);
        });
    },
    beforeDestroy() {
        clearInterval(this.timer);
        this.timer = null;
    },
    activated() {
        if (!this.timer) {
            this.clock();
            this.timer = setInterval(() => {
                this.clock();
            }, 1000);
        }
    },
    deactivated() {
        clearInterval(this.timer);
        this.timer = null;
    },
    methods: {
        // 时钟
        clock() {
            // 获取canvas元素
            // const clk = document.getElementById('myClock');
            // 使用refs引用指向DOM元素
            const clk = this.$refs.myClock;
            if (clk.getContext) {
                const width = (clk.width = 300);
                const ctx = clk.getContext('2d');
                const r = width / 2 - 10;
                ctx.translate(150, 150);
                ctx.save();
                ctx.strokeStyle = '#333';
                ctx.beginPath();
                ctx.lineWidth = 8;
                ctx.arc(0, 0, r, 0, (360 * Math.PI) / 180);
                ctx.stroke();
                ctx.restore();

                ctx.save();
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.arc(0, 0, r + 8, 0, (360 * Math.PI) / 180);
                ctx.stroke();
                ctx.restore();

                // 刻度
                ctx.save();
                for (let i = 0; i < 60; i++) {
                    ctx.beginPath();
                    ctx.lineCap = 'round';
                    ctx.strokeStyle = '#003300';
                    if (i % 5 === 0) {
                        ctx.lineWidth = 2;
                        ctx.moveTo(0, 4 - r);
                        ctx.lineTo(0, 18 - r);
                    } else {
                        ctx.lineWidth = 1;
                        ctx.moveTo(0, 4 - r);
                        ctx.lineTo(0, 14 - r);
                    }
                    ctx.rotate((6 * Math.PI) / 180);
                    ctx.stroke();
                }
                ctx.restore();
                // 文字
                const num = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
                for (let i = 0; i < 12; i++) {
                    var rad = ((2 * Math.PI) / 12) * i;
                    var x = Math.cos(rad) * (r - 32);
                    var y = Math.sin(rad) * (r - 32);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.font = '18px Arial';
                    ctx.fillText(num[i], x, y);
                }

                // 针
                const Ttime = new Date();
                const h = Ttime.getHours();
                const m = Ttime.getMinutes();
                const s = Ttime.getSeconds();

                const hr = 30 * h + m / 2 + s / 120;
                const mr = 6 * m + s / 10;
                const sr = s * 6;
                this.nowTime = this.parseTime(Ttime);
                //时
                ctx.beginPath();
                ctx.save();
                ctx.lineWidth = 7;
                ctx.lineCap = 'round';
                ctx.rotate((hr - 90) * (Math.PI / 180));
                ctx.moveTo(-10, 0);
                ctx.lineTo(r / 2, 0);
                ctx.stroke();
                ctx.restore();

                ctx.beginPath();
                ctx.save();
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#33FF99';
                ctx.lineCap = 'round';
                ctx.rotate((hr - 90) * (Math.PI / 180));
                ctx.moveTo(r / 2 - 11, 0);
                ctx.lineTo(r / 2 - 1, 0);
                ctx.stroke();
                ctx.restore();

                //分
                ctx.beginPath();
                ctx.save();
                ctx.lineWidth = 5;
                ctx.lineCap = 'round';
                ctx.rotate((mr - 90) * (Math.PI / 180));
                ctx.moveTo(-10, 0);
                ctx.lineTo(r / 1.5, 0);
                ctx.stroke();
                ctx.restore();

                ctx.beginPath();
                ctx.save();
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#33FF99';
                ctx.lineCap = 'round';
                ctx.rotate((mr - 90) * (Math.PI / 180));
                ctx.moveTo(r / 1.5 - 11, 0);
                ctx.lineTo(r / 1.5 - 1, 0);
                ctx.stroke();
                ctx.restore();

                //秒
                ctx.beginPath();
                ctx.save();
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'red';
                ctx.lineCap = 'round';
                ctx.rotate((sr - 90) * (Math.PI / 180));
                ctx.moveTo(-10, 0);
                ctx.lineTo(r - 20, 0);
                ctx.stroke();
                ctx.restore();

                //帽子
                ctx.beginPath();
                ctx.save();
                ctx.fillStyle = 'red';
                ctx.arc(0, 0, 5, 0, (360 * Math.PI) / 180);
                ctx.fill();
                ctx.restore();
            }
        },
        // 时间转为字符串
        parseTime(time, cFormat) {
            if (arguments.length === 0 || !time) {
                return null;
            }
            const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
            let date;
            if (typeof time === 'object') {
                date = time;
            } else {
                if (typeof time === 'string') {
                    if (/^[0-9]+$/.test(time)) {
                        // support "1548221490638"
                        time = parseInt(time);
                    } else {
                        // support safari
                        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                        time = time.replace(new RegExp(/-/gm), '/');
                    }
                }

                if (typeof time === 'number' && time.toString().length === 10) {
                    time = time * 1000;
                }
                date = new Date(time);
            }
            const formatObj = {
                y: date.getFullYear(),
                m: date.getMonth() + 1,
                d: date.getDate(),
                h: date.getHours(),
                i: date.getMinutes(),
                s: date.getSeconds(),
                a: date.getDay()
            };
            const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
                const value = formatObj[key];
                // Note: getDay() returns 0 on Sunday
                if (key === 'a') {
                    return ['日', '一', '二', '三', '四', '五', '六'][value];
                }
                return value.toString().padStart(2, '0');
            });
            return time_str;
        }
    }
};
</script>

<style lang="scss" scoped>
.home-page {
    margin-top: 50px;
    text-align: center;
    .time {
        margin-top: 20px;
    }
}
</style>
