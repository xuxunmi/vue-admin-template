// //折线图图配置项
// //折线图图配置项
import dayjs from 'dayjs';
let formatDate = dayjs(new Date()).format('YYYY-MM-DD');
let formatMonth = dayjs(new Date()).format('YYYY-MM');
let formatYear = dayjs(new Date()).year();
console.log('formatDate: ', formatDate, formatMonth, formatYear);
/**
 * 数据看盘数据
 * @param todayData: 今日数据
 * @param yesterdayData：今日曝光量
 * @param timeCycle：时间周期
 * @param timeType：时间类型
 */
function lineChartOption(todayData, yesterdayData, timeCycle, timeType) {
    let option = {
        title: {
            text: '一周数据对比',
            textStyle: {
                fontWeight: 700,
                fontSize: 24
            },
            top: 50,
            right: 'center',
            bottom: 'center',
            left: 'center'
        },
        legend: {
            orient: 'horizontal',
            x: 'center',
            bottom: 20,
            width: 250,
            height: 14,
            align: 'auto',
            icon: 'circle',
            itemWidth: 14,
            itemHeight: 14,
            itemGap: 50,
            selectedMode: false, // 图例选择的模式，控制是否可以通过点击图例改变系列的显示状态
            textStyle: {
                color: '#333333',
                fontSize: 14,
                align: 'center'
            },
            data: ['今日数据', '昨日数据']
        },
        grid: {
            top: '20%',
            left: '3%',
            right: '4%',
            containLabel: true // 常用于『防止标签溢出』
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: '#4f4f4f',
            textStyle: {
                color: '#fff'
            }
            // formatter: function (params) {
            //     console.log('params: ',params)
            //     if (params.length > 0) {
            //         let str = '';
            //         let result = '';
            //         switch (timeType) {
            //             case 'day':
            //                 str = formatDate + ' ' + params[0].name;
            //                 break;
            //             case 'month':
            //                 str = formatMonth + ' ' + params[0].name;
            //                 break;
            //             default:
            //                 str = formatYear + ' ' + params[0].name;
            //                 break;
            //         }
            //         params.forEach((item, index) => {
            //             index === 0
            //                 ? (result += str + '<br>' + item.marker + item.seriesName + ': ' + item.value + '<br>')
            //                 : (result += item.marker + item.seriesName + ': ' + item.value + '<br>');
            //         });
            //         return result;
            //     }
            // }
        },
        dataZoom: [
            {
                type: 'inside', // 左右平移缩放
                show: true,
                start: timeType == 'day' ? 0 : 1, // 数据窗口范围的起始百分比。范围是：0 ~ 100。表示 0% ~ 100%。
                end: timeType == 'day' ? 100 : 50, // 数据窗口范围的结束百分比。范围是：0 ~ 100。
                xAxisIndex: [0],
                zoomLock: true // 如果为true,则锁定选择区域的大小，也就是说只能平移，不能缩放
            }
        ],
        xAxis: {
            type: 'category',
            // 不留白，从原点开始
            boundaryGap: false,
            axisLabel: {
                interval: 0,
                fontSize: 14,
                color: '#333333'
            },
            axisTick: {
                show: true //不显示坐标轴刻度线
            },
            data: timeCycle
        },
        yAxis: {
            name: '单位：万',
            show: true,
            type: 'value',
            nameGap: 15, // 坐标轴名称与轴线之间的距离
            axisTick: {
                show: true // 是否显示坐标轴刻度
            },
            axisLine: {
                show: true // 是否显示坐标轴轴线
            },
            // splitLine: {
            //     show: false //不显示网格线
            // },
            axisLabel: {
                interval: 0,
                fontSize: 10,
                color: '#333333'
            },
            nameTextStyle: {
                color: '#333333',
                align: 'left'
            }
        },
        series: [
            {
                name: '今日数据',
                type: 'line',
                symbol: 'none',
                smooth: true,
                itemStyle: {
                    color: '#ff6600'
                },
                data: todayData
            },
            {
                name: '昨日数据',
                type: 'line',
                symbol: 'none',
                smooth: true,
                itemStyle: {
                    color: '#3099ff'
                },
                data: yesterdayData
            }
        ]
    };
    return option;
}

export default lineChartOption;
