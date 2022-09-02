// 环状/饼图配置项
/**
 * 数据看盘数据
 * @param pieChartData: 饼图数据
 * @param legendData：图例数据
 */
function piechartOption(pieChartData, legendData) {
    // console.log('data: ', pieChartData, legendData);
    let option = {
        color: ['#2589ff', '#ef0001', '#00ce70', '#f7c73a', '#525252'],
        tooltip: {
            show: true,
            trigger: 'item'
        },
        legend: {
            orient: 'horizontal',
            x: 'center',
            bottom: 30,
            height: 14,
            align: 'auto',
            icon: 'circle',
            itemWidth: 14,
            itemHeight: 14,
            itemGap: 30,
            selectedMode: false,
            textStyle: {
                color: '#333333',
                fontSize: 14,
                align: 'center'
            },
            formatter: function (name) {
                return name.length > 6 ? name.substr(0, 6) + '...' : name;
            },
            data: legendData
        },
        series: [
            {
                type: 'pie',
                // radius: ['25%', '40%'], // 环状图大小
                // center: ['50%', '40%'], // 环状图的位置，距离左跟上的位置
                avoidLabelOverlap: true, // 防止标签重叠策略
                hoverAnimation: false, // 关闭放大效果
                label: {
                    show: true,
                    position: 'inside',
                    color: '#fff',
                    fontSize: 14,
                    lineHeight: 18,
                    formatter: function (data) {
                        // console.log('data: ', data);
                        return data.percent.toFixed(2) + '%';
                    }
                },
                // 是否开启高亮后扇区的放大效果
                emphasis: {
                    scale: true
                },
                data: pieChartData
            }
        ]
    };
    return option;
}

export default piechartOption;
