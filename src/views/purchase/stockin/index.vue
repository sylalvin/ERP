<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="单据号" prop="keyid">
        <el-input
          v-model="queryParams.keyid"
          placeholder="请输入单据号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属公司" prop="fcompanyid">
        <el-input
          v-model="queryParams.fcompanyid"
          placeholder="请输入所属公司"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="日期" prop="fdate">
        <el-input
          v-model="queryParams.fdate"
          placeholder="请输入日期"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户代码" prop="fcode">
        <el-input
          v-model="queryParams.fcode"
          placeholder="请输入客户代码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户名称" prop="fname">
        <el-input
          v-model="queryParams.fname"
          placeholder="请输入客户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户地址" prop="faddress">
        <el-input
          v-model="queryParams.faddress"
          placeholder="请输入客户地址"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电话" prop="fphone">
        <el-input
          v-model="queryParams.fphone"
          placeholder="请输入电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系人" prop="flinkman">
        <el-input
          v-model="queryParams.flinkman"
          placeholder="请输入联系人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车牌号" prop="fvehiclenum">
        <el-input
          v-model="queryParams.fvehiclenum"
          placeholder="请输入车牌号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="取货方式" prop="fdeliverymethod">
        <el-input
          v-model="queryParams.fdeliverymethod"
          placeholder="请输入取货方式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="司机" prop="fdriver">
        <el-input
          v-model="queryParams.fdriver"
          placeholder="请输入司机"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="押运员" prop="fsupercargo">
        <el-input
          v-model="queryParams.fsupercargo"
          placeholder="请输入押运员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发货人" prop="fshipper">
        <el-input
          v-model="queryParams.fshipper"
          placeholder="请输入发货人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备注" prop="fmemo">
        <el-input
          v-model="queryParams.fmemo"
          placeholder="请输入备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="标识位" prop="fflag">
        <el-input
          v-model="queryParams.fflag"
          placeholder="请输入标识位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="更新者" prop="fupdateby">
        <el-input
          v-model="queryParams.fupdateby"
          placeholder="请输入更新者"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="更新时间" prop="fupdate">
        <el-date-picker clearable size="small"
          v-model="queryParams.fupdate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择更新时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="创建者" prop="createby">
        <el-input
          v-model="queryParams.createby"
          placeholder="请输入创建者"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单据类型(1发货单/2销售退货单/3物资调拨单/4采购单/5采购退货单/6生产单/7租赁单/more see GasEnumBill)" prop="ftype">
        <el-select v-model="queryParams.ftype" placeholder="请选择单据类型(1发货单/2销售退货单/3物资调拨单/4采购单/5采购退货单/6生产单/7租赁单/more see GasEnumBill)" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="运输服务费" prop="ffreight">
        <el-input
          v-model="queryParams.ffreight"
          placeholder="请输入运输服务费"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单金额" prop="famount">
        <el-input
          v-model="queryParams.famount"
          placeholder="请输入订单金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="付款金额" prop="famt">
        <el-input
          v-model="queryParams.famt"
          placeholder="请输入付款金额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="折扣" prop="fdiscountamount">
        <el-input
          v-model="queryParams.fdiscountamount"
          placeholder="请输入折扣"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单状态" prop="fprogress">
        <el-input
          v-model="queryParams.fprogress"
          placeholder="请输入订单状态"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单状态(10已制单/50已配送/0已作废)more see GasEnumBillStauts" prop="fstatus">
        <el-select v-model="queryParams.fstatus" placeholder="请选择订单状态(10已制单/50已配送/0已作废)more see GasEnumBillStauts" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="对账单号" prop="freconciliation">
        <el-input
          v-model="queryParams.freconciliation"
          placeholder="请输入对账单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务员" prop="fsalesman">
        <el-input
          v-model="queryParams.fsalesman"
          placeholder="请输入业务员"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区域" prop="farea">
        <el-input
          v-model="queryParams.farea"
          placeholder="请输入区域"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="采购订单" prop="flogisticsnumber">
        <el-input
          v-model="queryParams.flogisticsnumber"
          placeholder="请输入采购订单"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="删除标识位" prop="fdeleteflag">
        <el-input
          v-model="queryParams.fdeleteflag"
          placeholder="请输入删除标识位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="入仓类型(其它入仓/充气入仓/客户/供应商)" prop="fcate">
        <el-input
          v-model="queryParams.fcate"
          placeholder="请输入入仓类型(其它入仓/充气入仓/客户/供应商)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行账户" prop="fsubjectcode">
        <el-input
          v-model="queryParams.fsubjectcode"
          placeholder="请输入银行账户"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="银行名称" prop="fsubjectname">
        <el-input
          v-model="queryParams.fsubjectname"
          placeholder="请输入银行名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关联单据(散瓶出库单/内部调拨单)" prop="fassociatedno">
        <el-input
          v-model="queryParams.fassociatedno"
          placeholder="请输入关联单据(散瓶出库单/内部调拨单)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="调度单" prop="fdispatchnum">
        <el-input
          v-model="queryParams.fdispatchnum"
          placeholder="请输入调度单"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收款单" prop="fsknum">
        <el-input
          v-model="queryParams.fsknum"
          placeholder="请输入收款单"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="回收分类" prop="fclass">
        <el-input
          v-model="queryParams.fclass"
          placeholder="请输入回收分类"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="仓库" prop="ft6warehouse">
        <el-input
          v-model="queryParams.ft6warehouse"
          placeholder="请输入仓库"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="销售类型" prop="ft6saletype">
        <el-select v-model="queryParams.ft6saletype" placeholder="请选择销售类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="销售类型编号" prop="ft6saletypenum">
        <el-input
          v-model="queryParams.ft6saletypenum"
          placeholder="请输入销售类型编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="采购类型" prop="ft6purchasetype">
        <el-select v-model="queryParams.ft6purchasetype" placeholder="请选择采购类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="采购类型代码" prop="ft6purchasetypenum">
        <el-input
          v-model="queryParams.ft6purchasetypenum"
          placeholder="请输入采购类型代码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收发类型" prop="ft6receivesendtype">
        <el-select v-model="queryParams.ft6receivesendtype" placeholder="请选择收发类型" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="收发类型代码" prop="ft6receivesendtypenum">
        <el-input
          v-model="queryParams.ft6receivesendtypenum"
          placeholder="请输入收发类型代码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="部门名称" prop="ft6department">
        <el-input
          v-model="queryParams.ft6department"
          placeholder="请输入部门名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="币种" prop="ft6currency">
        <el-input
          v-model="queryParams.ft6currency"
          placeholder="请输入币种"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="汇率" prop="ft6exchangerate">
        <el-input
          v-model="queryParams.ft6exchangerate"
          placeholder="请输入汇率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否同步T6" prop="ft6status">
        <el-select v-model="queryParams.ft6status" placeholder="请选择是否同步T6" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="同步时间" prop="ft6date">
        <el-input
          v-model="queryParams.ft6date"
          placeholder="请输入同步时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="作业区" prop="fdistributionpoint">
        <el-input
          v-model="queryParams.fdistributionpoint"
          placeholder="请输入作业区"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="班组" prop="fgroup">
        <el-input
          v-model="queryParams.fgroup"
          placeholder="请输入班组"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="班组" prop="ftime1">
        <el-date-picker clearable size="small"
          v-model="queryParams.ftime1"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择班组">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="班组" prop="ftime2">
        <el-date-picker clearable size="small"
          v-model="queryParams.ftime2"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择班组">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="班组" prop="ftime3">
        <el-date-picker clearable size="small"
          v-model="queryParams.ftime3"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择班组">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="班组" prop="ftime4">
        <el-date-picker clearable size="small"
          v-model="queryParams.ftime4"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择班组">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['purchase:stockin:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['purchase:stockin:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['purchase:stockin:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
		  :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['purchase:stockin:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="stockinList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="单据号" align="center" prop="keyid" />
      <el-table-column label="所属公司" align="center" prop="fcompanyid" />
      <el-table-column label="日期" align="center" prop="fdate" />
      <el-table-column label="客户代码" align="center" prop="fcode" />
      <el-table-column label="客户名称" align="center" prop="fname" />
      <el-table-column label="客户地址" align="center" prop="faddress" />
      <el-table-column label="电话" align="center" prop="fphone" />
      <el-table-column label="联系人" align="center" prop="flinkman" />
      <el-table-column label="车牌号" align="center" prop="fvehiclenum" />
      <el-table-column label="取货方式" align="center" prop="fdeliverymethod" />
      <el-table-column label="司机" align="center" prop="fdriver" />
      <el-table-column label="押运员" align="center" prop="fsupercargo" />
      <el-table-column label="发货人" align="center" prop="fshipper" />
      <el-table-column label="备注" align="center" prop="fmemo" />
      <el-table-column label="标识位" align="center" prop="fflag" />
      <el-table-column label="更新者" align="center" prop="fupdateby" />
      <el-table-column label="更新时间" align="center" prop="fupdate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.fupdate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建者" align="center" prop="createby" />
      <el-table-column label="单据类型(1发货单/2销售退货单/3物资调拨单/4采购单/5采购退货单/6生产单/7租赁单/more see GasEnumBill)" align="center" prop="ftype" />
      <el-table-column label="运输服务费" align="center" prop="ffreight" />
      <el-table-column label="订单金额" align="center" prop="famount" />
      <el-table-column label="付款金额" align="center" prop="famt" />
      <el-table-column label="折扣" align="center" prop="fdiscountamount" />
      <el-table-column label="订单状态" align="center" prop="fprogress" />
      <el-table-column label="订单状态(10已制单/50已配送/0已作废)more see GasEnumBillStauts" align="center" prop="fstatus" />
      <el-table-column label="对账单号" align="center" prop="freconciliation" />
      <el-table-column label="业务员" align="center" prop="fsalesman" />
      <el-table-column label="区域" align="center" prop="farea" />
      <el-table-column label="采购订单" align="center" prop="flogisticsnumber" />
      <el-table-column label="删除标识位" align="center" prop="fdeleteflag" />
      <el-table-column label="入仓类型(其它入仓/充气入仓/客户/供应商)" align="center" prop="fcate" />
      <el-table-column label="银行账户" align="center" prop="fsubjectcode" />
      <el-table-column label="银行名称" align="center" prop="fsubjectname" />
      <el-table-column label="关联单据(散瓶出库单/内部调拨单)" align="center" prop="fassociatedno" />
      <el-table-column label="调度单" align="center" prop="fdispatchnum" />
      <el-table-column label="收款单" align="center" prop="fsknum" />
      <el-table-column label="回收分类" align="center" prop="fclass" />
      <el-table-column label="仓库" align="center" prop="ft6warehouse" />
      <el-table-column label="销售类型" align="center" prop="ft6saletype" />
      <el-table-column label="销售类型编号" align="center" prop="ft6saletypenum" />
      <el-table-column label="采购类型" align="center" prop="ft6purchasetype" />
      <el-table-column label="采购类型代码" align="center" prop="ft6purchasetypenum" />
      <el-table-column label="收发类型" align="center" prop="ft6receivesendtype" />
      <el-table-column label="收发类型代码" align="center" prop="ft6receivesendtypenum" />
      <el-table-column label="部门名称" align="center" prop="ft6department" />
      <el-table-column label="币种" align="center" prop="ft6currency" />
      <el-table-column label="汇率" align="center" prop="ft6exchangerate" />
      <el-table-column label="是否同步T6" align="center" prop="ft6status" />
      <el-table-column label="同步时间" align="center" prop="ft6date" />
      <el-table-column label="作业区" align="center" prop="fdistributionpoint" />
      <el-table-column label="班组" align="center" prop="fgroup" />
      <el-table-column label="班组" align="center" prop="ftime1" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.ftime1, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班组" align="center" prop="ftime2" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.ftime2, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班组" align="center" prop="ftime3" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.ftime3, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班组" align="center" prop="ftime4" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.ftime4, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['purchase:stockin:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['purchase:stockin:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改入库对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="单据号" prop="keyid">
          <el-input v-model="form.keyid" placeholder="请输入单据号" />
        </el-form-item>
        <el-form-item label="所属公司" prop="fcompanyid">
          <el-input v-model="form.fcompanyid" placeholder="请输入所属公司" />
        </el-form-item>
        <el-form-item label="日期" prop="fdate">
          <el-input v-model="form.fdate" placeholder="请输入日期" />
        </el-form-item>
        <el-form-item label="客户代码" prop="fcode">
          <el-input v-model="form.fcode" placeholder="请输入客户代码" />
        </el-form-item>
        <el-form-item label="客户名称" prop="fname">
          <el-input v-model="form.fname" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="客户地址" prop="faddress">
          <el-input v-model="form.faddress" placeholder="请输入客户地址" />
        </el-form-item>
        <el-form-item label="电话" prop="fphone">
          <el-input v-model="form.fphone" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="联系人" prop="flinkman">
          <el-input v-model="form.flinkman" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="车牌号" prop="fvehiclenum">
          <el-input v-model="form.fvehiclenum" placeholder="请输入车牌号" />
        </el-form-item>
        <el-form-item label="取货方式" prop="fdeliverymethod">
          <el-input v-model="form.fdeliverymethod" placeholder="请输入取货方式" />
        </el-form-item>
        <el-form-item label="司机" prop="fdriver">
          <el-input v-model="form.fdriver" placeholder="请输入司机" />
        </el-form-item>
        <el-form-item label="押运员" prop="fsupercargo">
          <el-input v-model="form.fsupercargo" placeholder="请输入押运员" />
        </el-form-item>
        <el-form-item label="发货人" prop="fshipper">
          <el-input v-model="form.fshipper" placeholder="请输入发货人" />
        </el-form-item>
        <el-form-item label="备注" prop="fmemo">
          <el-input v-model="form.fmemo" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="标识位" prop="fflag">
          <el-input v-model="form.fflag" placeholder="请输入标识位" />
        </el-form-item>
        <el-form-item label="更新者" prop="fupdateby">
          <el-input v-model="form.fupdateby" placeholder="请输入更新者" />
        </el-form-item>
        <el-form-item label="更新时间" prop="fupdate">
          <el-date-picker clearable size="small"
            v-model="form.fupdate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择更新时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="单据类型(1发货单/2销售退货单/3物资调拨单/4采购单/5采购退货单/6生产单/7租赁单/more see GasEnumBill)" prop="ftype">
          <el-select v-model="form.ftype" placeholder="请选择单据类型(1发货单/2销售退货单/3物资调拨单/4采购单/5采购退货单/6生产单/7租赁单/more see GasEnumBill)">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="运输服务费" prop="ffreight">
          <el-input v-model="form.ffreight" placeholder="请输入运输服务费" />
        </el-form-item>
        <el-form-item label="订单金额" prop="famount">
          <el-input v-model="form.famount" placeholder="请输入订单金额" />
        </el-form-item>
        <el-form-item label="付款金额" prop="famt">
          <el-input v-model="form.famt" placeholder="请输入付款金额" />
        </el-form-item>
        <el-form-item label="折扣" prop="fdiscountamount">
          <el-input v-model="form.fdiscountamount" placeholder="请输入折扣" />
        </el-form-item>
        <el-form-item label="订单状态" prop="fprogress">
          <el-input v-model="form.fprogress" placeholder="请输入订单状态" />
        </el-form-item>
        <el-form-item label="订单状态(10已制单/50已配送/0已作废)more see GasEnumBillStauts">
          <el-radio-group v-model="form.fstatus">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="对账单号" prop="freconciliation">
          <el-input v-model="form.freconciliation" placeholder="请输入对账单号" />
        </el-form-item>
        <el-form-item label="业务员" prop="fsalesman">
          <el-input v-model="form.fsalesman" placeholder="请输入业务员" />
        </el-form-item>
        <el-form-item label="区域" prop="farea">
          <el-input v-model="form.farea" placeholder="请输入区域" />
        </el-form-item>
        <el-form-item label="采购订单" prop="flogisticsnumber">
          <el-input v-model="form.flogisticsnumber" placeholder="请输入采购订单" />
        </el-form-item>
        <el-form-item label="删除标识位" prop="fdeleteflag">
          <el-input v-model="form.fdeleteflag" placeholder="请输入删除标识位" />
        </el-form-item>
        <el-form-item label="入仓类型(其它入仓/充气入仓/客户/供应商)" prop="fcate">
          <el-input v-model="form.fcate" placeholder="请输入入仓类型(其它入仓/充气入仓/客户/供应商)" />
        </el-form-item>
        <el-form-item label="银行账户" prop="fsubjectcode">
          <el-input v-model="form.fsubjectcode" placeholder="请输入银行账户" />
        </el-form-item>
        <el-form-item label="银行名称" prop="fsubjectname">
          <el-input v-model="form.fsubjectname" placeholder="请输入银行名称" />
        </el-form-item>
        <el-form-item label="关联单据(散瓶出库单/内部调拨单)" prop="fassociatedno">
          <el-input v-model="form.fassociatedno" placeholder="请输入关联单据(散瓶出库单/内部调拨单)" />
        </el-form-item>
        <el-form-item label="调度单" prop="fdispatchnum">
          <el-input v-model="form.fdispatchnum" placeholder="请输入调度单" />
        </el-form-item>
        <el-form-item label="收款单" prop="fsknum">
          <el-input v-model="form.fsknum" placeholder="请输入收款单" />
        </el-form-item>
        <el-form-item label="回收分类" prop="fclass">
          <el-input v-model="form.fclass" placeholder="请输入回收分类" />
        </el-form-item>
        <el-form-item label="仓库" prop="ft6warehouse">
          <el-input v-model="form.ft6warehouse" placeholder="请输入仓库" />
        </el-form-item>
        <el-form-item label="销售类型" prop="ft6saletype">
          <el-select v-model="form.ft6saletype" placeholder="请选择销售类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="销售类型编号" prop="ft6saletypenum">
          <el-input v-model="form.ft6saletypenum" placeholder="请输入销售类型编号" />
        </el-form-item>
        <el-form-item label="采购类型" prop="ft6purchasetype">
          <el-select v-model="form.ft6purchasetype" placeholder="请选择采购类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="采购类型代码" prop="ft6purchasetypenum">
          <el-input v-model="form.ft6purchasetypenum" placeholder="请输入采购类型代码" />
        </el-form-item>
        <el-form-item label="收发类型" prop="ft6receivesendtype">
          <el-select v-model="form.ft6receivesendtype" placeholder="请选择收发类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="收发类型代码" prop="ft6receivesendtypenum">
          <el-input v-model="form.ft6receivesendtypenum" placeholder="请输入收发类型代码" />
        </el-form-item>
        <el-form-item label="部门名称" prop="ft6department">
          <el-input v-model="form.ft6department" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="币种" prop="ft6currency">
          <el-input v-model="form.ft6currency" placeholder="请输入币种" />
        </el-form-item>
        <el-form-item label="汇率" prop="ft6exchangerate">
          <el-input v-model="form.ft6exchangerate" placeholder="请输入汇率" />
        </el-form-item>
        <el-form-item label="是否同步T6">
          <el-radio-group v-model="form.ft6status">
            <el-radio label="1">请选择字典生成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="同步时间" prop="ft6date">
          <el-input v-model="form.ft6date" placeholder="请输入同步时间" />
        </el-form-item>
        <el-form-item label="作业区" prop="fdistributionpoint">
          <el-input v-model="form.fdistributionpoint" placeholder="请输入作业区" />
        </el-form-item>
        <el-form-item label="班组" prop="fgroup">
          <el-input v-model="form.fgroup" placeholder="请输入班组" />
        </el-form-item>
        <el-form-item label="班组" prop="ftime1">
          <el-date-picker clearable size="small"
            v-model="form.ftime1"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择班组">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="班组" prop="ftime2">
          <el-date-picker clearable size="small"
            v-model="form.ftime2"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择班组">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="班组" prop="ftime3">
          <el-date-picker clearable size="small"
            v-model="form.ftime3"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择班组">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="班组" prop="ftime4">
          <el-date-picker clearable size="small"
            v-model="form.ftime4"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择班组">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listStockin, getStockin, delStockin, addStockin, updateStockin, exportStockin } from "@/api/purchase/stockin";

export default {
  name: "Stockin",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 入库表格数据
      stockinList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        keyid: null,
        fcompanyid: null,
        fdate: null,
        fcode: null,
        fname: null,
        faddress: null,
        fphone: null,
        flinkman: null,
        fvehiclenum: null,
        fdeliverymethod: null,
        fdriver: null,
        fsupercargo: null,
        fshipper: null,
        fmemo: null,
        fflag: null,
        fupdateby: null,
        fupdate: null,
        createby: null,
        ftype: null,
        ffreight: null,
        famount: null,
        famt: null,
        fdiscountamount: null,
        fprogress: null,
        fstatus: null,
        freconciliation: null,
        fsalesman: null,
        farea: null,
        flogisticsnumber: null,
        fdeleteflag: null,
        fcate: null,
        fsubjectcode: null,
        fsubjectname: null,
        fassociatedno: null,
        fdispatchnum: null,
        fsknum: null,
        fclass: null,
        ft6warehouse: null,
        ft6saletype: null,
        ft6saletypenum: null,
        ft6purchasetype: null,
        ft6purchasetypenum: null,
        ft6receivesendtype: null,
        ft6receivesendtypenum: null,
        ft6department: null,
        ft6currency: null,
        ft6exchangerate: null,
        ft6status: null,
        ft6date: null,
        fdistributionpoint: null,
        fgroup: null,
        ftime1: null,
        ftime2: null,
        ftime3: null,
        ftime4: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        fupdate: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ],
        ftime1: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ],
        ftime2: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ],
        ftime3: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ],
        ftime4: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询入库列表 */
    getList() {
      this.loading = true;
      listStockin(this.queryParams).then(response => {
        this.stockinList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        keyid: null,
        fcompanyid: null,
        fdate: null,
        fcode: null,
        fname: null,
        faddress: null,
        fphone: null,
        flinkman: null,
        fvehiclenum: null,
        fdeliverymethod: null,
        fdriver: null,
        fsupercargo: null,
        fshipper: null,
        fmemo: null,
        fflag: null,
        fupdateby: null,
        fupdate: null,
        createby: null,
        ftype: null,
        ffreight: null,
        famount: null,
        famt: null,
        fdiscountamount: null,
        fprogress: null,
        fstatus: 0,
        freconciliation: null,
        fsalesman: null,
        farea: null,
        flogisticsnumber: null,
        fdeleteflag: null,
        fcate: null,
        fsubjectcode: null,
        fsubjectname: null,
        fassociatedno: null,
        fdispatchnum: null,
        fsknum: null,
        fclass: null,
        ft6warehouse: null,
        ft6saletype: null,
        ft6saletypenum: null,
        ft6purchasetype: null,
        ft6purchasetypenum: null,
        ft6receivesendtype: null,
        ft6receivesendtypenum: null,
        ft6department: null,
        ft6currency: null,
        ft6exchangerate: null,
        ft6status: "0",
        ft6date: null,
        fdistributionpoint: null,
        fgroup: null,
        ftime1: null,
        ftime2: null,
        ftime3: null,
        ftime4: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.keyid)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加入库";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const keyid = row.keyid || this.ids
      getStockin(keyid).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改入库";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.keyid != null) {
            updateStockin(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStockin(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const keyids = row.keyid || this.ids;
      this.$confirm('是否确认删除入库编号为"' + keyids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delStockin(keyids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有入库数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportStockin(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
