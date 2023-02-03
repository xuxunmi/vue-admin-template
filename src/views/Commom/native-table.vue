<template>
    <div class="order-inform-page">
        <div class="button-group" v-if="orderNoticeForm.isCanEdit">
            <el-button size="mini" type="primary" v-print="'#printTable'">
                打印
            </el-button>
            <el-button size="mini" type="primary" @click="handleSaveBtn">
                保存
            </el-button>
        </div>
        <div class="print-content" ref="printTable" id="printTable">
            <div class="header-wrap">
                <img class="logo" src="@/assets/images/logo.png" alt="" />
                <div class="title">订单综合技术通知单</div>
            </div>
            <table class="table" align="center" valign="center">
                <tr>
                    <td class="column1 text-center" colspan="2">日期</td>
                    <td class="value" colspan="2">{{ orderNoticeForm.date }}</td>
                    <td class="column1 text-center" colspan="2">文件编号</td>
                    <td class="value" colspan="2">{{ orderNoticeForm.no }}</td>
                    <td class="column1 text-center" colspan="2">版本</td>
                    <td class="value" colspan="2">{{ orderNoticeForm.version }}</td>
                </tr>
                <tr>
                    <td class="column1 text-center" colspan="2">编制</td>
                    <td class="value" colspan="2">{{ orderNoticeForm.authorizedStrength }}</td>
                    <td class="column1 text-center" colspan="2">审核</td>
                    <td class="value" colspan="2">{{ orderNoticeForm.verify }}</td>
                    <td class="column1 text-center" colspan="2">批准</td>
                    <td class="value" colspan="2">{{ orderNoticeForm.approve }}</td>
                </tr>
                <tr>
                    <td class="column1 column-pd text-center" colspan="2">公告车型</td>
                    <td class="value column-pd" colspan="2">{{ orderNoticeForm.announcementModel }}</td>
                    <td class="column1 column-pd text-center" colspan="2">SAP车型号</td>
                    <td class="value column-pd" colspan="2">{{ orderNoticeForm.sapModel }}</td>
                    <td class="column1 column-pd text-center" colspan="2">销售区域</td>
                    <td class="value column-pd" colspan="2">{{ orderNoticeForm.salesTerritory }}</td>
                </tr>
                <tr>
                    <td class="column1 column-pd text-center" colspan="2">销售订单号</td>
                    <td class="value column-pd" colspan="2">{{ orderNoticeForm.salesOrderNo }}</td>
                    <td class="column1 column-pd text-center" colspan="2">客户名称</td>
                    <td class="value column-pd" colspan="5">{{ orderNoticeForm.customerName }}</td>
                </tr>
                <tr>
                    <td class="column1 column-pd text-center" colspan="2">数 量</td>
                    <td class="value column-pd" colspan="2">{{ orderNoticeForm.quantity }}</td>
                    <td class="column1 column-pd text-center" colspan="2">整车序列号</td>
                    <td class="value column-pd" colspan="5">{{ orderNoticeForm.vehicleSerialNo }}</td>
                </tr>
                <tr>
                    <td class="column1 column-pd text-center" colspan="2">总体特征</td>
                    <td class="value column-pd" colspan="10">
                        <el-input
                            type="textarea"
                            autosize
                            :disabled="!orderNoticeForm.isCanEdit"
                            v-model="orderNoticeForm.overallChar"
                            @focus="handleOverallCharTEditor"
                            v-if="!orderNoticeForm.overallChar"
                        ></el-input>
                        <div v-else v-html="orderNoticeForm.overallChar" @click="handleOverallCharTEditor"></div>
                    </td>
                </tr>
                <tr>
                    <td class="column2 column-pd text-center" colspan="2">
                        验证项目
                    </td>
                    <td class="value column-pd" colspan="10">
                        <table
                            style="border-collapse: collapse; border-spacing: 0; border-width: 0;"
                            align="center"
                            valign="center"
                        >
                            <tr>
                                <td
                                    style="
                                        width: 50px;
                                        height: 20px;
                                        border: 1px solid #333;
                                        border-left: none;
                                        border-top: none;
                                    "
                                    class="text-center"
                                >
                                    序号
                                </td>
                                <td
                                    style="width: 80px; height: 20px; border: 1px solid #333; border-top: none;"
                                    class="text-center"
                                >
                                    验证项目
                                </td>
                                <td
                                    style="width: 80px; height: 20px; border: 1px solid #333; border-top: none;"
                                    class="text-center"
                                >
                                    验证内容
                                </td>
                                <td
                                    style="width: 80px; height: 20px; border: 1px solid #333; border-top: none;"
                                    class="text-center"
                                >
                                    验证工位/车间
                                </td>
                                <td
                                    style="width: 80px; height: 20px; border: 1px solid #333; border-top: none;"
                                    class="text-center"
                                >
                                    验证用时/天
                                </td>
                                <td
                                    style="width: 80px; height: 20px; border: 1px solid #333; border-top: none;"
                                    class="text-center"
                                >
                                    验证台数
                                </td>
                                <td
                                    style="width: 90px; height: 20px; border: 1px solid #333; border-top: none;"
                                    class="text-center"
                                >
                                    配合部门及要求
                                </td>
                                <td
                                    style="
                                        width: 80px;
                                        height: 20px;
                                        border: 1px solid #333;
                                        border-top: none;
                                        border-right: none;
                                    "
                                    class="text-center"
                                >
                                    备注
                                </td>
                            </tr>
                            <tr v-for="(column, index) in orderNoticeForm.validationProjectData" :key="index">
                                <td
                                    style="
                                        width: 50px;
                                        height: 20px;
                                        border: 1px solid #333;
                                        border-left: none;
                                        border-top: none;
                                    "
                                >
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.seq"
                                    ></el-input>
                                </td>
                                <td style="width: 80px; height: 20px; border: 1px solid #333; border-top: none;">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.project"
                                    ></el-input>
                                </td>
                                <td style="width: 80px; height: 20px; border: 1px solid #333; border-top: none;">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.content"
                                    ></el-input>
                                </td>
                                <td style="width: 80px; height: 20px; border: 1px solid #333; border-top: none;">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.workshop"
                                    ></el-input>
                                </td>
                                <td style="width: 80px; height: 20px; border: 1px solid #333; border-top: none;">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.day"
                                    ></el-input>
                                </td>
                                <td style="width: 80px; height: 20px; border: 1px solid #333; border-top: none;">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.tower"
                                    ></el-input>
                                </td>
                                <td style="width: 90px; height: 20px; border: 1px solid #333; border-top: none;">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.require"
                                    ></el-input>
                                </td>
                                <td
                                    style="
                                        width: 80px;
                                        height: 20px;
                                        border: 1px solid #333;
                                        border-top: none;
                                        border-right: none;
                                    "
                                >
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.note"
                                    ></el-input>
                                </td>
                            </tr>
                        </table>
                        <div class="text-center">
                            <el-button type="text" class="redColor" @click="handleValidationProjectAdd">
                                行数新增
                            </el-button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="column2 column-pd text-center" colspan="2">
                        试装项目
                    </td>
                    <td class="value column-pd" colspan="10">
                        <table
                            style="border-collapse: collapse; border-spacing: 0; border-width: 0;"
                            align="center"
                            valign="center"
                        >
                            <tr>
                                <td
                                    style="
                                        width: 50px;
                                        height: 20px;
                                        border: 1px solid #333;
                                        border-left: none;
                                        border-top: none;
                                    "
                                    class="text-center"
                                >
                                    序号
                                </td>
                                <td
                                    style="width: 80px; height: 20px; border: 1px solid #333; border-top: none;"
                                    class="text-center"
                                >
                                    试装项目
                                </td>
                                <td
                                    style="width: 80px; height: 20px; border: 1px solid #333; border-top: none;"
                                    class="text-center"
                                >
                                    试装内容
                                </td>
                                <td
                                    style="width: 80px; height: 20px; border: 1px solid #333; border-top: none;"
                                    class="text-center"
                                >
                                    试装工位/车间
                                </td>
                                <td
                                    style="width: 80px; height: 20px; border: 1px solid #333; border-top: none;"
                                    class="text-center"
                                >
                                    试装用时/天
                                </td>
                                <td
                                    style="width: 80px; height: 20px; border: 1px solid #333; border-top: none;"
                                    class="text-center"
                                >
                                    试装台数
                                </td>
                                <td
                                    style="width: 90px; height: 20px; border: 1px solid #333; border-top: none;"
                                    class="text-center"
                                >
                                    配合部门及要求
                                </td>
                                <td
                                    style="
                                        width: 80px;
                                        height: 20px;
                                        border: 1px solid #333;
                                        border-top: none;
                                        border-right: none;
                                    "
                                    class="text-center"
                                >
                                    备注
                                </td>
                            </tr>
                            <tr v-for="(column, index) in orderNoticeForm.tryProjectData" :key="index">
                                <td
                                    style="
                                        width: 50px;
                                        height: 20px;
                                        border: 1px solid #333;
                                        border-left: none;
                                        border-top: none;
                                    "
                                >
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.seq"
                                    ></el-input>
                                </td>
                                <td style="width: 80px; height: 20px; border: 1px solid #333; border-top: none;">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.project"
                                    ></el-input>
                                </td>
                                <td style="width: 80px; height: 20px; border: 1px solid #333; border-top: none;">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.content"
                                    ></el-input>
                                </td>
                                <td style="width: 80px; height: 20px; border: 1px solid #333; border-top: none;">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.workshop"
                                    ></el-input>
                                </td>
                                <td style="width: 80px; height: 20px; border: 1px solid #333; border-top: none;">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.day"
                                    ></el-input>
                                </td>
                                <td style="width: 80px; height: 20px; border: 1px solid #333; border-top: none;">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.tower"
                                    ></el-input>
                                </td>
                                <td style="width: 90px; height: 20px; border: 1px solid #333; border-top: none;">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.require"
                                    ></el-input>
                                </td>
                                <td
                                    style="
                                        width: 80px;
                                        height: 20px;
                                        border: 1px solid #333;
                                        border-top: none;
                                        border-right: none;
                                    "
                                >
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.note"
                                    ></el-input>
                                </td>
                            </tr>
                        </table>
                        <div class="text-center">
                            <el-button type="text" class="redColor" @click="handleTryProjectAdd">
                                行数新增
                            </el-button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="column2 column-pd text-center" colspan="2">
                        <div class="redColor">
                            <b>
                                随车带走、<br />
                                消耗库存、<br />
                                客户提供、<br />
                                实验用料<br />
                                PLM中未带物料，<br />
                                需在ERP中增加<br />
                            </b>
                        </div>
                    </td>
                    <td class="value column-pd" colspan="10">
                        <table
                            style="border-collapse: collapse; border-spacing: 0; border-width: 0;"
                            align="center"
                            valign="center"
                        >
                            <tr>
                                <td
                                    style="
                                        width: 90px;
                                        height: 20px;
                                        color: #f00;
                                        border: 1px solid #333;
                                        border-left: none;
                                        border-top: none;
                                    "
                                    class="redColor text-center"
                                >
                                    序号
                                </td>
                                <td
                                    style="
                                        width: 90px;
                                        height: 20px;
                                        color: #f00;
                                        border: 1px solid #333;
                                        border-top: none;
                                    "
                                    class="redColor text-center"
                                >
                                    物料编码
                                </td>
                                <td
                                    style="
                                        width: 90px;
                                        height: 20px;
                                        color: #f00;
                                        border: 1px solid #333;
                                        border-top: none;
                                    "
                                    class="redColor text-center"
                                >
                                    物料名称
                                </td>
                                <td
                                    style="
                                        width: 90px;
                                        height: 20px;
                                        color: #f00;
                                        border: 1px solid #333;
                                        border-top: none;
                                    "
                                    class="redColor text-center"
                                >
                                    单车
                                </td>
                                <td
                                    style="
                                        width: 90px;
                                        height: 20px;
                                        color: #f00;
                                        border: 1px solid #333;
                                        border-top: none;
                                    "
                                    class="redColor text-center"
                                >
                                    总计
                                </td>
                                <td
                                    style="
                                        width: 90px;
                                        height: 20px;
                                        color: #f00;
                                        border: 1px solid #333;
                                        border-top: none;
                                    "
                                    class="redColor text-center"
                                >
                                    属性
                                </td>
                                <td
                                    style="
                                        width: 90px;
                                        height: 20px;
                                        color: #f00;
                                        border: 1px solid #333;
                                        border-top: none;
                                        border-right: none;
                                    "
                                    class="redColor text-center"
                                >
                                    备注
                                </td>
                            </tr>
                            <tr v-for="(column, index) in orderNoticeForm.materialData" :key="index">
                                <td
                                    style="
                                        width: 90px;
                                        height: 20px;
                                        border: 1px solid #333;
                                        border-left: none;
                                        border-top: none;
                                    "
                                >
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.seq"
                                    ></el-input>
                                </td>
                                <td style="width: 90px; height: 20px; border: 1px solid #333; border-top: none;">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.code"
                                    ></el-input>
                                </td>
                                <td style="width: 90px; height: 20px; border: 1px solid #333; border-top: none;">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.name"
                                    ></el-input>
                                </td>
                                <td style="width: 90px; height: 20px; border: 1px solid #333; border-top: none;">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.bike"
                                    ></el-input>
                                </td>
                                <td style="width: 90px; height: 20px; border: 1px solid #333; border-top: none;">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.total"
                                    ></el-input>
                                </td>
                                <td style="width: 90px; height: 20px; border: 1px solid #333; border-top: none;">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.attribute"
                                    ></el-input>
                                </td>
                                <td
                                    style="
                                        width: 90px;
                                        height: 20px;
                                        border: 1px solid #333;
                                        border-top: none;
                                        border-right: none;
                                    "
                                >
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%;"
                                        :disabled="!orderNoticeForm.isCanEdit"
                                        v-model="column.note"
                                    ></el-input>
                                </td>
                            </tr>
                        </table>
                        <div class="text-center">
                            <el-button type="text" class="redColor" @click="handleMaterialAdd">
                                行数新增
                            </el-button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="column1 column-pd text-center" colspan="2">骨架钣金</td>
                    <td class="value column-pd" colspan="10">
                        <el-input
                            type="textarea"
                            autosize
                            :disabled="!orderNoticeForm.isCanEdit"
                            v-model="orderNoticeForm.skeletonMetal"
                            @focus="handleSkeletonMetalTEditor"
                            v-if="!orderNoticeForm.skeletonMetal"
                        ></el-input>
                        <div v-else v-html="orderNoticeForm.skeletonMetal" @click="handleSkeletonMetalTEditor"></div>
                    </td>
                </tr>
                <tr>
                    <td class="column1 column-pd text-center" colspan="2">总装部分</td>
                    <td class="value column-pd" colspan="10">
                        <el-input
                            type="textarea"
                            autosize
                            :disabled="!orderNoticeForm.isCanEdit"
                            v-model="orderNoticeForm.finalAssemblyPart"
                            @focus="handleFinalAssemblyPartTEditor"
                            v-if="!orderNoticeForm.finalAssemblyPart"
                        ></el-input>
                        <div
                            v-else
                            v-html="orderNoticeForm.finalAssemblyPart"
                            @click="handleFinalAssemblyPartTEditor"
                        ></div>
                    </td>
                </tr>
                <tr>
                    <td class="column1 column-pd text-center" colspan="2">底盘部分</td>
                    <td class="value column-pd" colspan="10">
                        <el-input
                            type="textarea"
                            autosize
                            :disabled="!orderNoticeForm.isCanEdit"
                            v-model="orderNoticeForm.chassisPart"
                            @focus="handleChassisPartTEditor"
                            v-if="!orderNoticeForm.chassisPart"
                        ></el-input>
                        <div v-else v-html="orderNoticeForm.chassisPart" @click="handleChassisPartTEditor"></div>
                    </td>
                </tr>
                <tr>
                    <td class="column1 column-pd text-center" colspan="2">电器部分</td>
                    <td class="value column-pd" colspan="10">
                        <el-input
                            type="textarea"
                            autosize
                            :disabled="!orderNoticeForm.isCanEdit"
                            v-model="orderNoticeForm.electricalParts"
                            @focus="handleElectricalPartsTEditor"
                            v-if="!orderNoticeForm.electricalParts"
                        ></el-input>
                        <div
                            v-else
                            v-html="orderNoticeForm.electricalParts"
                            @click="handleElectricalPartsTEditor"
                        ></div>
                    </td>
                </tr>
                <tr>
                    <td class="column1 column-pd text-center" colspan="2">标&nbsp;&nbsp;牌</td>
                    <td class="value column-pd" colspan="10">
                        <el-input
                            type="textarea"
                            autosize
                            :disabled="!orderNoticeForm.isCanEdit"
                            v-model="orderNoticeForm.label"
                            @focus="handleLabelTEditor"
                            v-if="!orderNoticeForm.label"
                        ></el-input>
                        <div v-else v-html="orderNoticeForm.label" @click="handleLabelTEditor"></div>
                    </td>
                </tr>
                <tr>
                    <td class="column1 column-pd text-center" colspan="2">其&nbsp;&nbsp;他</td>
                    <td class="value column-pd" colspan="10">
                        <el-input
                            type="textarea"
                            autosize
                            :disabled="!orderNoticeForm.isCanEdit"
                            v-model="orderNoticeForm.other"
                        ></el-input>
                    </td>
                </tr>
                <tr>
                    <td class="column1 column-pd text-center" colspan="2">变&nbsp;&nbsp;更</td>
                    <td class="value column-pd" colspan="10" style="padding: 3px;">
                        <template v-for="(item, index) in orderNoticeForm.alteration">
                            <el-input
                                :key="index"
                                type="textarea"
                                style="display: block; margin-bottom: 2px; border: 1px solid #000;"
                                autosize
                                :disabled="!orderNoticeForm.isCanEdit"
                                v-model="orderNoticeForm.alteration[index]"
                            ></el-input>
                        </template>
                        <div class="text-center">
                            <el-button type="text" class="redColor" @click="handleAlterationAdd">
                                行数新增
                            </el-button>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <!-- 总体特征富文本编辑器弹窗 -->
        <dialog-frame :title="''" :show.sync="dialogVisible.overallChar" width="60%" :footer="false">
            <overall-char-pupop
                v-if="dialogVisible.overallChar"
                :show.sync="dialogVisible.overallChar"
                :orderNoticeForm="orderNoticeForm"
                @overallCharValue="handleOverallCharValue"
            ></overall-char-pupop>
        </dialog-frame>
        <!-- 骨架钣金富文本编辑器弹窗 -->
        <dialog-frame :title="''" :show.sync="dialogVisible.skeletonMetal" width="60%" :footer="false">
            <skeletonMetal-pupop
                v-if="dialogVisible.skeletonMetal"
                :show.sync="dialogVisible.skeletonMetal"
                :orderNoticeForm="orderNoticeForm"
                @skeletonMetalValue="handleSkeletonMetalValue"
            ></skeletonMetal-pupop>
        </dialog-frame>
        <!-- 总装部分富文本编辑器弹窗 -->
        <dialog-frame :title="''" :show.sync="dialogVisible.finalAssemblyPart" width="60%" :footer="false">
            <final-assembly-part-pupop
                v-if="dialogVisible.finalAssemblyPart"
                :show.sync="dialogVisible.finalAssemblyPart"
                :orderNoticeForm="orderNoticeForm"
                @finalAssemblyPartValue="handleFinalAssemblyPartValue"
            ></final-assembly-part-pupop>
        </dialog-frame>
        <!-- 底盘部分富文本编辑器弹窗 -->
        <dialog-frame :title="''" :show.sync="dialogVisible.chassisPart" width="60%" :footer="false">
            <chassis-part-pupop
                v-if="dialogVisible.chassisPart"
                :show.sync="dialogVisible.chassisPart"
                :orderNoticeForm="orderNoticeForm"
                @chassisPartValue="handleChassisPartValue"
            ></chassis-part-pupop>
        </dialog-frame>
        <!-- 电器部分富文本编辑器弹窗 -->
        <dialog-frame :title="''" :show.sync="dialogVisible.electricalParts" width="60%" :footer="false">
            <electrical-parts-pupop
                v-if="dialogVisible.electricalParts"
                :show.sync="dialogVisible.electricalParts"
                :orderNoticeForm="orderNoticeForm"
                @electricalPartsValue="handleElectricalPartsValue"
            ></electrical-parts-pupop>
        </dialog-frame>
        <!-- 标牌富文本编辑器弹窗 -->
        <dialog-frame :title="''" :show.sync="dialogVisible.label" width="60%" :footer="false">
            <label-pupop
                v-if="dialogVisible.label"
                :show.sync="dialogVisible.label"
                :orderNoticeForm="orderNoticeForm"
                @labelValue="handleLabelValue"
            ></label-pupop>
        </dialog-frame>
    </div>
</template>

<script>
import dialogFrame from '@/components/dialog-frame/index.vue';
import overallCharPupop from '../components/overallCharPupop.vue';
import skeletonMetalPupop from '../components/skeletonMetalPupop.vue';
import finalAssemblyPartPupop from '../components/finalAssemblyPartPupop.vue';
import chassisPartPupop from '../components/chassisPartPupop.vue';
import electricalPartsPupop from '../components/electricalPartsPupop.vue';
import labelPupop from '../components/labelPupop.vue';
import { orderInformDetail, saveNoticeInfo } from '@/api/order-inform/index.js';
export default {
    name: 'orderInform',
    components: {
        dialogFrame,
        skeletonMetalPupop,
        finalAssemblyPartPupop,
        chassisPartPupop,
        electricalPartsPupop,
        labelPupop,
        overallCharPupop
    },
    data() {
        return {
            oid: '',
            orderNoticeForm: {
                isCanEdit: true, // 通知单是否可编辑
                oid: undefined,
                date: undefined, // 日期
                no: null, // 文件编号
                version: null, // 版本
                authorizedStrength: undefined, // 编制
                verify: undefined, // 审核
                approve: null, // 批准
                announcementModel: undefined, // 公告车型
                sapModel: undefined, // SAP车型号
                salesTerritory: undefined, // 销售区域
                salesOrderNo: undefined, // 销售订单号
                customerName: undefined, // 客户名称
                quantity: null, // 数量
                vehicleSerialNo: null, // 整车序列号
                overallChar: undefined, // 总体特征
                validationProjectData: [
                    {
                        seq: 1,
                        project: '',
                        content: '',
                        workshop: '',
                        day: '',
                        tower: '',
                        require: '',
                        note: ''
                    },
                    {
                        seq: 2,
                        project: '',
                        content: '',
                        workshop: '',
                        day: '',
                        tower: '',
                        require: '',
                        note: ''
                    }
                ],
                tryProjectData: [
                    {
                        seq: 1,
                        project: '',
                        content: '',
                        workshop: '',
                        day: '',
                        tower: '',
                        require: '',
                        note: ''
                    },
                    {
                        seq: 2,
                        project: '',
                        content: '',
                        workshop: '',
                        day: '',
                        tower: '',
                        require: '',
                        note: ''
                    }
                ],
                materialData: [
                    {
                        seq: 1,
                        code: '',
                        name: '',
                        bike: '',
                        total: '',
                        attribute: '',
                        note: ''
                    },
                    {
                        seq: 2,
                        code: '',
                        name: '',
                        bike: '',
                        total: '',
                        attribute: '',
                        note: ''
                    }
                ],
                skeletonMetal: undefined, // 骨架钣金
                finalAssemblyPart: undefined, // 总装部分
                chassisPart: undefined, // 底盘部分
                electricalParts: undefined, // 电器部分
                label: undefined, // 标牌
                other: undefined, // 其他
                alteration: [''] // 变更
            },
            dialogVisible: {
                overallChar: false, // 是否显示总体特征弹窗
                skeletonMetal: false, // 是否显示骨架钣金弹窗
                finalAssemblyPart: false, // 是否显示总装部分弹窗
                chassisPart: false, // 是否显示底盘部分弹窗
                electricalParts: false, // 是否显示电器部分弹窗
                label: false // 是否显示标牌弹窗
            }
        };
    },
    created() {
        this.oid = this.$route.query.oid;
        // console.log('this.oid: ', this.oid);
        if (this.oid) this.getorderInformDetail();
    },
    methods: {
        // 处理打印,使用 vue-print-nb 插件
        handlePrintTable() {
            this.$print(this.$refs.printTable);
        },
        // 获取详情
        async getorderInformDetail() {
            let { success, data } = await orderInformDetail(this.oid);
            if (success === true) {
                this.orderNoticeForm = {
                    oid: data.oid,
                    isCanEdit: data.isCanEdit,
                    date: data.date,
                    no: data.no,
                    version: data.version,
                    authorizedStrength: data.authorizedStrength,
                    verify: data.verify,
                    approve: data.approve,
                    announcementModel: data.announcementModel,
                    sapModel: data.sapModel,
                    salesTerritory: data.salesTerritory,
                    salesOrderNo: data.salesOrderNo,
                    customerName: data.customerName,
                    quantity: data.quantity,
                    vehicleSerialNo: data.vehicleSerialNo,
                    overallChar: data.overallChar,
                    skeletonMetal: data.skeletonMetal,
                    finalAssemblyPart: data.finalAssemblyPart,
                    chassisPart: data.chassisPart,
                    electricalParts: data.electricalParts,
                    label: data.label,
                    other: data.other,
                    alteration: data.alteration,
                    validationProjectData: data.validationProjectData,
                    tryProjectData: data.tryProjectData,
                    materialData: data.materialData
                };
            }
        },
        // 处理保存
        handleSaveBtn() {
            let params = {
                isCanEdit: this.orderNoticeForm.isCanEdit,
                date: this.orderNoticeForm.date,
                no: this.orderNoticeForm.no,
                version: this.orderNoticeForm.version,
                authorizedStrength: this.orderNoticeForm.authorizedStrength,
                verify: this.orderNoticeForm.verify,
                approve: this.orderNoticeForm.approve,
                announcementModel: this.orderNoticeForm.announcementModel,
                sapModel: this.orderNoticeForm.sapModel,
                salesTerritory: this.orderNoticeForm.salesTerritory,
                salesOrderNo: this.orderNoticeForm.salesOrderNo,
                customerName: this.orderNoticeForm.customerName,
                quantity: this.orderNoticeForm.quantity,
                vehicleSerialNo: this.orderNoticeForm.vehicleSerialNo,
                overallChar: this.orderNoticeForm.overallChar,
                skeletonMetal: this.orderNoticeForm.skeletonMetal,
                finalAssemblyPart: this.orderNoticeForm.finalAssemblyPart,
                chassisPart: this.orderNoticeForm.chassisPart,
                electricalParts: this.orderNoticeForm.electricalParts,
                label: this.orderNoticeForm.label,
                other: this.orderNoticeForm.other,
                alteration: this.orderNoticeForm.alteration,
                validationProjectData: this.orderNoticeForm.validationProjectData,
                tryProjectData: this.orderNoticeForm.tryProjectData,
                materialData: this.orderNoticeForm.materialData
            };
            // for (const key in params) {
            //     console.log('key: ', key, params[key], typeof params[key]);
            //     if (params[key] === 0 || params[key] === undefined) {
            //         params[key] = null;
            //     }
            // }
            console.log('params ', params);
            saveNoticeInfo(params, this.oid)
                .then(res => {
                    let { success, message } = res;
                    if (success === true) {
                        this.$message({
                            type: 'success',
                            message: message,
                            center: true
                        });
                        this.closePage();
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 处理验证项目表格新增
        handleValidationProjectAdd() {
            const newRow = {
                seq: '',
                project: '',
                content: '',
                workshop: '',
                day: '',
                tower: '',
                require: '',
                note: ''
            };
            this.orderNoticeForm.validationProjectData.push(newRow);
        },
        // 处理试装项目表格新增
        handleTryProjectAdd() {
            const newRow = {
                seq: '',
                project: '',
                content: '',
                workshop: '',
                day: '',
                tower: '',
                require: '',
                note: ''
            };
            this.orderNoticeForm.tryProjectData.push(newRow);
        },
        // 处理试装项目表格新增
        handleMaterialAdd() {
            const newRow = {
                seq: '',
                code: '',
                name: '',
                bike: '',
                total: '',
                attribute: '',
                note: ''
            };
            this.orderNoticeForm.materialData.push(newRow);
        },
        // 处理变更栏新增
        handleAlterationAdd() {
            this.orderNoticeForm.alteration.push('');
        },
        // 总体特征相关处理事件
        handleOverallCharTEditor() {
            let dialogType = 'overallChar';
            this.dialogVisible[dialogType] = true;
        },
        handleOverallCharValue(value) {
            console.log('value0: ', value);
            if (!value) return;
            this.orderNoticeForm = {
                ...this.orderNoticeForm,
                overallChar: value
            };
            this.dialogVisible.overallChar = false;
        },
        // 骨架钣金相关处理事件
        handleSkeletonMetalTEditor() {
            let dialogType = 'skeletonMetal';
            this.dialogVisible[dialogType] = true;
        },
        handleSkeletonMetalValue(value) {
            console.log('value1: ', value);
            if (!value) return;
            this.orderNoticeForm = {
                ...this.orderNoticeForm,
                skeletonMetal: value
            };
            this.dialogVisible.skeletonMetal = false;
        },
        // 总装部分相关处理事件
        handleFinalAssemblyPartTEditor() {
            let dialogType = 'finalAssemblyPart';
            this.dialogVisible[dialogType] = true;
        },
        handleFinalAssemblyPartValue(value) {
            console.log('value2: ', value);
            if (!value) return;
            this.orderNoticeForm = {
                ...this.orderNoticeForm,
                finalAssemblyPart: value
            };
            this.dialogVisible.finalAssemblyPart = false;
        },
        // 底盘部分相关处理事件
        handleChassisPartTEditor() {
            let dialogType = 'chassisPart';
            this.dialogVisible[dialogType] = true;
        },
        handleChassisPartValue(value) {
            console.log('value3: ', value);
            if (!value) return;
            this.orderNoticeForm = {
                ...this.orderNoticeForm,
                chassisPart: value
            };
            this.dialogVisible.chassisPart = false;
        },
        // 电器部分相关处理事件
        handleElectricalPartsTEditor() {
            let dialogType = 'electricalParts';
            this.dialogVisible[dialogType] = true;
        },
        handleElectricalPartsValue(value) {
            console.log('value4: ', value);
            if (!value) return;
            this.orderNoticeForm = {
                ...this.orderNoticeForm,
                electricalParts: value
            };
            this.dialogVisible.electricalParts = false;
        },
        // 标牌相关处理事件
        handleLabelTEditor() {
            let dialogType = 'label';
            this.dialogVisible[dialogType] = true;
        },
        handleLabelValue(value) {
            console.log('value5: ', value);
            if (!value) return;
            this.orderNoticeForm = {
                ...this.orderNoticeForm,
                label: value
            };
            this.dialogVisible.label = false;
        },
        // 关闭浏览器房钱窗口
        closePage() {
            if (navigator.userAgent.indexOf('Firefox') != -1 || navigator.userAgent.indexOf('Chrome') != -1) {
                window.location.href = 'about:blank';
                window.close();
            } else {
                window.opener = null;
                window.open('', '_self');
                window.close();
            }
        }
    }
};
</script>

<style scoped>
@media print {
    @page {
        margin-top: 0;
        margin-bottom: 0;
    }
    @page :first {
        margin-top: 1cm;
    }
}
.redColor {
    color: #f00;
    font-size: 12px;
}
.button-group {
    text-align: right;
}
.order-inform-page {
    width: 700px;
    height: 100%;
    margin: 50px auto;
}
.print-content {
    margin-top: 20px;
}
.header-wrap {
    width: 700px;
    display: flex;
    justify-content: space-between;
}
.header-wrap .logo {
    width: 260px;
    height: 50px;
}
.header-wrap .title {
    position: relative;
    width: 220px;
    height: 36px;
    color: #fff;
    background-color: #0000ff;
    text-align: center;
}
.header-wrap .title::before {
    content: '';
    position: absolute;
    top: -36px;
    left: -36px;
    width: 0;
    height: 0;
    border: 36px solid;
    border-color: #0000ff;
    border-top: 36px solid transparent;
    border-left: 36px solid transparent;
    border-right: 36px solid transparent;
}
.table {
    margin-top: 10px;
    border-collapse: collapse;
    border-spacing: 0;
    background-color: transparent;
    display: table;
    width: 100%;
    max-width: 100%;
    width: 700px;
}
.table td {
    font-size: 12px;
    color: #333;
}
.text-center {
    text-align: center;
    vertical-align: middle;
}
/* table :deep(.el-input__inner) {
    height: 30px;
    border: 0;
    white-space: pre-line;
} */
table :deep(.el-textarea__inner) {
    height: 20px !important;
    border: 0;
    resize: none;
    color: black !important;
    overflow-y: hidden;
}
.value {
    width: 60px;
    height: 30px;
    border: 1px solid #333;
    color: #f00;
}
.column1 {
    width: 40px;
    height: 30px;
    border: 1px solid black;
    background-color: #b6dde8;
}
.column2 {
    border: 1px solid black;
    background-color: #b6dde8;
}
.column-pd {
    white-space: nowrap;
}
</style>
