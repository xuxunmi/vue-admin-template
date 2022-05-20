<template>
    <div class="select-page" :class="tagsList.length === 0 ? 'mt-0' : 'mt-30'" v-loading="selectLoading">
        <el-form :inline="true" :model="selectFormData" ref="selectFormData" :rules="rules" class="select-rule-form">
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('status')"
                    >新增状态类型</el-button
                >
                <template v-if="selectFormData.statusData && selectFormData.statusData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.statusData"
                        :key="`statusData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'statusData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'statusData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('status', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('partType')"
                    >新增物料类型</el-button
                >
                <template v-if="selectFormData.partTypeData && selectFormData.partTypeData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.partTypeData"
                        :key="`partTypeData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'partTypeData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'partTypeData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('partType', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('itemType')"
                    >新增料号性质</el-button
                >
                <template v-if="selectFormData.itemTypeData && selectFormData.itemTypeData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.itemTypeData"
                        :key="`itemTypeData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'itemTypeData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'itemTypeData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('itemType', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('rawMaterial')"
                    >新增原材料</el-button
                >
                <template v-if="selectFormData.rawMaterialData && selectFormData.rawMaterialData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.rawMaterialData"
                        :key="`rawMaterialData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'rawMaterialData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'rawMaterialData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('rawMaterial', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('designType')"
                    >新增设计类型</el-button
                >
                <template v-if="selectFormData.designTypeData && selectFormData.designTypeData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.designTypeData"
                        :key="`designTypeData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'designTypeData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'designTypeData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('designType', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('modelType')"
                    >新增模型类型</el-button
                >
                <template v-if="selectFormData.modelTypeData && selectFormData.modelTypeData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.modelTypeData"
                        :key="`modelTypeData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'modelTypeData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'modelTypeData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('modelType', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('netWeightUom')"
                    >新增净重单位</el-button
                >
                <template v-if="selectFormData.netWeightUomData && selectFormData.netWeightUomData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.netWeightUomData"
                        :key="`netWeightUomData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'netWeightUomData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'netWeightUomData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('netWeightUom', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('weldNetWeightUom')"
                    >新增焊缝重量单位</el-button
                >
                <template v-if="selectFormData.weldNetWeightUomData && selectFormData.weldNetWeightUomData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.weldNetWeightUomData"
                        :key="`weldNetWeightUomData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'weldNetWeightUomData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'weldNetWeightUomData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('weldNetWeightUom', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('weldItem')"
                    >新增焊材</el-button
                >
                <template v-if="selectFormData.weldItemData && selectFormData.weldItemData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.weldItemData"
                        :key="`weldItemData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'weldItemData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'weldItemData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('weldItem', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('refItem')"
                    >新增参照物料</el-button
                >
                <template v-if="selectFormData.refItemData && selectFormData.refItemData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.refItemData"
                        :key="`refItemData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'refItemData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'refItemData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('refItem', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('PCMMaterialCo')"
                    >新增PCM材料</el-button
                >
                <template v-if="selectFormData.PCMMaterialCoData && selectFormData.PCMMaterialCoData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.PCMMaterialCoData"
                        :key="`PCMMaterialCoData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'PCMMaterialCoData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'PCMMaterialCoData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('PCMMaterialCo', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('timeUom')"
                    >新增工时单位</el-button
                >
                <template v-if="selectFormData.timeUomData && selectFormData.timeUomData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.timeUomData"
                        :key="`timeUomData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'timeUomData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'timeUomData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('timeUom', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('transportMode')"
                    >新增运输方式</el-button
                >
                <template v-if="selectFormData.transportModeData && selectFormData.transportModeData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.transportModeData"
                        :key="`transportModeData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'transportModeData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'transportModeData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('transportMode', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('shipmentMode')"
                    >新增装运方式</el-button
                >
                <template v-if="selectFormData.shipmentModeData && selectFormData.shipmentModeData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.shipmentModeData"
                        :key="`shipmentModeData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'shipmentModeData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'shipmentModeData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('shipmentMode', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('tradeMode')"
                    >新增贸易方式</el-button
                >
                <template v-if="selectFormData.tradeModeData && selectFormData.tradeModeData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.tradeModeData"
                        :key="`tradeModeData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'tradeModeData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'tradeModeData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('tradeMode', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('calcMode')"
                    >新增计算方式</el-button
                >
                <template v-if="selectFormData.calcModeData && selectFormData.calcModeData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.calcModeData"
                        :key="`calcModeData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'calcModeData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'calcModeData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('calcMode', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('createUser')"
                    >新增制单人</el-button
                >
                <template v-if="selectFormData.createUserData && selectFormData.createUserData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.createUserData"
                        :key="`createUserData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'createUserData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'createUserData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('createUser', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('createDept')"
                    >新增制单人部门</el-button
                >
                <template v-if="selectFormData.createDeptData && selectFormData.createDeptData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.createDeptData"
                        :key="`createDeptData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'createDeptData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'createDeptData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('createDept', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('updateUser')"
                    >新增修改人</el-button
                >
                <template v-if="selectFormData.updateUserData && selectFormData.updateUserData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.updateUserData"
                        :key="`updateUserData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'updateUserData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'updateUserData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('updateUser', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('parentDept')"
                    >新增上级部门</el-button
                >
                <template v-if="selectFormData.parentDeptData && selectFormData.parentDeptData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.parentDeptData"
                        :key="`parentDeptData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'parentDeptData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'parentDeptData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('parentDept', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('priceClerk')"
                    >新增价格员</el-button
                >
                <template v-if="selectFormData.priceClerkData && selectFormData.priceClerkData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.priceClerkData"
                        :key="`priceClerkData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'priceClerkData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'priceClerkData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('priceClerk', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('uomClass')"
                    >新增计量单位组</el-button
                >
                <template v-if="selectFormData.uomClassData && selectFormData.uomClassData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.uomClassData"
                        :key="`uomClassData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'uomClassData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'uomClassData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('uomClass', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('roundingType')"
                    >新增舍入类型</el-button
                >
                <template v-if="selectFormData.roundingTypeData && selectFormData.roundingTypeData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.roundingTypeData"
                        :key="`roundingTypeData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'roundingTypeData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'roundingTypeData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('roundingType', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('costType')"
                    >新增费用分类</el-button
                >
                <template v-if="selectFormData.costTypeData && selectFormData.costTypeData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.costTypeData"
                        :key="`costTypeData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'costTypeData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'costTypeData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('costType', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('costProperty')"
                    >新增费用属性</el-button
                >
                <template v-if="selectFormData.costPropertyData && selectFormData.costPropertyData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.costPropertyData"
                        :key="`costPropertyData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'costPropertyData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'costPropertyData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('costProperty', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('billStatus')"
                    >新增单据状态</el-button
                >
                <template v-if="selectFormData.billStatusData && selectFormData.billStatusData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.billStatusData"
                        :key="`billStatusData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'billStatusData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'billStatusData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('billStatus', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
            <div class="common-wrapper">
                <el-button size="mini" class="common-btn" type="primary" @click="handleAddSelect('fitModels')"
                    >新增适用产品/机型</el-button
                >
                <template v-if="selectFormData.fitModelsData && selectFormData.fitModelsData.length > 0">
                    <div
                        class="common-items"
                        v-for="(item, index) in selectFormData.fitModelsData"
                        :key="`fitModelsData${index}`"
                    >
                        <el-form-item
                            label="code："
                            :prop="'fitModelsData.' + index + '.code'"
                            :rules="rules['commonRules.code']"
                        >
                            <el-input size="mini" v-model="item.code" placeholder="请输入下拉选code"></el-input>
                        </el-form-item>
                        <el-form-item
                            label="name："
                            :prop="'fitModelsData.' + index + '.name'"
                            :rules="rules['commonRules.name']"
                        >
                            <el-input size="mini" v-model="item.name" placeholder="请输入下拉选name"></el-input>
                        </el-form-item>
                        <el-button
                            size="mini"
                            class="del-btn"
                            type="danger"
                            @click="handleDeleteSelect('fitModels', index)"
                            >删除</el-button
                        >
                    </div>
                </template>
                <div class="no-data" v-else>
                    暂无数据
                </div>
            </div>
        </el-form>
        <el-button class="common-btn" size="small" type="primary" @click="handleConfirm">保存</el-button>
    </div>
</template>

<script>
import { getSelectContent, selectContentSave } from '@/api/basicData/select.js';
export default {
    name: 'selectEdit',
    data() {
        return {
            selectLoading: false,
            selectFormData: {
                // 状态类型
                statusData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 物料类型
                partTypeData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 料号性质
                itemTypeData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 原材料
                rawMaterialData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 设计类型
                designTypeData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 模型类型
                modelTypeData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 净重单位
                netWeightUomData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 焊缝重量单位
                weldNetWeightUomData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 焊材
                weldItemData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 参照物料
                refItemData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // PCM材料列表
                PCMMaterialCoData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 工时单位列表
                timeUomData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 运输方式列表
                transportModeData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 装运方式列表
                shipmentModeData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 贸易方式列表
                tradeModeData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 计算方式列表
                calcModeData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 制单人列表
                createUserData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 制单人部门列表
                createDeptData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 修改人列表
                updateUserData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 上级部门列表
                parentDeptData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 价格员列表
                priceClerkData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 计量单位组列表
                uomClassData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 舍入类型列表
                roundingTypeData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 费用分类列表
                costTypeData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 费用属性列表
                costPropertyData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 单据状态
                billStatusData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                // 适用产品/机型
                fitModelsData: [
                    {
                        code: '',
                        name: ''
                    }
                ],
                commonRules: {
                    code: '',
                    name: ''
                }
            },
            rules: {
                'commonRules.code': [
                    {
                        required: true,
                        message: '请输入下拉选code！',
                        trigger: 'blur'
                    }
                ],
                'commonRules.name': [
                    {
                        required: true,
                        message: '请输入下拉选name！',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    computed: {
        tagsList() {
            return this.$store.state.tagsList;
        }
    },
    created() {
        this.querySelectFormData();
    },
    methods: {
        querySelectFormData() {
            this.selectLoading = true;
            getSelectContent()
                .then(res => {
                    let { code, data } = res;
                    if (code == '200') {
                        const {
                            // 状态类型
                            status: statusData,
                            // 物料类型
                            partType: partTypeData,
                            // 料号性质
                            itemType: itemTypeData,
                            // 原材料
                            rawMaterial: rawMaterialData,
                            // 设计类型
                            designType: designTypeData,
                            // 模型类型
                            modelType: modelTypeData,
                            // 净重单位
                            netWeightUom: netWeightUomData,
                            // 焊缝重量单位
                            weldNetWeightUom: weldNetWeightUomData,
                            // 焊材
                            weldItem: weldItemData,
                            // 参照物料
                            refItem: refItemData,
                            // PCM材料列表
                            PCMMaterialCo: PCMMaterialCoData,
                            // 工时单位列表
                            timeUom: timeUomData,
                            // 运输方式列表
                            transportMode: transportModeData,
                            // 装运方式列表
                            shipmentMode: shipmentModeData,
                            // 贸易方式列表
                            tradeMode: tradeModeData,
                            // 计算方式列表
                            calcMode: calcModeData,
                            // 制单人列表
                            createUser: createUserData,
                            // 制单人部门列表
                            createDept: createDeptData,
                            // 修改人列表
                            updateUser: updateUserData,
                            // 上级部门列表
                            parentDept: parentDeptData,
                            // 价格员列表
                            priceClerk: priceClerkData,
                            // 计量单位组列表
                            uomClass: uomClassData,
                            // 舍入类型列表
                            roundingType: roundingTypeData,
                            // 费用分类列表
                            costType: costTypeData,
                            // 费用属性列表
                            costProperty: costPropertyData,
                            // 单据状态
                            billStatus: billStatusData,
                            // 适用产品/机型
                            fitModels: fitModelsData
                        } = data;
                        this.selectFormData = {
                            statusData,
                            partTypeData,
                            itemTypeData,
                            rawMaterialData,
                            designTypeData,
                            modelTypeData,
                            netWeightUomData,
                            weldNetWeightUomData,
                            weldItemData,
                            refItemData,
                            PCMMaterialCoData,
                            timeUomData,
                            transportModeData,
                            shipmentModeData,
                            tradeModeData,
                            calcModeData,
                            createUserData,
                            createDeptData,
                            updateUserData,
                            parentDeptData,
                            priceClerkData,
                            uomClassData,
                            roundingTypeData,
                            costTypeData,
                            costPropertyData,
                            billStatusData,
                            fitModelsData
                        };
                        this.selectLoading = false;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 处理新增下拉选
        handleAddSelect(type) {
            switch (type) {
                case 'status':
                    this.selectFormData.statusData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'partType':
                    this.selectFormData.partTypeData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'itemType':
                    this.selectFormData.itemTypeData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'rawMaterial':
                    this.selectFormData.rawMaterialData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'designType':
                    this.selectFormData.designTypeData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'modelType':
                    this.selectFormData.modelTypeData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'netWeightUom':
                    this.selectFormData.netWeightUomData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'weldNetWeightUom':
                    this.selectFormData.weldNetWeightUomData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'weldItem':
                    this.selectFormData.weldItemData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'refItem':
                    this.selectFormData.refItemData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'PCMMaterialCo':
                    this.selectFormData.PCMMaterialCoData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'timeUom':
                    this.selectFormData.timeUomData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'transportMode':
                    this.selectFormData.transportModeData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'shipmentMode':
                    this.selectFormData.shipmentModeData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'tradeMode':
                    this.selectFormData.tradeModeData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'calcMode':
                    this.selectFormData.calcModeData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'createUser':
                    this.selectFormData.createUserData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'createDept':
                    this.selectFormData.createDeptData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'updateUser':
                    this.selectFormData.updateUserData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'parentDept':
                    this.selectFormData.parentDeptData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'priceClerk':
                    this.selectFormData.priceClerkData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'uomClass':
                    this.selectFormData.uomClassData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'roundingType':
                    this.selectFormData.roundingTypeData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'costType':
                    this.selectFormData.costTypeData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'costProperty':
                    this.selectFormData.costPropertyData.push({
                        code: '',
                        name: ''
                    });
                    break;
                case 'billStatus':
                    this.selectFormData.billStatusData.push({
                        code: '',
                        name: ''
                    });
                    break;
                default:
                    this.selectFormData.fitModelsData.push({
                        code: '',
                        name: ''
                    });
            }
        },
        // 处理删除下拉选
        handleDeleteSelect(type, index) {
            switch (type) {
                case 'status':
                    this.selectFormData.statusData.splice(index, 1);
                    break;
                case 'partType':
                    this.selectFormData.partTypeData.splice(index, 1);
                    break;
                case 'itemType':
                    this.selectFormData.itemTypeData.splice(index, 1);
                    break;
                case 'rawMaterial':
                    this.selectFormData.rawMaterialData.splice(index, 1);
                    break;
                case 'designType':
                    this.selectFormData.designTypeData.splice(index, 1);
                    break;
                case 'modelType':
                    this.selectFormData.modelTypeData.splice(index, 1);
                    break;
                case 'netWeightUom':
                    this.selectFormData.netWeightUomData.splice(index, 1);
                    break;
                case 'weldNetWeightUom':
                    this.selectFormData.weldNetWeightUomData.splice(index, 1);
                    break;
                case 'weldItem':
                    this.selectFormData.weldItemData.splice(index, 1);
                    break;
                case 'refItem':
                    this.selectFormData.refItemData.splice(index, 1);
                    break;
                case 'PCMMaterialCo':
                    this.selectFormData.PCMMaterialCoData.splice(index, 1);
                    break;
                case 'timeUom':
                    this.selectFormData.timeUomData.splice(index, 1);
                    break;
                case 'transportMode':
                    this.selectFormData.transportModeData.splice(index, 1);
                    break;
                case 'shipmentMode':
                    this.selectFormData.shipmentModeData.splice(index, 1);
                    break;
                case 'tradeMode':
                    this.selectFormData.tradeModeData.splice(index, 1);
                    break;
                case 'calcMode':
                    this.selectFormData.calcModeData.splice(index, 1);
                    break;
                case 'createUser':
                    this.selectFormData.createUserData.splice(index, 1);
                    break;
                case 'createDept':
                    this.selectFormData.createDeptData.splice(index, 1);
                    break;
                case 'updateUser':
                    this.selectFormData.updateUserData.splice(index, 1);
                    break;
                case 'parentDept':
                    this.selectFormData.parentDeptData.splice(index, 1);
                    break;
                case 'priceClerk':
                    this.selectFormData.priceClerkData.splice(index, 1);
                    break;
                case 'uomClass':
                    this.selectFormData.uomClassData.splice(index, 1);
                    break;
                case 'roundingType':
                    this.selectFormData.roundingTypeData.splice(index, 1);
                    break;
                case 'costType':
                    this.selectFormData.costTypeData.splice(index, 1);
                    break;
                case 'costProperty':
                    this.selectFormData.costPropertyData.splice(index, 1);
                    break;
                case 'billStatus':
                    this.selectFormData.billStatusData.splice(index, 1);
                    break;
                default:
                    this.selectFormData.fitModelsData.splice(index, 1);
            }
        },
        // 处理保存按钮
        handleConfirm() {
            this.$refs.selectFormData.validate(valid => {
                console.log('this.selectFormData: ', this.selectFormData);
                if (valid) {
                    const {
                        statusData: status,
                        partTypeData: partType,
                        itemTypeData: itemType,
                        rawMaterialData: rawMaterial,
                        designTypeData: designType,
                        modelTypeData: modelType,
                        netWeightUomData: netWeightUom,
                        weldNetWeightUomData: weldNetWeightUom,
                        weldItemData: weldItem,
                        refItemData: refItem,
                        PCMMaterialCoData: PCMMaterialCo,
                        timeUomData: timeUom,
                        transportModeData: transportMode,
                        shipmentModeData: shipmentMode,
                        tradeModeData: tradeMode,
                        calcModeData: calcMode,
                        createUserData: createUser,
                        createDeptData: createDept,
                        updateUserData: updateUser,
                        parentDeptData: parentDept,
                        priceClerkData: priceClerk,
                        uomClassData: uomClass,
                        roundingTypeData: roundingType,
                        costTypeData: costType,
                        costPropertyData: costProperty,
                        billStatusData: billStatus,
                        fitModelsData: fitModels
                    } = this.selectFormData;
                    const params = {
                        status,
                        partType,
                        itemType,
                        rawMaterial,
                        designType,
                        modelType,
                        netWeightUom,
                        weldNetWeightUom,
                        weldItem,
                        refItem,
                        PCMMaterialCo,
                        timeUom,
                        transportMode,
                        shipmentMode,
                        tradeMode,
                        calcMode,
                        createUser,
                        createDept,
                        updateUser,
                        parentDept,
                        priceClerk,
                        uomClass,
                        roundingType,
                        costType,
                        costProperty,
                        billStatus,
                        fitModels
                    };
                    selectContentSave(params)
                        .then(res => {
                            console.log(res);
                            let { code, message } = res;
                            if (code == '200') {
                                this.$message({
                                    message: message,
                                    type: 'success',
                                    center: true
                                });
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.mt-0 {
    margin-top: 0px !important;
}
.mt-30 {
    margin-top: 30px !important;
}
.select-page {
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    .el-form {
        .el-input {
            width: 240px;
        }
    }
    .common-wrapper {
        margin-bottom: 20px;
        .common-btn {
            margin-bottom: 10px;
        }
        .common-items {
            ::v-deep .el-form-item__label::before {
                content: '';
            }
            .del-btn {
                position: relative;
                top: 7px;
                margin-bottom: 22px;
            }
        }
        .no-data {
            line-height: 50px;
            text-align: center;
            border: 1px solid #d8d8d8;
            margin-bottom: 20px;
        }
    }
}
</style>
