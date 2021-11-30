<template>
    <div class="lucky-draw-page">
        <ul class="box">
            <li
                v-for="item in data"
                :key="item.id"
                class="box-item"
                :class="['item' + item.id, activeId === item.id ? 'active' : '']"
            >
                {{ item.id }}
            </li>
            <button class="btn" :disabled="isStart" @click="handleClick">GO</button>
            <div class="left-point point-wrapper">
                <span class="point"></span>
                <span class="point"></span>
                <span class="point"></span>
                <span class="point"></span>
                <span class="point"></span>
                <span class="point"></span>
            </div>
            <div class="right-point point-wrapper">
                <span class="point"></span>
                <span class="point"></span>
                <span class="point"></span>
                <span class="point"></span>
                <span class="point"></span>
                <span class="point"></span>
            </div>
            <div class="top-point point-wrapper">
                <span class="point"></span>
                <span class="point"></span>
                <span class="point"></span>
                <span class="point"></span>
                <span class="point"></span>
                <span class="point"></span>
            </div>
            <div class="bottom-point point-wrapper">
                <span class="point"></span>
                <span class="point"></span>
                <span class="point"></span>
                <span class="point"></span>
                <span class="point"></span>
                <span class="point"></span>
            </div>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'UserResetPsd',
    data() {
        return {
            activeId: 0,
            times: 4,
            timer: null,
            zhong: '',
            speed: 100,
            isStart: false,
            data: []
        };
    },
    mounted() {
        setTimeout(() => {
            this.data = [
                {
                    id: 1
                },
                {
                    id: 2
                },
                {
                    id: 3
                },
                {
                    id: 4
                },
                {
                    id: 5
                },
                {
                    id: 6
                },
                {
                    id: 7
                },
                {
                    id: 8
                }
            ];
        }, 200);
    },
    methods: {
        handleClick() {
            this.isStart = true;
            this.zhong = '';
            this.times = 4;
            this.speed = 100;
            setTimeout(() => {
                if (this.times < 0) {
                    this.times = 1;
                }
                const rand = Math.random() * 8 + 1;
                this.zhong = parseInt(rand);
                console.log(this.zhong, rand);
            }, 1000);
            this.start();
        },
        start() {
            this.timer = setInterval(() => {
                this.activeId++;
                if (this.activeId > 8) {
                    this.activeId = 1;
                    this.times--;
                }
                if (this.zhong && this.times === 1) {
                    clearInterval(this.timer);
                    this.speed = 200;
                    this.start();
                }
                if (this.times <= 0 && this.activeId === this.zhong) {
                    this.isStart = false;
                    clearInterval(this.timer);
                    this.$message.success(`恭喜中了${this.zhong}`);
                }
            }, this.speed);
        }
    }
};
</script>

<style lang="scss" scoped>
.lucky-draw-page {
    margin: 100px auto;
    text-align: center;
    width: 360px;
    height: 360px;
    border-radius: 20px;
    background-color: lawngreen;
    padding: 20px;
    background-image: linear-gradient(#f7c9aa, #f88d62);
    .box {
        border-radius: 10px;
        position: relative;
        width: 320px;
        height: 320px;
        background: rgb(250, 249, 246);
    }
    .left-point {
        left: -20px;
    }
    .right-point {
        right: -20px;
    }
    .left-point,
    .right-point {
        position: absolute;
        top: 0;
        width: 20px;
        height: 320px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    .bottom-point {
        bottom: -20px;
    }
    .top-point {
        top: -20px;
    }
    .bottom-point,
    .top-point {
        width: 320px;
        height: 20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: absolute;
        left: 0;
    }

    .point {
        display: inline-block;
        width: 8px;
        height: 8px;
        background-color: #f3591d;
        border-radius: 50%;
        animation: example 0.6s infinite;
        &:nth-child(2n + 1) {
            animation-delay: 0.3s;
        }
    }
    .btn {
        position: absolute;
        display: block;
        border: none;
        width: 100px;
        height: 100px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: yellowgreen;
        border-radius: 50%;
        font-size: 30px;
        color: #fff;
        cursor: pointer;
    }

    .box-item {
        width: 100px;
        height: 100px;
        border: 1px solid #000;
        position: absolute;
        left: 100px;
        text-align: center;
        line-height: 100px;

        &.active {
            background-color: orange;
        }

        &:nth-child(1) {
            left: 5px;
            top: 5px;
        }

        &:nth-child(2) {
            left: 110px;
            top: 5px;
        }

        &:nth-child(3) {
            left: 215px;
            top: 5px;
        }

        &:nth-child(4) {
            left: 215px;
            top: 110px;
        }

        &:nth-child(5) {
            left: 215px;
            top: 215px;
        }

        &:nth-child(6) {
            left: 110px;
            top: 215px;
        }

        &:nth-child(7) {
            left: 5px;
            top: 215px;
        }

        &:nth-child(8) {
            left: 5px;
            top: 110px;
        }
    }
}
@keyframes example {
    from {
        background-color: #f3591d;
        box-shadow: 0px 0px 2px #f3591d;
    }
    to {
        background-color: #fff;
        box-shadow: 0px 0px 2px #fff;
    }
}
</style>