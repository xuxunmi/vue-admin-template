<template>
    <div class="parts-atlas-page h-full">
        <div class="content-container h-full flex justify-betwee">
            <div class="left-content h-full bg-white">
                <el-button
                    size="mini"
                    type="primary"
                    class="mt-2 mb-4"
                    @click="dialogVisible.layer = true"
                    v-if="!pageType"
                    >系统层导览</el-button
                >
                <el-scrollbar wrap-class="scrollbar-wrapper">
                    <el-tree
                        v-loading="false"
                        v-if="isShowTree"
                        ref="tree"
                        :data="treeData"
                        :props="defaultProps"
                        node-key="oid"
                        accordion
                        :highlight-current="true"
                        :default-expanded-keys="defaultExpandedKeys"
                        :current-node-key="currentNodeKey"
                        @node-click="handleNodeClick"
                    ></el-tree>
                </el-scrollbar>
            </div>
            <div class="middle-content h-full bg-white">
                <svg-tiger
                    :oid="currentSvgOid"
                    @setBackSelectTableRow="handleSetBackSelectTableRow"
                    :hotspot="hotspot"
                ></svg-tiger>
            </div>
            <div class="right-content h-full bg-white">
                <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
                    <el-tab-pane :label="$t('homePage.partList')" name="partsDetails">
                        <div class="parts-details-table mt-2">
                            <el-table
                                ref="table"
                                size="mini"
                                :data="partsDetailsData"
                                border
                                style="width: 100%"
                                height="765"
                                header-align="center"
                                highlight-current-row
                                @row-click="handleRowClick"
                            >
                                <el-table-column prop="sequence" label="序号" width="60"> </el-table-column>
                                <el-table-column prop="partNo" label="备件编码" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="partName" label="备件名称" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="bicycleUsage" label="单车用量" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="remarks" label="备注" show-overflow-tooltip> </el-table-column>
                                <el-table-column prop="qty" label="数量" show-overflow-tooltip> </el-table-column>
                                <el-table-column prop="minQty" label="最小起订量" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column label="订购">
                                    <template v-slot="scope">
                                        <img
                                            class="mr-2 img-action"
                                            @click="handleShoppingCartActionBtn(scope.row)"
                                            src="@/assets/images/u5216.png"
                                            alt=""
                                        />
                                    </template>
                                </el-table-column>
                                <el-table-column label="实物图">
                                    <template v-slot="scope">
                                        <el-image
                                            class="inline-block"
                                            style="width: 50px; height: 50px"
                                            :src="scope.row.microPicUrl"
                                            :preview-src-list="[scope.row.picUrl]"
                                        >
                                        </el-image>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="file-icon mr-2" v-if="pageType === 'VIN码'">
                <el-button type="text" @click="dialogVisible.traceable = true"
                    ><i class="iconfont icon-arrow-left"
                /></el-button>
            </div>
        </div>
        <!-- 添加到购物车弹窗 -->
        <dialogFrame :title="'添加购物车'" :show.sync="dialogVisible.shopCart" width="50%" :footer="false">
            <shopping-add-cart
                v-if="dialogVisible.shopCart"
                :show.sync="dialogVisible.shopCart"
                :data-source="currentCartList"
            ></shopping-add-cart>
        </dialogFrame>

        <!-- 系统层导览弹窗 -->
        <el-drawer
            :visible.sync="dialogVisible.layer"
            :modal="false"
            :title="$t('search.systemLayer')"
            size="70%"
            custom-class="px-5 pb-5"
            destroy-on-close
            :wrapperClosable="false"
        >
            <parts-atlas-layer
                v-if="dialogVisible.layer"
                :parts-atlas-layer-list="partsAtlasLayerList"
                @change-tree="handleChangeTree"
            ></parts-atlas-layer>
        </el-drawer>

        <!-- 追溯件档案弹窗 -->
        <el-drawer
            :visible.sync="dialogVisible.traceable"
            :modal="false"
            title="追溯件档案"
            size="50%"
            custom-class="px-5 pb-5"
            destroy-on-close
            :wrapperClosable="false"
        >
            <traceable-parts v-if="dialogVisible.traceable" @change-tree="handleChangeTree"></traceable-parts>
        </el-drawer>
    </div>
</template>

<script>
import svgTiger from '@/components/svgTiger/index.vue';
import dialogFrame from '@/components/dialogFrame/index.vue';
import shoppingAddCart from './shoppingAddCart.vue';
import partsAtlasLayer from './partsAtlasLayer.vue';
import traceableParts from './traceableParts.vue';
import { getTree, getPartList } from '@/api/vehiclePartsDetails/index.js';

export default {
    name: 'partsAtlas',
    components: { svgTiger, dialogFrame, shoppingAddCart, partsAtlasLayer, traceableParts },
    props: {
        // 系统层传来的id
        epcOid: {
            type: String,
            required: true
        },
        pageType: {
            type: String
        }
    },
    data() {
        return {
            loading: false,
            defaultProps: {
                children: 'childrenList',
                label: 'nameZh'
            },
            isShowTree: false,
            treeData: [],
            currentNodeKey: '', // 默认选中得树节点
            defaultExpandedKeys: [], // 默认展开树节点
            activeName: 'partsDetails',
            partsAtlasLayerList: [], // 系统导航层数据
            partsDetailsData: [], // 零件明细表格数据
            dialogVisible: {
                shopCart: false, // 是否显示购物车弹窗
                layer: false, // 是否显示系统层导览抽屉弹窗
                traceable: false // 追溯件档案抽屉
            },
            currentSvgOid: '', // 当前svg的id
            hotspot: {}, // 表格行点击当前的序号
            currentCartList: []
        };
    },
    computed: {},
    watch: {
        epcOid: {
            handler(val) {
                if (!val) return;
                this.getTreeList(val);
            },
            immediate: true
        }
    },
    mounted() {},
    methods: {
        // 获取树列表
        async getTreeList(oid) {
            this.loading = true;
            try {
                const { data } = await getTree(oid);
                this.$nextTick(() => {
                    this.treeData = data.tree;
                    // 系统导航层数据
                    this.partsAtlasLayerList = data.modelDetailList;
                    this.setCheckedTreeKeys(data.oid);
                    // 显示树组件
                    this.isShowTree = true;
                });
            } finally {
                this.loading = false;
            }
        },
        // 获取零件明细表格数据
        async getPartsDetailsList(ipcOid) {
            this.loading = true;
            try {
                const { data } = await getPartList(ipcOid);
                this.partsDetailsData = data.map(item => {
                    return {
                        oid: item.oid,
                        ipcOid: item.ipcOid,
                        picOid: item.picOid,
                        sequence: item.serialNo,
                        partNo: item.partNo,
                        partName: item.partName,
                        bicycleUsage: item.qtyPerMachine,
                        remarks: item.remarks,
                        qty: item.qty,
                        minQty: item.minQty,
                        picUrl: item.picUrl,
                        microPicUrl: item.microPicUrl
                    };
                });
            } finally {
                this.loading = false;
            }
        },
        // 设置树默认展开和默认选中及高亮
        setCheckedTreeKeys(oid) {
            // 默认展开行
            this.defaultExpandedKeys = [oid];
            // 默认选中当前行及高亮
            this.currentNodeKey = oid;
            // this.$refs.tree.setCurrentKey(this.currentNodeKey);
        },
        // 处理svg子组件传过来的热键id
        handleSetBackSelectTableRow(hotspotId) {
            // 根据id高亮表格的行
            this.setHighlightRow(hotspotId);
        },
        // 设置表格高亮行
        setHighlightRow(hotspotId) {
            let currentRows = this.partsDetailsData.filter(item => item.sequence === hotspotId);
            if (currentRows) {
                this.$nextTick(() => {
                    this.$refs.table.setCurrentRow(currentRows[0]);
                });
            }
        },
        // 处理表格行点击
        handleRowClick(row) {
            // 传入表格序号，其对应得是svg得热key值
            this.hotspot = { id: row.sequence };
        },
        // 处理表格操作栏购物车按钮
        handleShoppingCartActionBtn(row) {
            console.log(' row:', row);
            this.currentCartList = [row];
            let dialogType = 'shopCart';
            this.dialogVisible[dialogType] = true;
        },
        // 树节点点击
        handleNodeClick(data) {
            this.currentSvgOid = data.oid;
            this.getPartsDetailsList(data.ipcOid);
        },
        handleTabClick(tab) {
            this.activeName = tab.name;
        },
        // 关闭抽屉层
        handleChangeTree(value) {
            this.isShowTree = false;
            this.$nextTick(() => {
                this.setCheckedTreeKeys(value.oid);
                this.isShowTree = true;
            });
            this.currentSvgOid = value.oid;
            this.getPartsDetailsList(value.ipcOid);
            // this.dialogVisible.layer = false;
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/element-scrollbar.scss';

:deep(.el-drawer__body) {
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
}

.parts-atlas-page {
    .content-container {
        .left-content {
            width: 12%;
            padding: 5px 5px 0;
            .el-scrollbar {
                height: calc(100% - 60px); // 必须设置el-scrollbar的高度
                :deep(.scrollbar-wrapper) {
                    overflow-x: hidden !important;
                }
                :deep(.el-table .has-gutter) {
                    display: none;
                }
                /* 点击树结构项的选中颜色 */
                :deep(.el-tree--highlight-current) {
                    .is-current.el-tree-node > .el-tree-node__content {
                        background-color: #99ccff !important;
                    }
                }
            }
        }
        .middle-content {
            width: 38%;
        }
        .right-content {
            width: 50%;
        }
        .middle-content {
            margin: 0 5px;
        }
        .right-content {
            :deep(.el-tabs__header) {
                margin: 0;
            }
            :deep(.el-tabs__content) {
                height: 100%;
                padding: 0 !important;
                background-color: #fff !important;
                .el-tab-pane {
                    height: 100%;
                }
            }
            .parts-details-table {
                :deep(.el-table .el-table__header-wrapper .cell) {
                    text-align: center;
                }
                :deep(.el-table__body tr.current-row > td) {
                    background-color: #99ccff !important;
                }
                .img-action {
                    width: 22px;
                    height: 22px;
                    margin-top: 5px;
                    cursor: pointer;
                }
            }
        }
        .file-icon {
            position: fixed;
            top: 15%;
            right: 0;
            margin: 7px 5px 0 0;
            .iconfont {
                font-size: 32px;
                // color: rgb(38, 104, 178);
            }
        }
    }
}
:deep(.el-dialog) {
    // height: 480px;
    .el-dialog__body {
        padding: 0;
    }
}
</style>
