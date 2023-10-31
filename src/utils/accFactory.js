import Big from 'big.js';

export function accFactory(method = 'add') {
    return function (...nums) {
        //   将传入的参数转换为Number类型，并过滤掉不是Number类型的结果
        nums = nums.map(Number).filter(num => num || num === 0);
        //   如果过滤后的结果是长度为1的数组，那就返回数组的第一项
        //   如果过滤后的结果为空数组，则返回0
        if (nums.length < 2) return nums[0] || 0;
        //   需要为reduce方法赋初值，是因为big.js的运算操作，是基于new Big格式的数字
        //   必须将Big对象转换为字符串类型，不然会存在精度丢失问题
        //   IEEE 754标准，最大安全整数：Number.MAX_SAFE_INTEGER，`9007199254740991`，即2的53次方减1,
        //   当js的数值超过这个最大安全整数，就会存在精度丢失问题
        return (
            nums
                .slice(1)
                .reduce((prev, num) => prev[method](num), new Big(nums[0]))
                ?.toString() || 0
        );
    };
}

// plus、minus、times、div为big.js中的计算方法，分别对应加减乘除这四个运算操作
// 浮点数求和
export const accAdd = accFactory('plus');
// 浮点数相减
export const accSub = accFactory('minus');
// 浮点数相乘
export const accMul = accFactory('times');
// 浮点数相除
export const accDiv = accFactory('div');
