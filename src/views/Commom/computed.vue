<template>
    <div class="computed">
        <el-input-number size="mini" :controls="false" :min="0" placeholder="请输入" v-model="value1"></el-input-number>
    </div>
</template>

<script>
import { formatFloat } from '@/utils/tools';

export default {
    name: 'computed',
    data() {
        return {
            value1: ''
        };
    },
    methods: {
        // 计算包装尺寸体积
        computePackVolume() {
            let { packLength, packWidth, packHigh } = this.packingInfoForm;
            if (!packLength || !packWidth || !packHigh) {
                this.packingInfoForm.packVolume = undefined;
                return;
            }
            // 包装尺寸体积 = (包装尺寸长 * 包装尺寸宽 * 包装尺寸高) / 10^9
            this.packingInfoForm.packVolume = formatFloat(
                (Number(packLength) * Number(packWidth) * Number(packHigh)) / 1000000000
            );
        }
    }
};
</script>

<style lang="scss" scoped></style>
