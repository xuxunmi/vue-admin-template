<template>
    <div class="vehicle-home-page h-full" v-loading="loading">
        <!-- 头部搜索 -->
        <header-search @change-type-value="handleChangeTypeValue"></header-search>
        <div class="box-content h-full flex">
            <div class="box-left w-full">
                <div class="middle-box w-full">
                    <ul class="parts-list w-full">
                        <li
                            class="item"
                            v-for="item in vehicleData"
                            :key="item.oid"
                            @click="handleOpenLayerDrawer(item)"
                        >
                            <template v-if="item.imgUrl">
                                <img class="model-image" :src="item.imgUrl" alt="" />
                            </template>
                            <template v-else>
                                <img style="width:200px" src="@/assets/images/main_def.png" alt="" />
                            </template>

                            <div class="model-name truncate font-bold">{{ item.name }}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 系统层导览弹窗 -->
        <el-drawer
            :visible.sync="dialogVisible.systemLayer"
            :modal="false"
            :title="$t('vehiclePartsPage.systemLayer')"
            size="50%"
            custom-class="px-5 pb-5"
            destroy-on-close
            :wrapperClosable="false"
        >
            <system-layer :current-model-list="currentModelList" :currentVehicleOid="currentVehicleOid"></system-layer>
        </el-drawer>
    </div>
</template>

<script>
import headerSearch from '@/components/headerSearch/index.vue';
import systemLayer from './components/systemLayer.vue';
import { getMachineModelList } from '@/api/vehicleParts/index.js';
import { set as setStorage } from '@/utils/storage.js';

export default {
    name: 'vehicleHome',
    components: { headerSearch, systemLayer },
    data() {
        return {
            loading: false,
            vehicleData: [],
            currentModelList: [], // 当前选择车型得第二层数据
            currentVehicleOid: '', // 当前车型
            dialogVisible: {
                systemLayer: false // 系统层导览
            }
        };
    },
    created() {
        this.getVehicleModeList();
    },
    methods: {
        async getVehicleModeList(type) {
            this.loading = true;
            try {
                const { data } = await getMachineModelList({ type });
                this.vehicleData = data.map(item => {
                    return {
                        oid: item.oid,
                        epcOid: item.epcOid,
                        code: item.code,
                        name: item.modelName,
                        modelType: item.modelType,
                        versionStatus: item.versionStatus,
                        // 自定义拼接图片宽高
                        imgUrl: item.picUrl
                    };
                });
            } finally {
                this.loading = false;
            }
        },
        handleChangeTypeValue(type) {
            this.getVehicleModeList(type);
        },
        async handleOpenLayerDrawer(item) {
            let params = {
                type: item.modelType,
                oid: item.oid
            };
            const { data } = await getMachineModelList(params);
            if (data && data.length > 0) {
                this.currentModelList = data;
                this.currentVehicleOid = item.oid;
                // 存储车型信息，用于车型详情查询
                setStorage(
                    'currentVehicleModel',
                    { currentVehicleCode: item.code, versionStatus: item.versionStatus },
                    false
                );
                let dialogType = 'systemLayer';
                this.dialogVisible[dialogType] = true;
            } else {
                this.$router.push({ path: '/vehicleParts/details', query: { epcOid: item.epcOid } });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/element-scrollbar.scss';

$n: 4;
$width: 18%;
$gap: calc((100% - $width * $n) / $n / 2);

.vehicle-home-page {
    height: calc(100% - 60px);
    .box-content {
        padding: 5px 5px 0;
        .box-left {
            padding: 0 10px;
            background-color: #fff;
            color: #4e4c4e;
            overflow: auto;
            &::-webkit-scrollbar {
                width: 16px;
                background-color: #fff;
            }
            &::-webkit-scrollbar-track {
                background-color: #fff;
            }
            &::-webkit-scrollbar-track:hover {
                background-color: #f4f4f4;
            }
            &::-webkit-scrollbar-thumb {
                background-color: #babac0;
                border-radius: 16px;
                border: 5px solid #fff;
            }
            &::-webkit-scrollbar-thumb:hover {
                background-color: #a0a0a5;
                border: 4px solid #f4f4f4;
            }
            .header-box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 60px;
                border-bottom: 1px solid #ededed;
                font-size: 16px;
            }
            .middle-box {
                padding: 10px 0;
                .parts-list {
                    display: flex;
                    flex-wrap: wrap;
                    flex: 1 1 0;
                    .item {
                        width: $width;
                        margin: 10px $gap 20px;
                        padding: 3px;
                        text-align: center;
                        cursor: pointer;
                        border-radius: 5px;
                        &:hover {
                            box-shadow: 0px 0px 7px #888888;
                        }
                        .model-image {
                            width: 100%;
                        }
                        .model-name {
                            padding: 8px 0;
                            color: red;
                            font-size: 16px;
                        }
                    }
                }
            }
        }
    }
}
</style>
