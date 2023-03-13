<template>
    <div class="order-process-page">
        <div class="button-group">
            <!-- <el-button size="mini" type="primary" v-print="'#printTable'"> 打印 </el-button> -->
            <el-button size="mini" type="primary" @click="handleSaveBtn"> 保存 </el-button>
        </div>
        <div class="table-container" ref="printTable" id="printTable">
            <table border="1" class="table" align="center" valign="center" width="100%">
                <tr>
                    <td class="text-center" rowspan="3">
                        <img class="logo" src="@/assets/images/zt_logo.png" alt="" />
                    </td>
                    <td style="font-size: 17px" class="text-center" rowspan="3">订单工艺通知</td>
                    <td class="text-center">版本状态/Rev</td>
                    <td>
                        <el-input
                            type="textarea"
                            autosize
                            style="width: 100%"
                            v-model="orderProcessForm.vStatus"
                        ></el-input>
                    </td>
                </tr>
                <tr>
                    <td class="text-center">记录编号/Sheet No.</td>
                    <td>
                        <el-input
                            type="textarea"
                            autosize
                            style="width: 100%"
                            v-model="orderProcessForm.recordNum"
                        ></el-input>
                    </td>
                </tr>
                <tr>
                    <td class="text-center">流水码/ No.</td>
                    <td>
                        <el-input
                            type="textarea"
                            autosize
                            style="width: 100%"
                            v-model="orderProcessForm.wfNum"
                        ></el-input>
                    </td>
                </tr>
            </table>
            <table class="table" align="center" valign="center">
                <tr>
                    <td class="column1 text-center" colspan="2">编制</td>
                    <td class="value" colspan="2">
                        <el-input
                            type="textarea"
                            autosize
                            style="width: 100%"
                            v-model="orderProcessForm.editUser"
                        ></el-input>
                    </td>
                    <td class="column1 text-center" colspan="2">审核</td>
                    <td class="value" colspan="2">
                        <el-input
                            type="textarea"
                            autosize
                            style="width: 100%"
                            v-model="orderProcessForm.auditUser"
                        ></el-input>
                    </td>
                    <td class="column1 text-center" colspan="2">批准</td>
                    <td class="value" colspan="2">
                        <el-input
                            type="textarea"
                            autosize
                            style="width: 100%"
                            v-model="orderProcessForm.approveUser"
                        ></el-input>
                    </td>
                </tr>
                <tr>
                    <td class="column1 column-pd text-center" colspan="2">方案评审人员</td>
                    <td class="value column-pd" colspan="5">
                        <el-input
                            type="textarea"
                            autosize
                            style="width: 100%"
                            v-model="orderProcessForm.reviewUser"
                        ></el-input>
                    </td>
                    <td class="column1 column-pd text-center" colspan="2">订单类型</td>
                    <td class="value column-pd" colspan="2">
                        <el-input
                            type="textarea"
                            autosize
                            style="width: 100%"
                            v-model="orderProcessForm.orderType"
                        ></el-input>
                    </td>
                </tr>
                <tr>
                    <td class="column1 column-pd text-center" colspan="2">公告车型</td>
                    <td class="value column-pd" colspan="2">
                        <el-input
                            type="textarea"
                            autosize
                            style="width: 100%"
                            v-model="orderProcessForm.announcementModel"
                        ></el-input>
                    </td>
                    <td class="column1 column-pd text-center" colspan="2">SAP车型号</td>
                    <td class="value column-pd" colspan="2">
                        <el-input
                            type="textarea"
                            autosize
                            style="width: 100%"
                            v-model="orderProcessForm.sapAnnouncedModel"
                        ></el-input>
                    </td>
                    <td class="column1 column-pd text-center" colspan="2">销售区域</td>
                    <td class="value column-pd" colspan="2">
                        <el-input
                            type="textarea"
                            autosize
                            style="width: 100%"
                            v-model="orderProcessForm.areaSale"
                        ></el-input>
                    </td>
                </tr>
                <tr>
                    <td class="column1 column-pd text-center" colspan="2">销售订单号</td>
                    <td class="value column-pd" colspan="2">
                        <el-input
                            type="textarea"
                            autosize
                            style="width: 100%"
                            v-model="orderProcessForm.orderNo"
                        ></el-input>
                    </td>
                    <td class="column1 column-pd text-center" colspan="2">客户名称</td>
                    <td class="value column-pd" colspan="5">
                        <el-input
                            type="textarea"
                            autosize
                            style="width: 100%"
                            v-model="orderProcessForm.customerName"
                        ></el-input>
                    </td>
                </tr>
                <tr>
                    <td class="column1 column-pd text-center" colspan="2">数 量</td>
                    <td class="value column-pd" colspan="2">
                        <el-input
                            type="textarea"
                            autosize
                            style="width: 100%"
                            v-model="orderProcessForm.areaNum"
                        ></el-input>
                    </td>
                    <td class="column1 column-pd text-center" colspan="2">整车序列号</td>
                    <td class="value column-pd" colspan="5">
                        <el-input
                            type="textarea"
                            autosize
                            style="width: 100%"
                            v-model="orderProcessForm.vehicleSerialNumber"
                        ></el-input>
                    </td>
                </tr>
                <tr>
                    <td class="column1 column-pd text-center" colspan="2">总体特征</td>
                    <td class="value column-pd" colspan="10">
                        <el-input
                            type="textarea"
                            autosize
                            v-model="orderProcessForm.zttz"
                            @focus="handleZttzEditor"
                            v-if="!orderProcessForm.zttz"
                        ></el-input>
                        <div
                            v-else
                            style="padding: 1px 4px"
                            class="word-wrap font-normal"
                            v-html="orderProcessForm.zttz"
                            @click="handleZttzEditor"
                        ></div>
                    </td>
                </tr>
                <tr>
                    <td class="column1 column-pd text-center" colspan="2">工艺流程</td>
                    <td class="value column-pd" colspan="10">
                        <el-input
                            type="textarea"
                            autosize
                            v-model="orderProcessForm.processProcess"
                            @focus="handleProcessEditor"
                            v-if="!orderProcessForm.processProcess"
                        ></el-input>
                        <div
                            v-else
                            style="padding: 1px 4px"
                            class="word-wrap font-normal"
                            v-html="orderProcessForm.processProcess"
                            @click="handleProcessEditor"
                        ></div>
                    </td>
                </tr>
                <tr>
                    <td class="column1 column-pd text-center" colspan="2">
                        特殊特性及重<br />
                        点控制项目<br />
                    </td>
                    <td style="padding: 1px" class="value column-pd" colspan="10">
                        <table
                            border="1"
                            style="width: 100%; border-collapse: collapse; border-spacing: 0"
                            align="center"
                            valign="center"
                        >
                            <tr>
                                <td style="width: 50px" class="text-center">序号</td>
                                <td style="width: 380px" class="text-center">项目名称及标准</td>
                                <td style="width: 150px" class="text-center">责任部门</td>
                            </tr>
                            <tr v-for="(column, index) in orderProcessForm.specialFeature" :key="index">
                                <td style="width: 50px" class="text-center font-normal">
                                    {{ column.lineNo }}
                                </td>
                                <td style="width: 380px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.projectName"
                                    ></el-input>
                                </td>
                                <td style="width: 150px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.department"
                                    ></el-input>
                                </td>
                            </tr>
                        </table>
                        <div class="text-center">
                            <el-button type="text" class="red-color" @click="handleSpecialFeatureAdd">
                                行数新增
                            </el-button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="column1 column-pd text-center" colspan="2">工装保障</td>
                    <td style="padding: 1px" class="value column-pd" colspan="10">
                        <table
                            border="1"
                            style="width: 100%; border-collapse: collapse; border-spacing: 0"
                            align="center"
                            valign="center"
                        >
                            <tr>
                                <td style="width: 45px" class="text-center">序号</td>
                                <td style="width: 92px" class="text-center">名称</td>
                                <td style="width: 92px" class="text-center">数量</td>
                                <td style="width: 92px" class="text-center">工装准备</td>
                                <td style="width: 92px" class="text-center">责任人</td>
                                <td style="width: 92px" class="text-center">胎具名称</td>
                            </tr>
                            <tr v-for="(column, index) in orderProcessForm.toolSupport" :key="index">
                                <td style="width: 45px" class="text-center font-normal">
                                    {{ column.lineNo }}
                                </td>
                                <td style="width: 92px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.name"
                                    ></el-input>
                                </td>
                                <td style="width: 92px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.num"
                                    ></el-input>
                                </td>
                                <td style="width: 92px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.toolPreparation"
                                    ></el-input>
                                </td>
                                <td style="width: 92px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.owner"
                                    ></el-input>
                                </td>
                                <td style="width: 92px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.mouldName"
                                    ></el-input>
                                </td>
                            </tr>
                        </table>
                        <div class="text-center">
                            <el-button type="text" class="red-color" @click="handleToolSupportAdd">
                                行数新增
                            </el-button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="column1 column3 column-pd" colspan="12">制件单元</td>
                </tr>
                <tr>
                    <td style="padding: 1px" class="value column-pd" colspan="12">
                        <table
                            border="1"
                            style="width: 100%; border-collapse: collapse; border-spacing: 0"
                            align="center"
                            valign="center"
                        >
                            <tr>
                                <td style="width: 90px" class="text-center">工序名称</td>
                                <td style="width: 90px" class="text-center">关键项目</td>
                                <td style="width: 180px" class="text-center">操作要领及控制参数</td>
                                <td style="width: 120px" class="text-center">工装/检具/工具</td>
                            </tr>
                            <tr v-for="(column, index) in orderProcessForm.zjUnit" :key="index">
                                <td style="width: 90px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.name"
                                    ></el-input>
                                </td>
                                <td style="width: 90px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.keyProject"
                                    ></el-input>
                                </td>
                                <td style="width: 180px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.controlParam"
                                    ></el-input>
                                </td>
                                <td style="width: 120px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.tool"
                                    ></el-input>
                                </td>
                            </tr>
                        </table>
                        <div class="text-center">
                            <el-button type="text" class="red-color" @click="handleZjUnitAdd"> 行数新增 </el-button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="column1 column3 column-pd" colspan="12">焊装单元</td>
                </tr>
                <tr>
                    <td style="padding: 1px" class="value column-pd" colspan="12">
                        <table
                            border="1"
                            style="width: 100%; border-collapse: collapse; border-spacing: 0"
                            align="center"
                            valign="center"
                        >
                            <tr>
                                <td style="width: 90px" class="text-center">工序名称</td>
                                <td style="width: 90px" class="text-center">关键项目</td>
                                <td style="width: 180px" class="text-center">操作要领及控制参数</td>
                                <td style="width: 120px" class="text-center">工装/检具/工具</td>
                            </tr>
                            <tr v-for="(column, index) in orderProcessForm.hjUnit" :key="index">
                                <td style="width: 90px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.name"
                                    ></el-input>
                                </td>
                                <td style="width: 90px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.keyProject"
                                    ></el-input>
                                </td>
                                <td style="width: 180px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.controlParam"
                                    ></el-input>
                                </td>
                                <td style="width: 120px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.tool"
                                    ></el-input>
                                </td>
                            </tr>
                        </table>
                        <div class="text-center">
                            <el-button type="text" class="red-color" @click="handleHjUnitAdd"> 行数新增 </el-button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="column1 column3 column-pd" colspan="12">涂装车间</td>
                </tr>
                <tr>
                    <td style="padding: 1px" class="value column-pd" colspan="12">
                        <table
                            border="1"
                            style="width: 100%; border-collapse: collapse; border-spacing: 0"
                            align="center"
                            valign="center"
                        >
                            <tr>
                                <td style="width: 90px" class="text-center">工序名称</td>
                                <td style="width: 90px" class="text-center">关键项目</td>
                                <td style="width: 180px" class="text-center">操作要领及控制参数</td>
                                <td style="width: 120px" class="text-center">图片示例</td>
                            </tr>
                            <tr v-for="(column, index) in orderProcessForm.tzWorkshop" :key="index">
                                <td style="width: 90px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.name"
                                    ></el-input>
                                </td>
                                <td style="width: 90px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.keyProject"
                                    ></el-input>
                                </td>
                                <td style="width: 170px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.controlParam"
                                    ></el-input>
                                </td>
                                <td style="width: 120px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.example"
                                        @focus="handleTzWorkshopExampleEditor(column, index)"
                                        v-if="!column.example"
                                    ></el-input>
                                    <div
                                        v-else
                                        style="padding: 1px"
                                        class="word-wrap max-width-240"
                                        v-html="column.example"
                                        @click="handleTzWorkshopExampleEditor(column, index)"
                                    ></div>
                                </td>
                            </tr>
                        </table>
                        <div class="text-center">
                            <el-button type="text" class="red-color" @click="handleTzWorkshopAdd"> 行数新增 </el-button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="column1 column3 column-pd" colspan="12">装配车间</td>
                </tr>
                <tr>
                    <td style="padding: 1px" class="value column-pd" colspan="12">
                        <table
                            border="1"
                            style="width: 100%; border-collapse: collapse; border-spacing: 0"
                            align="center"
                            valign="center"
                        >
                            <tr>
                                <td class="column1 column3 column-pd" colspan="12">底盘部分</td>
                            </tr>
                            <tr>
                                <td style="width: 90px" class="text-center">工序名称</td>
                                <td style="width: 90px" class="text-center">关键项目</td>
                                <td style="width: 180px" class="text-center">操作要领及控制参数</td>
                                <td style="width: 120px" class="text-center">图片示例</td>
                            </tr>
                            <tr v-for="(column, index) in orderProcessForm.zpChassis" :key="index">
                                <td style="width: 90px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.name"
                                    ></el-input>
                                </td>
                                <td style="width: 90px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.keyProject"
                                    ></el-input>
                                </td>
                                <td style="width: 180px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.controlParam"
                                    ></el-input>
                                </td>
                                <td style="width: 120px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.example"
                                        @focus="handleZpChassisExampleEditor(column, index)"
                                        v-if="!column.example"
                                    ></el-input>
                                    <div
                                        v-else
                                        style="padding: 1px"
                                        class="word-wrap max-width-240"
                                        v-html="column.example"
                                        @click="handleZpChassisExampleEditor(column, index)"
                                    ></div>
                                </td>
                            </tr>
                        </table>
                        <div class="text-center">
                            <el-button type="text" class="red-color" @click="handleZpChassisAdd"> 行数新增 </el-button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 1px" class="value column-pd" colspan="12">
                        <table
                            border="1"
                            style="width: 100%; border-collapse: collapse; border-spacing: 0"
                            align="center"
                            valign="center"
                        >
                            <tr>
                                <td class="column1 column3 column-pd" colspan="12">电气部分</td>
                            </tr>
                            <tr>
                                <td style="width: 90px" class="text-center">工序名称</td>
                                <td style="width: 90px" class="text-center">关键项目</td>
                                <td style="width: 180px" class="text-center">操作要领及控制参数</td>
                                <td style="width: 120px" class="text-center">图片示例</td>
                            </tr>
                            <tr v-for="(column, index) in orderProcessForm.zpElectrical" :key="index">
                                <td style="width: 90px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.name"
                                    ></el-input>
                                </td>
                                <td style="width: 90px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.keyProject"
                                    ></el-input>
                                </td>
                                <td style="width: 180px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.controlParam"
                                    ></el-input>
                                </td>
                                <td style="width: 120px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.example"
                                        @focus="handleZpElectricalExampleEditor(column, index)"
                                        v-if="!column.example"
                                    ></el-input>
                                    <div
                                        v-else
                                        style="padding: 1px"
                                        class="word-wrap max-width-240"
                                        v-html="column.example"
                                        @click="handleZpElectricalExampleEditor(column, index)"
                                    ></div>
                                </td>
                            </tr>
                        </table>
                        <div class="text-center">
                            <el-button type="text" class="red-color" @click="handleZpElectricalAdd">
                                行数新增
                            </el-button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 1px" class="value column-pd" colspan="12">
                        <table
                            border="1"
                            style="width: 100%; border-collapse: collapse; border-spacing: 0"
                            align="center"
                            valign="center"
                        >
                            <tr>
                                <td class="column1 column3 column-pd" colspan="12">总装部分</td>
                            </tr>
                            <tr>
                                <td style="width: 90px" class="text-center">工序名称</td>
                                <td style="width: 90px" class="text-center">关键项目</td>
                                <td style="width: 180px" class="text-center">操作要领及控制参数</td>
                                <td style="width: 120px" class="text-center">图片示例</td>
                            </tr>
                            <tr v-for="(column, index) in orderProcessForm.zpFinalAssembly" :key="index">
                                <td style="width: 90px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.name"
                                    ></el-input>
                                </td>
                                <td style="width: 90px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.keyProject"
                                    ></el-input>
                                </td>
                                <td style="width: 180px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.controlParam"
                                    ></el-input>
                                </td>
                                <td style="width: 120px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.example"
                                        @focus="handleZpFinalAssemblyEditor(column, index)"
                                        v-if="!column.example"
                                    ></el-input>
                                    <div
                                        v-else
                                        style="padding: 1px"
                                        class="word-wrap max-width-240"
                                        v-html="column.example"
                                        @click="handleZpFinalAssemblyEditor(column, index)"
                                    ></div>
                                </td>
                            </tr>
                        </table>
                        <div class="text-center">
                            <el-button type="text" class="red-color" @click="handleZpFinalAssemblyAdd">
                                行数新增
                            </el-button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="column1 column3 column-pd" colspan="12">试交车间</td>
                </tr>
                <tr>
                    <td style="padding: 1px" class="value column-pd" colspan="12">
                        <table
                            border="1"
                            style="width: 100%; border-collapse: collapse; border-spacing: 0"
                            align="center"
                            valign="center"
                        >
                            <tr>
                                <td style="width: 90px" class="text-center">工序名称</td>
                                <td style="width: 90px" class="text-center">关键项目</td>
                                <td style="width: 180px" class="text-center">操作要领及控制参数</td>
                                <td style="width: 120px" class="text-center">图片示例</td>
                            </tr>
                            <tr v-for="(column, index) in orderProcessForm.sjWorkshop" :key="index">
                                <td style="width: 90px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.name"
                                    ></el-input>
                                </td>
                                <td style="width: 90px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.keyProject"
                                    ></el-input>
                                </td>
                                <td style="width: 180px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.controlParam"
                                    ></el-input>
                                </td>
                                <td style="width: 120px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.example"
                                        @focus="handleSjWorkshopEditor(column, index)"
                                        v-if="!column.example"
                                    ></el-input>
                                    <div
                                        v-else
                                        style="padding: 1px"
                                        class="word-wrap max-width-240"
                                        v-html="column.example"
                                        @click="handleSjWorkshopEditor(column, index)"
                                    ></div>
                                </td>
                            </tr>
                        </table>
                        <div class="text-center">
                            <el-button type="text" class="red-color" @click="handleSjWorkshopAdd"> 行数新增 </el-button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="column1 column-pd" colspan="12">变更</td>
                </tr>
                <tr>
                    <td class="column1 column-pd text-center" colspan="2">变更</td>
                    <td style="padding: 1px" class="value column-pd" colspan="10">
                        <table
                            border="1"
                            style="width: 100%; border-collapse: collapse; border-spacing: 0"
                            align="center"
                            valign="center"
                        >
                            <tr>
                                <td style="width: 45px" class="text-center">序号</td>
                                <td style="width: 90px" class="text-center">工序名称</td>
                                <td style="width: 90px" class="text-center">关键项目</td>
                                <td style="width: 200px" class="text-center">操作要领及控制参数</td>
                            </tr>
                            <tr v-for="(column, index) in orderProcessForm.changeDetail" :key="index">
                                <td style="width: 45px" class="text-center font-normal">
                                    {{ column.lineNo }}
                                </td>
                                <td style="width: 90px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.name"
                                    ></el-input>
                                </td>
                                <td style="width: 90px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.keyProject"
                                    ></el-input>
                                </td>
                                <td style="width: 200px" class="font-normal">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        style="width: 100%"
                                        v-model="column.controlParam"
                                    ></el-input>
                                </td>
                            </tr>
                        </table>
                        <div class="text-center">
                            <el-button type="text" class="red-color" @click="handleChangeDetailAdd">
                                行数新增
                            </el-button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="column1 column4 text-center" colspan="2">编制</td>
                    <td class="value" colspan="4">
                        <el-input
                            type="textarea"
                            autosize
                            style="width: 100%"
                            v-model="orderProcessForm.endEditUser"
                        ></el-input>
                    </td>
                    <td class="column1 column4 text-center" colspan="2">批准</td>
                    <td class="value" colspan="4">
                        <el-input
                            type="textarea"
                            autosize
                            style="width: 100%"
                            v-model="orderProcessForm.endApproveUser"
                        ></el-input>
                    </td>
                </tr>
            </table>
        </div>

        <!-- 总体特征富文本编辑器弹窗 -->
        <dialog-frame :title="''" :show.sync="dialogVisible.zttz" width="60%" :footer="false">
            <zttz-pupop
                v-if="dialogVisible.zttz"
                :show.sync="dialogVisible.zttz"
                :orderProcessForm="orderProcessForm"
                @zttzValue="handleZttzValue"
            ></zttz-pupop>
        </dialog-frame>
        <!-- 工艺流程富文本编辑器弹窗 -->
        <dialog-frame :title="''" :show.sync="dialogVisible.process" width="60%" :footer="false">
            <process-pupop
                v-if="dialogVisible.process"
                :show.sync="dialogVisible.process"
                :orderProcessForm="orderProcessForm"
                @processValue="handleProcessValue"
            ></process-pupop>
        </dialog-frame>
        <!-- 涂装车间图片示例富文本编辑器弹窗 -->
        <dialog-frame :title="''" :show.sync="dialogVisible.example" width="60%" :footer="false">
            <example-pupop
                v-if="dialogVisible.example"
                :show.sync="dialogVisible.example"
                :rowObj="rowObj"
                @exampleValue="handleExampleValue"
            ></example-pupop>
        </dialog-frame>
    </div>
</template>

<script>
import dialogFrame from '@/components/dialog-frame/index.vue';
import zttzPupop from '../components/zttzPupop.vue';
import processPupop from '../components/processPupop.vue';
import examplePupop from '../components/examplePupop.vue';
import { getOrderProcessInfo, saveOrderProcessInfo } from '@/api/order-process/index.js';

export default {
    name: 'orderProcess',
    components: {
        dialogFrame,
        zttzPupop,
        processPupop,
        examplePupop
    },
    data() {
        return {
            oid: undefined, // 订单工艺通知单oid
            orderProcessForm: {
                oid: undefined,
                vStatus: 'A/0', // 版本状态
                recordNum: 'ZT/MR-PD41-N000-001', // 记录编号
                wfNum: 'N000-104520-230210-01', // 流水码
                editUser: undefined, // 编制
                auditUser: undefined, // 审核
                approveUser: undefined, // 批准
                reviewUser: undefined, // 方案评审人员
                orderType: undefined, // 订单类型
                announcementModel: undefined, // 公告车型
                sapAnnouncedModel: undefined, // SAP车型号
                areaSale: undefined, // 销售区域
                orderNo: undefined, // 销售订单号
                customerName: undefined, // 客户名称
                areaNum: undefined, // 数量
                vehicleSerialNumber: undefined, // 整车序列号
                zttz: undefined, // 总体特征
                processProcess: undefined, // 工艺流程
                // 特殊特性及重点控制项目
                specialFeature: [
                    {
                        lineNo: 1, // 序号
                        projectName: undefined, // 项目名称及标准
                        department: undefined // 责任部门
                    }
                ],
                // 工装保障
                toolSupport: [
                    {
                        lineNo: 1, // 序号
                        name: undefined, // 名称
                        num: undefined, // 数量
                        toolPreparation: undefined, // 工装准备
                        owner: undefined, // 责任人
                        mouldName: undefined // 胎具名称
                    }
                ],
                // 制件单元
                zjUnit: [
                    {
                        name: undefined, // 工序名称
                        keyProject: undefined, // 关键项目
                        controlParam: undefined, // 操作要领及控制参数
                        tool: undefined // 工装/检具/工具
                    }
                ],
                // 焊装单元
                hjUnit: [
                    {
                        name: undefined, // 工序名称
                        keyProject: undefined, // 关键项目
                        controlParam: undefined, // 操作要领及控制参数
                        tool: undefined // 工装/检具/工具
                    }
                ],
                // 涂装车间
                tzWorkshop: [
                    {
                        name: undefined, // 工序名称,
                        keyProject: undefined, // 关键项目
                        controlParam: undefined, // 操作要领及控制参数
                        example: undefined // 图片示例
                    }
                ],
                // 装配车间-底盘部分
                zpChassis: [
                    {
                        name: undefined, // 工序名称,
                        keyProject: undefined, // 关键项目
                        controlParam: undefined, // 操作要领及控制参数
                        example: undefined // 图片示例
                    }
                ],
                // 装配车间-电气部分
                zpElectrical: [
                    {
                        name: undefined, // 工序名称,
                        keyProject: undefined, // 关键项目
                        controlParam: undefined, // 操作要领及控制参数
                        example: undefined // 图片示例
                    }
                ],
                // 装配车间-总装部分
                zpFinalAssembly: [
                    {
                        name: undefined, // 工序名称,
                        keyProject: undefined, // 关键项目
                        controlParam: undefined, // 操作要领及控制参数
                        example: undefined // 图片示例
                    }
                ],
                // 试交车间
                sjWorkshop: [
                    {
                        name: undefined, // 工序名称,
                        keyProject: undefined, // 关键项目
                        controlParam: undefined, // 操作要领及控制参数
                        example: undefined // 图片示例
                    }
                ],
                // 变更
                changeDetail: [
                    {
                        lineNo: 1, // 序号
                        name: undefined, // 工序名称,
                        keyProject: undefined, // 关键项目
                        controlParam: undefined // 操作要领及控制参数
                    }
                ],
                endEditUser: undefined, // 编制
                endApproveUser: undefined // 批准
            },
            dialogVisible: {
                zttz: false, // 是否显示总体特征弹窗
                process: false, // 是否显示工艺流程弹窗
                example: false // 是否显示涂装车间图片示例弹窗
            },
            rowObj: {}, // 表格行数据
            rowIndex: undefined, // 表格行下表
            exampleType: undefined // 车间图片示例类型
        };
    },
    created() {
        this.oid = this.getQueryString('oid');
        console.log('this.oid: ', this.oid);
        if (this.oid) this.getOrderProcessInfo(this.oid);
    },
    methods: {
        getQueryString(name) {
            let requestString = location.search;
            let reg = new RegExp('(?:\\?|&)' + name + '=(.*?)(?:&|$)');
            if (reg.test(requestString)) {
                return decodeURIComponent(RegExp.$1);
            }
            return undefined;
        },
        // 处理打印
        handlePrintTable() {
            this.$print(this.$refs.printTable);
        },
        // 获取详情
        async getOrderProcessInfo(oid) {
            let { success, data } = await getOrderProcessInfo({ oid });
            if (success === true) {
                this.orderNoticeForm = {
                    oid: data.oid,
                    vStatus: data.vStatus,
                    recordNum: data.recordNum,
                    wfNum: data.wfNum,
                    editUser: data.editUser,
                    auditUser: data.auditUser,
                    approveUser: data.approveUser,
                    reviewUser: data.reviewUser,
                    orderType: data.orderType,
                    announcementModel: data.announcementModel,
                    sapAnnouncedModel: data.sapAnnouncedModel,
                    areaSale: data.areaSale,
                    orderNo: data.orderNo,
                    customerName: data.customerName,
                    areaNum: data.areaNum,
                    vehicleSerialNumber: data.vehicleSerialNumber,
                    zttz: data.zttz,
                    processProcess: data.processProcess,
                    specialFeature: data.specialFeature,
                    toolSupport: data.toolSupport,
                    zjUnit: data.zjUnit,
                    hjUnit: data.hjUnit,
                    tzWorkshop: data.tzWorkshop,
                    zpChassis: data.zpChassis,
                    zpElectrical: data.zpElectrical,
                    zpFinalAssembly: data.zpFinalAssembly,
                    sjWorkshop: data.sjWorkshop,
                    changeDetail: data.changeDetail,
                    endEditUser: data.endEditUser,
                    endApproveUser: data.endApproveUser
                };
            }
        },
        // 处理保存
        handleSaveBtn() {
            let params = {
                oid: this.orderProcessForm.oid,
                vStatus: this.orderProcessForm.vStatus,
                recordNum: this.orderProcessForm.recordNum,
                wfNum: this.orderProcessForm.wfNum,
                editUser: this.orderProcessForm.editUser,
                auditUser: this.orderProcessForm.auditUser,
                approveUser: this.orderProcessForm.approveUser,
                reviewUser: this.orderProcessForm.reviewUser,
                orderType: this.orderProcessForm.orderType,
                announcementModel: this.orderProcessForm.announcementModel,
                sapAnnouncedModel: this.orderProcessForm.sapAnnouncedModel,
                areaSale: this.orderProcessForm.areaSale,
                orderNo: this.orderProcessForm.orderNo,
                customerName: this.orderProcessForm.customerName,
                areaNum: this.orderProcessForm.areaNum,
                vehicleSerialNumber: this.orderProcessForm.vehicleSerialNumber,
                zttz: this.orderProcessForm.zttz,
                processProcess: this.orderProcessForm.processProcess,
                specialFeature: this.orderProcessForm.specialFeature,
                toolSupport: this.orderProcessForm.toolSupport,
                zjUnit: this.orderProcessForm.zjUnit,
                hjUnit: this.orderProcessForm.hjUnit,
                tzWorkshop: this.orderProcessForm.tzWorkshop,
                zpChassis: this.orderProcessForm.zpChassis,
                zpElectrical: this.orderProcessForm.zpElectrical,
                zpFinalAssembly: this.orderProcessForm.zpFinalAssembly,
                sjWorkshop: this.orderProcessForm.sjWorkshop,
                changeDetail: this.orderProcessForm.changeDetail,
                endEditUser: this.orderProcessForm.endEditUser,
                endApproveUser: this.orderProcessForm.endApproveUser
            };
            // for (const key in params) {
            //     console.log('key: ', key, params[key], typeof params[key]);
            //     if (params[key] === 0 || params[key] === undefined) {
            //         params[key] = null;
            //     }
            // }
            console.log('params ', params);
            saveOrderProcessInfo(params, this.oid)
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
        // 总体特征相关处理事件
        handleZttzEditor() {
            let dialogType = 'zttz';
            this.dialogVisible[dialogType] = true;
        },
        handleZttzValue(value) {
            console.log('value0: ', value);
            this.orderProcessForm = {
                ...this.orderProcessForm,
                zttz: value
            };
            this.dialogVisible.zttz = false;
        },
        // 工艺流程相关处理事件
        handleProcessEditor() {
            let dialogType = 'process';
            this.dialogVisible[dialogType] = true;
        },
        handleProcessValue(value) {
            console.log('value1: ', value);
            this.orderProcessForm = {
                ...this.orderProcessForm,
                processProcess: value
            };
            this.dialogVisible.process = false;
        },
        // 处理特殊特性及重点控制项目表格新增
        handleSpecialFeatureAdd() {
            const newRow = {
                lineNo: this.orderProcessForm.specialFeature.length + 1,
                projectName: undefined,
                department: undefined
            };
            this.orderProcessForm.specialFeature.push(newRow);
        },
        // 处理工装保障表格新增
        handleToolSupportAdd() {
            const newRow = {
                lineNo: this.orderProcessForm.toolSupport.length + 1,
                name: undefined,
                num: undefined,
                toolPreparation: undefined,
                owner: undefined,
                mouldName: undefined
            };
            this.orderProcessForm.toolSupport.push(newRow);
        },
        // 处理制件单元表格新增
        handleZjUnitAdd() {
            const newRow = {
                name: undefined,
                keyProject: undefined,
                controlParam: undefined,
                tool: undefined
            };
            this.orderProcessForm.zjUnit.push(newRow);
        },
        // 处理焊装单元表格新增
        handleHjUnitAdd() {
            const newRow = {
                name: undefined,
                keyProject: undefined,
                controlParam: undefined,
                tool: undefined
            };
            this.orderProcessForm.hjUnit.push(newRow);
        },
        // 处理涂装车间相关处理事件
        handleTzWorkshopAdd() {
            const newRow = {
                name: undefined,
                keyProject: undefined,
                controlParam: undefined,
                example: undefined
            };
            this.orderProcessForm.tzWorkshop.push(newRow);
        },
        handleTzWorkshopExampleEditor(row, index) {
            this.exampleType = 'tzWorkshop';
            this.rowObj = row;
            this.rowIndex = index;
            let dialogType = 'example';
            this.dialogVisible[dialogType] = true;
        },
        // 处理装配车间-底盘部分相关处理事件
        handleZpChassisAdd() {
            const newRow = {
                name: undefined,
                keyProject: undefined,
                controlParam: undefined,
                example: undefined
            };
            this.orderProcessForm.zpChassis.push(newRow);
        },
        handleZpChassisExampleEditor(row, index) {
            this.exampleType = 'zpChassis';
            this.rowObj = row;
            this.rowIndex = index;
            let dialogType = 'example';
            this.dialogVisible[dialogType] = true;
        },
        // 处理装配车间-电气部分相关处理事件
        handleZpElectricalAdd() {
            const newRow = {
                name: undefined,
                keyProject: undefined,
                controlParam: undefined,
                example: undefined
            };
            this.orderProcessForm.zpElectrical.push(newRow);
        },
        handleZpElectricalExampleEditor(row, index) {
            this.exampleType = 'zpElectrical';
            this.rowObj = row;
            this.rowIndex = index;
            let dialogType = 'example';
            this.dialogVisible[dialogType] = true;
        },
        // 处理装配车间-总装部分相关处理事件
        handleZpFinalAssemblyAdd() {
            const newRow = {
                name: undefined,
                keyProject: undefined,
                controlParam: undefined,
                example: undefined
            };
            this.orderProcessForm.zpFinalAssembly.push(newRow);
        },
        handleZpFinalAssemblyEditor(row, index) {
            this.exampleType = 'zpFinalAssembly';
            this.rowObj = row;
            this.rowIndex = index;
            let dialogType = 'example';
            this.dialogVisible[dialogType] = true;
        },
        // 处理试交车间相关处理事件
        handleSjWorkshopAdd() {
            const newRow = {
                name: undefined,
                keyProject: undefined,
                controlParam: undefined,
                example: undefined
            };
            this.orderProcessForm.sjWorkshop.push(newRow);
        },
        handleSjWorkshopEditor(row, index) {
            this.exampleType = 'sjWorkshop';
            this.rowObj = row;
            this.rowIndex = index;
            let dialogType = 'example';
            this.dialogVisible[dialogType] = true;
        },
        handleExampleValue(value) {
            if (this.exampleType === 'tzWorkshop') {
                let tzWorkshopdata = this.orderProcessForm.tzWorkshop;
                this.$set(tzWorkshopdata, this.rowIndex, {
                    ...tzWorkshopdata[this.rowIndex],
                    example: value
                });
            } else if (this.exampleType === 'zpChassis') {
                let zpChassisdata = this.orderProcessForm.zpChassis;
                this.$set(zpChassisdata, this.rowIndex, {
                    ...zpChassisdata[this.rowIndex],
                    example: value
                });
            } else if (this.exampleType === 'zpElectrical') {
                let zpElectricaldata = this.orderProcessForm.zpElectrical;
                this.$set(zpElectricaldata, this.rowIndex, {
                    ...zpElectricaldata[this.rowIndex],
                    example: value
                });
            } else if (this.exampleType === 'zpFinalAssembly') {
                let zpFinalAssemblydata = this.orderProcessForm.zpFinalAssembly;
                this.$set(zpFinalAssemblydata, this.rowIndex, {
                    ...zpFinalAssemblydata[this.rowIndex],
                    example: value
                });
            } else if (this.exampleType === 'sjWorkshop') {
                let sjWorkshopdata = this.orderProcessForm.sjWorkshop;
                this.$set(sjWorkshopdata, this.rowIndex, {
                    ...sjWorkshopdata[this.rowIndex],
                    example: value
                });
            }
            this.dialogVisible.example = false;
        },
        // 处理变更表格新增
        handleChangeDetailAdd() {
            const newRow = {
                lineNo: this.orderProcessForm.changeDetail.length + 1,
                name: undefined,
                keyProject: undefined,
                controlParam: undefined
            };
            this.orderProcessForm.changeDetail.push(newRow);
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
.text-center {
    text-align: center;
    vertical-align: middle;
}
.font-normal {
    font-weight: normal !important;
}
.red-color {
    color: #f00;
}
.order-process-page {
    width: 700px;
    height: 100%;
    margin: 50px auto;
}
.button-group {
    text-align: right;
}
.table-container .logo {
    width: 160px;
    height: 36px;
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
    font-size: 14px;
    color: #333;
    font-weight: bold;
}

table :deep(.el-textarea__inner) {
    height: auto;
    padding: 1px 4px !important;
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
    background-color: #bdd6ee;
}
.column2 {
    border: 1px solid black;
    background-color: #b6dde8;
}
.column3 {
    padding-left: 5px;
    background-color: #9cc2e5;
    font-size: 15px !important;
    line-height: 30px;
}
.column4 {
    background-color: #fff !important;
}
.column-pd {
    white-space: nowrap;
}
.word-wrap {
    word-break: break-word;
    white-space: pre-line;
}
.max-width-240 {
    max-width: 240px;
}
</style>


