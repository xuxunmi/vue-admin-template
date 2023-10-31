<template>
    <div class="parts-atlas-page h-full overflow-hidden">
        <div class="content-container" v-loading="loading">
            <div class="left-content-warp">
                <div class="left-content bg-white">
                    <el-tooltip class="item" placement="top" :content="VehicleModelTitle" :open-delay="1500">
                        <h3 class="mb-2 truncate">{{ VehicleModelTitle }}</h3>
                    </el-tooltip>

                    <el-scrollbar class="h-full" wrap-class="scrollbar-wrapper">
                        <el-tree
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
                        >
                            <span class="custom-tree-node" slot-scope="{ node }">
                                <el-tooltip class="item" :content="node.label" placement="top" :open-delay="1500">
                                    <span>{{ node.label }}</span>
                                </el-tooltip>
                                <!-- <div :title="node.label">{{ node.label }}</div> -->
                            </span>
                        </el-tree>
                    </el-scrollbar>
                </div>
                <div class="images-content bg-white">
                    <svg-tiger
                        :current-image-url="currentImageUrl"
                        @setBackSelectTableRow="handleSetBackSelectTableRow"
                        :hotspot="hotspot"
                    ></svg-tiger>
                </div>
            </div>
            <div v-dropLine class="drag-line"></div>
            <div class="right-content-warp h-full bg-white">
                <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
                    <el-tab-pane :label="$t('vehiclePartsPage.partscatalogue')" name="partsDetails">
                        <div class="parts-details-table pb-4">
                            <el-table
                                v-loading="tableLoading"
                                :element-loading-text="$t('loading.loading')"
                                element-loading-spinner="el-icon-loading"
                                element-loading-background="#fff"
                                ref="table"
                                size="mini"
                                :data="partsDetailsData"
                                border
                                style="width: 100%"
                                :max-height="tableHeight"
                                header-align="center"
                                highlight-current-row
                                @row-click="handleRowClick"
                            >
                                <el-table-column
                                    prop="sequence"
                                    :label="$t('vehiclePartsPage.sequence')"
                                    width="50"
                                    align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="partNo"
                                    :label="$t('vehiclePartsPage.partNo')"
                                    show-overflow-tooltip
                                    width="200"
                                    align="center"
                                >
                                    <template v-slot="scope">
                                        <el-link
                                            type="primary"
                                            :underline="false"
                                            @click="handlePartNoClick(scope.row)"
                                            >{{ scope.row.partNo }}</el-link
                                        >
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="partName"
                                    :label="$t('vehiclePartsPage.partName')"
                                    show-overflow-tooltip
                                    align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="qty"
                                    :label="$t('vehiclePartsPage.number')"
                                    show-overflow-tooltip
                                    width="80"
                                    align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="minQty"
                                    :label="$t('vehiclePartsPage.minQty')"
                                    show-overflow-tooltip
                                    width="95"
                                    align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="remarks"
                                    :label="$t('vehiclePartsPage.remarks')"
                                    show-overflow-tooltip
                                    align="center"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="isSupply"
                                    :label="$t('vehiclePartsPage.isSupply')"
                                    show-overflow-tooltip
                                    width="95"
                                    align="center"
                                >
                                    <template v-slot="scope">
                                        <div>{{ getSupplyName(scope.row) }}</div>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('vehiclePartsPage.order')" width="55" align="center">
                                    <template v-slot="scope">
                                        <i
                                            style="color: #409eff; font-size: 24px"
                                            class="iconfont icon-gouwuche"
                                            @click="handleShoppingCartActionBtn(scope.row)"
                                        ></i>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('vehiclePartsPage.physicalMap')" width="70" align="center">
                                    <template v-slot="scope">
                                        <el-image
                                            v-if="scope.row.picUrl.length > 0"
                                            class="inline-block"
                                            style="width: 40px; height: 40px"
                                            :src="scope.row.picUrl[0]"
                                            :preview-src-list="scope.row.picUrl"
                                        >
                                        </el-image>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>

        <!-- 表格编码弹窗 -->
        <dialogFrame
            :title="$t('vehiclePartsPage.partsDetails')"
            :show.sync="dialogVisible.partCode"
            width="60%"
            :footer="false"
        >
            <part-detail v-if="dialogVisible.partCode" :part-code="currentRowPartCode"></part-detail>
        </dialogFrame>

        <!-- 添加到购物车弹窗 -->
        <dialogFrame :title="currentTitleName" :show.sync="dialogVisible.shoppingCart" width="60%" :footer="false">
            <shopping-add-cart
                v-if="dialogVisible.shoppingCart"
                :show.sync="dialogVisible.shoppingCart"
                :current-part-param="currentPartParam"
            ></shopping-add-cart>
        </dialogFrame>

        <!-- 系统层导览弹窗 -->
        <el-drawer
            :visible.sync="dialogVisible.layer"
            :modal="false"
            :title="$t('vehiclePartsPage.systemLayer')"
            size="46%"
            custom-class="px-5 pb-5"
            destroy-on-close
            :wrapperClosable="false"
            :direction="'btt'"
        >
            <parts-atlas-layer
                v-if="dialogVisible.layer"
                :parts-atlas-layer-list="partsAtlasLayerList"
                @change-tree="handleChangeTree"
            ></parts-atlas-layer>
        </el-drawer>
    </div>
</template>

<script>
import svgTiger from '@/components/svgTiger/index.vue';
import dialogFrame from '@/components/dialogFrame/index.vue';
import partDetail from './partDetail.vue';
import shoppingAddCart from './shoppingAddCart.vue';
import partsAtlasLayer from './partsAtlasLayer.vue';
import { getTree, getPartList } from '@/api/vehiclePartsDetails/index.js';
import { flattenTree } from '@/utils/tools.js';
import { partOrShareList } from '@/api/shoppingCart/index.js';
import { get as getStorage } from '@/utils/storage.js';

export default {
    name: 'partsAtlas',
    components: { svgTiger, dialogFrame, partDetail, shoppingAddCart, partsAtlasLayer },
    props: {
        // 系统层来的参数
        systemLayerParams: {
            type: Object,
            required: true
        },
        // 是否可供货列表
        supplyTypeList: {
            type: Array,
            default: () => []
        },
        modelType: {
            type: String
        }
    },
    data() {
        return {
            loading: false,
            tableLoading: false,
            defaultProps: {
                children: 'childrenList',
                label: 'name'
            },
            isShowTree: false,
            treeData: [], // 左侧树数据
            currentNodeKey: '', // 默认选中得树节点
            defaultExpandedKeys: [], // 默认展开树节点
            activeName: 'partsDetails',
            partsAtlasLayerList: [], // 系统导航层数据
            partsDetailsData: [], // 零件目录表格数据
            dialogVisible: {
                partCode: false, // 是否显示表格编码弹窗
                shoppingCart: false, // 是否显示购物车弹窗
                layer: false // 是否显示系统层导览抽屉弹窗
            },
            currentImageUrl: '', // 当前ipc的url
            hotspot: {}, // 表格行点击当前的序号
            currentPartParam: {}, // 表格添加购物车图标参数
            currentTitleName: undefined, // 添加购物车弹窗标题
            currentRowPartCode: undefined, // 当前行备件编码
            tableHeight: 0,
            VehicleModelTitle: '' // 当前车型标题
        };
    },
    watch: {
        systemLayerParams: {
            handler(val) {
                if (!val.currentVehicleOid) return;
                // 从消息框跳转到车型详情时，无法获取到当前车型，导致路由routeParams无法设置modelName字段，故在此获取本地localStorage的
                this.VehicleModelTitle = val.modelName || getStorage('currentVehicleModel', false)?.currentVehicleCode;
                this.getTreeList(val);
            },
            immediate: true,
            deep: true
        },
        // 因为零件目录表格接口数据返回存在延迟，故监听有了表格数据，才去高亮当前行
        partsDetailsData: {
            handler(val) {
                // 点击总成根据备件编码高亮且滚动到对应零件目录行
                if (val.length) {
                    if (this.systemLayerParams.partNo) {
                        this.setHighlightPartNoRow(this.systemLayerParams.partNo);
                    }
                }
            },
            deep: true
        }
    },
    mounted() {
        this.setTableMaxHeight();
        window.onresize = () => {
            this.setTableMaxHeight();
        };
    },
    methods: {
        setTableMaxHeight() {
            setTimeout(() => {
                this.$nextTick(() => {
                    const parentDom = document.querySelector('.parts-atlas-page');
                    let bodyH = parentDom.querySelector('.right-content-warp').clientHeight || 0;
                    let headerH = parentDom.querySelector('.el-tabs__header').clientHeight || 0;
                    let marginPadding = 10;
                    this.tableHeight = bodyH - headerH - marginPadding;
                    // console.log(this.tableHeight);
                });
            }, 100);
        },
        // 获取可供货name
        getSupplyName(row) {
            return this.supplyTypeList.find(item => item.id === row.isSupply)?.name;
        },
        // 获取树列表
        async getTreeList(val) {
            this.loading = true;
            try {
                let params = {
                    basModelOid: val.currentVehicleOid,
                    servModelDetailNo: val.servModelDetailNo
                };
                const { data } = await getTree(params);
                this.treeData = data.tree;
                // 系统导航层数据
                this.partsAtlasLayerList = data.modelDetailList;
                // 判断是否工具，如果是，取第一条数据高亮
                this.modelType === 'Tool'
                    ? this.setCheckedTreeKeys(this.treeData[0]?.oid, data.tree)
                    : this.setCheckedTreeKeys(data.oid, data.tree);
            } finally {
                this.loading = false;
            }
        },
        // 获取零件目录表格数据
        async getPartsDetailsList(ipcOid) {
            this.tableLoading = true;
            try {
                const { data } = await getPartList(ipcOid);
                this.partsDetailsData = data.map(item => {
                    return {
                        oid: item.oid,
                        ipcOid: item.ipcOid,
                        picOid: item.picOid,
                        sequence: String(item.serialNo),
                        partNo: item.partNo,
                        partName: item.partNameResult,
                        isSupply: item.ifAvailable,
                        qty: item.qty,
                        minQty: item.minQty,
                        picUrl: item.picUrl,
                        microPicUrl: item.microPicUrl,
                        remarks: item.remarks
                    };
                });
                this.tableLoading = false;
            } catch (err) {
                this.tableLoading = false;
                console.log(err);
            }
        },
        // 设置树默认展开和默认选中及高亮
        setCheckedTreeKeys(oid, treeList) {
            this.isShowTree = false;
            // 如果有高亮oid，则高亮树并获取数据
            if (oid) {
                this.$nextTick(() => {
                    // 默认展开行
                    this.defaultExpandedKeys = [oid];
                    // 默认选中当前行及高亮
                    this.currentNodeKey = oid;
                    // 查询当前高亮行ipc图片及零件目录数据
                    const [node] = this.getCurrentTreeNodeList(oid, treeList);
                    this.handleNodeClick(node);
                    this.isShowTree = true;
                });
            } else {
                // 无高亮oid，则直接显示树
                this.isShowTree = true;
            }
        },
        // 获取当前tree节点数据,去查询当前高亮行ipc图片及零件目录数据
        getCurrentTreeNodeList(oid, treeList) {
            let nodeList = flattenTree(treeList).filter(item => item.oid === oid);
            return nodeList;
        },
        // 处理svg子组件传过来的热键id
        handleSetBackSelectTableRow(hotspotId) {
            // 根据id高亮表格的行
            this.setHighlightHotspotIdRow(hotspotId);
        },
        // 根据标识号设置表格高亮行
        setHighlightHotspotIdRow(hotspotId) {
            let currentRows = this.partsDetailsData.filter(item => item.sequence === hotspotId);
            // console.log('currentRows: ', currentRows);
            if (currentRows.length) {
                this.$nextTick(() => {
                    // 高亮当前行
                    this.$refs.table.setCurrentRow(currentRows[0]);
                    let rowDoms = document.querySelectorAll('.el-table .el-table__body-wrapper .el-table__row');
                    rowDoms.forEach(dom => {
                        // 查当前行标识号(序号)
                        let cell = dom.querySelector('.cell');
                        // 判断当前行的序号是否等于svg热键
                        if (cell.innerText === hotspotId) {
                            // 滚动到热键对应的行
                            dom.scrollIntoView();
                        }
                    });
                });
            }
        },
        // 根据备件编码设置表格高亮行
        setHighlightPartNoRow(partNo) {
            let currentRows = this.partsDetailsData.filter(item => item.partNo === partNo);
            // console.log('currentRows: ', currentRows);
            if (currentRows.length) {
                this.$nextTick(() => {
                    // 高亮当前行
                    this.$refs.table.setCurrentRow(currentRows[0]);
                    let rowDoms = document.querySelectorAll('.el-table .el-table__body-wrapper .el-table__row');
                    rowDoms.forEach(dom => {
                        // 查备件编码
                        let cell = dom.querySelector('.cell .el-link--inner');
                        // console.log('cell: ', cell);
                        // 判断当前行的备件编码是否等于传进来的备件编码
                        if (cell.innerText === partNo) {
                            // 滚动到热键对应的行
                            dom.scrollIntoView();
                        }
                    });
                });
            }
        },
        // 处理表格行点击
        handleRowClick(row) {
            // 传入表格序号，其对应得是svg得热key值
            this.hotspot = { id: row.sequence };
        },
        // 处理备件编码
        handlePartNoClick(row) {
            this.currentRowPartCode = row.partNo;
            let dialogType = 'partCode';
            this.dialogVisible[dialogType] = true;
        },
        // 处理表格操作栏购物车按钮
        async handleShoppingCartActionBtn(row) {
            try {
                let { data } = await partOrShareList(row.partNo);
                if (!data.length) return;
                let isSupply = row.isSupply === '1' ? true : false;
                isSupply
                    ? (this.currentTitleName = this.$t('shoppingCartPage.shoppingCartAdd'))
                    : (this.currentTitleName = this.$t('shoppingCartPage.replacePartShoppingCartTitle'));
                this.currentPartParam = {
                    partNo: row.partNo,
                    isSupply
                };
                let dialogType = 'shoppingCart';
                this.dialogVisible[dialogType] = true;
            } catch (err) {
                this.loading = false;
                console.error(err);
            }
        },
        // 树节点点击
        handleNodeClick(data) {
            this.getPartsDetailsList(data.oid);
            this.currentImageUrl = data.picUrl ? data.picUrl : '';
            // console.log('this.currentImageUrl: ', this.currentImageUrl);
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
            this.getPartsDetailsList(value.ipcOid);
            // this.dialogVisible.layer = false;
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/css/element-scrollbar.scss';

.parts-atlas-page {
    .content-container {
        display: flex;
        height: 100%;
        max-height: calc(100vh - 170px);
        .left-content-warp {
            display: flex;
            width: 50%;
            height: 100%;
            font-size: 14px;
            .left-content {
                width: 250px;
                height: 100%;
                padding: 5px 5px 10px;
                .el-scrollbar {
                    :deep(.scrollbar-wrapper) {
                        overflow-x: hidden !important;
                        .el-tree__empty-block {
                            margin-top: 160%;
                        }
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
            .images-content {
                flex: 1;
                flex-shrink: 0;
                height: 100%;
                margin-left: 5px;
            }
        }

        .drag-line {
            width: 5px;
            height: 100%;
            background-color: #fff;
            cursor: col-resize;
            &:hover {
                background-color: #409eff;
            }
        }

        .right-content-warp {
            width: 50%;
            height: calc(100vh - 170px);
            min-width: 500px;
            margin-left: 5px;
            padding: 5px;
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
                width: 100%;
                height: 100%;
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
    }
}
:deep(.el-dialog) {
    // height: 480px;
    .el-dialog__body {
        padding: 0;
    }
}
</style>
