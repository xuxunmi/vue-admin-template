<template>
    <div class="echart-page">
        <div class="line-chart-wrap">
            <div id="lineChart"></div>
        </div>
        <div class="pie-chart-wrap">
            <div id="pieChart"></div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import lineChartOption from '@/common/js/echartsOption/linechartOption.js';
import piechartOption from '@/common/js/echartsOption/piechartOption.js';
export default {
    name: 'linePieChart',
    mounted() {
        this.handleEchartsInstance();
    },
    methods: {
        //echarts获取dom实例
        initEchart(id) {
            return echarts.init(document.getElementById(id));
        },
        //echarts实例
        handleEchartsInstance() {
            let lineChart = this.initEchart('lineChart');
            let pieChart = this.initEchart('pieChart');
            let todayData = [10, 20, 30, 40, 37, 56, 70];
            let yesterdayData = [19, 29, 39, 49, 42, 59, 79];
            let timeCycle = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
            let pieChartData = [
                { value: 99, name: '今日数据' },
                { value: 99, name: '昨日数据' },
                { value: 999, name: '前天数据' }
            ];
            let legendData = ['今日数据', '昨日数据', '前天数据'];
            let echartDomElement;
            // 若有echarts实例，则先将图表销毁
            if (echartDomElement != null && echartDomElement != '' && echartDomElement != undefined) {
                echartDomElement.dispose();
            }
            this.drawLineChart(lineChart, todayData, yesterdayData, timeCycle, 'day');
            this.drawPieChart(pieChart, pieChartData, legendData);
        },
        // 饼图
        drawPieChart(chartsElement, pieChartData, legendData) {
            // console.log('charts: ', charts);
            // console.log('pieChartData: ', pieChartData);
            // console.log('legendData: ', legendData);
            chartsElement.setOption(piechartOption(pieChartData, legendData));
            // 执行echarts自带的resize方法，即可做到让echarts图表自适应
            window.addEventListener('resize', () => {
                chartsElement.resize();
            });
        },

        //折线图
        drawLineChart(chartsElement, todayData, yesterdayData, timeCycle, timeType) {
            // console.log('charts: ', charts);
            // console.log('今日浏览量todayData: ', todayData);
            // console.log('今日曝光量yesterdayData: ', yesterdayData);
            // console.log('时间周期timeCycle: ', timeCycle);
            chartsElement.setOption(lineChartOption(todayData, yesterdayData, timeCycle, timeType));
            // 执行echarts自带的resize方法，即可做到让echarts图表自适应
            window.addEventListener('resize', () => {
                chartsElement.resize();
            });
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', () => {
            let lineChart = this.initEchart('lineChart');
            let pieChart = this.initEchart('pieChart');
            lineChart.resize();
            pieChart.resize();
        });
    }
};
</script>

<style lang="scss" scoped>
.echart-page {
    box-sizing: border-box;
    margin-top: 50px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    .line-chart-wrap {
        width: 48%;
        height: 800px;
        background-color: #eee;
        #lineChart {
            width: 100%;
            height: 100%;
        }
    }
    .pie-chart-wrap {
        width: 48%;
        height: 800px;
        background-color: #eee;
        #pieChart {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
