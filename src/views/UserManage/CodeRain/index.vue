<template>
    <div class="code-rain-page w-full h-full overflow-hidden" :class="{ 'pt-10': tagsList.length }">
        <canvas id="canvas" class="w-full h-full"></canvas>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'codeRain',
    computed: {
        ...mapState(['tagsList'])
    },
    mounted() {
        this.drawCodeRain();
    },
    methods: {
        drawCodeRain() {
            let canvas = document.querySelector('canvas');
            let ctx = canvas.getContext('2d');
            canvas.width = screen.availWidth - 200; // 视口宽度 - 左侧导航栏宽度
            canvas.height = screen.availHeight;
            let text = '徐寻觅是大帅比'.split('');
            let Arr = Array(Math.ceil(canvas.width / 10)).fill(0);
            console.log('Arr: ', Arr);
            const rain = () => {
                ctx.fillStyle = 'rgba(0, 0, 0, .05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#0f0';
                Arr.forEach((item, index) => {
                    ctx.fillText(text[Math.floor(Math.random() * text.length)], index * 10, item + 10);
                    Arr[index] = item > canvas.height || item > 10000 * Math.random() ? 0 : item + 10;
                });
            };
            setInterval(rain, 50);
        }
    }
};
</script>

<style lang="scss" scoped></style>
