<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="所属公司ID" prop="fcompanyid">
        <el-input
          v-model="queryParams.fcompanyid"
          placeholder="请输入所属公司ID"
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
      <el-form-item label="公司地址" prop="faddress">
        <el-input
          v-model="queryParams.faddress"
          placeholder="请输入公司地址"
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
      <el-form-item label="电话" prop="fphome">
        <el-input
          v-model="queryParams.fphome"
          placeholder="请输入电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机" prop="fmoile">
        <el-input
          v-model="queryParams.fmoile"
          placeholder="请输入手机"
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
      <el-form-item label="发票" prop="fisprint">
        <el-input
          v-model="queryParams.fisprint"
          placeholder="请输入发票"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="信用天数" prop="ftipsday">
        <el-input
          v-model="queryParams.ftipsday"
          placeholder="请输入信用天数"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
      <el-form-item label="信用额度" prop="fcredit">
        <el-input
          v-model="queryParams.fcredit"
          placeholder="请输入信用额度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="助记码" prop="fspell">
        <el-input
          v-model="queryParams.fspell"
          placeholder="请输入助记码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="启用标志位" prop="fflag">
        <el-input
          v-model="queryParams.fflag"
          placeholder="请输入启用标志位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="联系人" prop="fsalesman">
        <el-input
          v-model="queryParams.fsalesman"
          placeholder="请输入联系人"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区域" prop="fdistric">
        <el-input
          v-model="queryParams.fdistric"
          placeholder="请输入区域"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="结算方式" prop="fpaymentmethod">
        <el-input
          v-model="queryParams.fpaymentmethod"
          placeholder="请输入结算方式"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属分类，默认2077" prop="fcateid">
        <el-input
          v-model="queryParams.fcateid"
          placeholder="请输入所属分类，默认2077"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="子分类ID" prop="fsubcateid">
        <el-input
          v-model="queryParams.fsubcateid"
          placeholder="请输入子分类ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="建档日期" prop="fdate">
        <el-date-picker clearable size="small"
          v-model="queryParams.fdate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择建档日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结算主号" prop="fgroupno">
        <el-input
          v-model="queryParams.fgroupno"
          placeholder="请输入结算主号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="结算主号标识" prop="fgroupnoflag">
        <el-input
          v-model="queryParams.fgroupnoflag"
          placeholder="请输入结算主号标识"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否回扣" prop="frebateflag">
        <el-input
          v-model="queryParams.frebateflag"
          placeholder="请输入是否回扣"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="打印单价" prop="fpushflag">
        <el-input
          v-model="queryParams.fpushflag"
          placeholder="请输入打印单价"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="财务月结" prop="fmonthly">
        <el-input
          v-model="queryParams.fmonthly"
          placeholder="请输入财务月结"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="月结日期" prop="fmonthlyday">
        <el-input
          v-model="queryParams.fmonthlyday"
          placeholder="请输入月结日期"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="子类名称" prop="fsubcatename">
        <el-input
          v-model="queryParams.fsubcatename"
          placeholder="请输入子类名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="结算主号标识是则为0，否在为1" prop="flevel">
        <el-input
          v-model="queryParams.flevel"
          placeholder="请输入结算主号标识是则为0，否在为1"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="结算主号标识是则为0，否在为1" prop="fcreline">
        <el-input
          v-model="queryParams.fcreline"
          placeholder="请输入结算主号标识是则为0，否在为1"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="结算主号标识是则为0，否在为1" prop="farmoney">
        <el-input
          v-model="queryParams.farmoney"
          placeholder="请输入结算主号标识是则为0，否在为1"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="结算主号标识是则为0，否在为1" prop="ffrequency">
        <el-input
          v-model="queryParams.ffrequency"
          placeholder="请输入结算主号标识是则为0，否在为1"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="省" prop="fprovince">
        <el-input
          v-model="queryParams.fprovince"
          placeholder="请输入省"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="市" prop="fcity">
        <el-input
          v-model="queryParams.fcity"
          placeholder="请输入市"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区县" prop="fcounty">
        <el-input
          v-model="queryParams.fcounty"
          placeholder="请输入区县"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="邮政编码" prop="fzipcode">
        <el-input
          v-model="queryParams.fzipcode"
          placeholder="请输入邮政编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="省ID" prop="fprovinceid">
        <el-input
          v-model="queryParams.fprovinceid"
          placeholder="请输入省ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="市ID" prop="fcityid">
        <el-input
          v-model="queryParams.fcityid"
          placeholder="请输入市ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区县ID" prop="fcountyid">
        <el-input
          v-model="queryParams.fcountyid"
          placeholder="请输入区县ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区县ID" prop="fcreditdays">
        <el-input
          v-model="queryParams.fcreditdays"
          placeholder="请输入区县ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区县ID" prop="fcreditvalue">
        <el-input
          v-model="queryParams.fcreditvalue"
          placeholder="请输入区县ID"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否通过" prop="fcreditflag">
        <el-input
          v-model="queryParams.fcreditflag"
          placeholder="请输入是否通过"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="地图坐标" prop="fcoordinate">
        <el-input
          v-model="queryParams.fcoordinate"
          placeholder="请输入地图坐标"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['basic:customer:add']"
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
          v-hasPermi="['basic:customer:edit']"
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
          v-hasPermi="['basic:customer:remove']"
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
          v-hasPermi="['basic:customer:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="customerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="客户代码" align="center" prop="fcode" />
      <el-table-column label="所属公司ID" align="center" prop="fcompanyid" />
      <el-table-column label="客户名称" align="center" prop="fname" />
      <el-table-column label="公司地址" align="center" prop="faddress" />
      <el-table-column label="联系人" align="center" prop="flinkman" />
      <el-table-column label="电话" align="center" prop="fphome" />
      <el-table-column label="手机" align="center" prop="fmoile" />
      <el-table-column label="备注" align="center" prop="fmemo" />
      <el-table-column label="发票" align="center" prop="fisprint" />
      <el-table-column label="信用天数" align="center" prop="ftipsday" />
      <el-table-column label="运输服务费" align="center" prop="ffreight" />
      <el-table-column label="信用额度" align="center" prop="fcredit" />
      <el-table-column label="助记码" align="center" prop="fspell" />
      <el-table-column label="启用标志位" align="center" prop="fflag" />
      <el-table-column label="联系人" align="center" prop="fsalesman" />
      <el-table-column label="区域" align="center" prop="fdistric" />
      <el-table-column label="结算方式" align="center" prop="fpaymentmethod" />
      <el-table-column label="所属分类，默认2077" align="center" prop="fcateid" />
      <el-table-column label="子分类ID" align="center" prop="fsubcateid" />
      <el-table-column label="建档日期" align="center" prop="fdate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.fdate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结算主号" align="center" prop="fgroupno" />
      <el-table-column label="结算主号标识" align="center" prop="fgroupnoflag" />
      <el-table-column label="是否回扣" align="center" prop="frebateflag" />
      <el-table-column label="打印单价" align="center" prop="fpushflag" />
      <el-table-column label="财务月结" align="center" prop="fmonthly" />
      <el-table-column label="月结日期" align="center" prop="fmonthlyday" />
      <el-table-column label="子类名称" align="center" prop="fsubcatename" />
      <el-table-column label="结算主号标识是则为0，否在为1" align="center" prop="flevel" />
      <el-table-column label="结算主号标识是则为0，否在为1" align="center" prop="fcreline" />
      <el-table-column label="结算主号标识是则为0，否在为1" align="center" prop="farmoney" />
      <el-table-column label="结算主号标识是则为0，否在为1" align="center" prop="ffrequency" />
      <el-table-column label="省" align="center" prop="fprovince" />
      <el-table-column label="市" align="center" prop="fcity" />
      <el-table-column label="区县" align="center" prop="fcounty" />
      <el-table-column label="邮政编码" align="center" prop="fzipcode" />
      <el-table-column label="省ID" align="center" prop="fprovinceid" />
      <el-table-column label="市ID" align="center" prop="fcityid" />
      <el-table-column label="区县ID" align="center" prop="fcountyid" />
      <el-table-column label="区县ID" align="center" prop="fcreditdays" />
      <el-table-column label="区县ID" align="center" prop="fcreditvalue" />
      <el-table-column label="是否通过" align="center" prop="fcreditflag" />
      <el-table-column label="地图坐标" align="center" prop="fcoordinate" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:customer:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:customer:remove']"
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

    <!-- 添加或修改客户档案对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属公司ID" prop="fcompanyid">
          <el-input v-model="form.fcompanyid" placeholder="请输入所属公司ID" />
        </el-form-item>
        <el-form-item label="客户名称" prop="fname">
          <el-input v-model="form.fname" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="公司地址" prop="faddress">
          <el-input v-model="form.faddress" placeholder="请输入公司地址" />
        </el-form-item>
        <el-form-item label="联系人" prop="flinkman">
          <el-input v-model="form.flinkman" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="电话" prop="fphome">
          <el-input v-model="form.fphome" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="手机" prop="fmoile">
          <el-input v-model="form.fmoile" placeholder="请输入手机" />
        </el-form-item>
        <el-form-item label="备注" prop="fmemo">
          <el-input v-model="form.fmemo" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="发票" prop="fisprint">
          <el-input v-model="form.fisprint" placeholder="请输入发票" />
        </el-form-item>
        <el-form-item label="信用天数" prop="ftipsday">
          <el-input v-model="form.ftipsday" placeholder="请输入信用天数" />
        </el-form-item>
        <el-form-item label="运输服务费" prop="ffreight">
          <el-input v-model="form.ffreight" placeholder="请输入运输服务费" />
        </el-form-item>
        <el-form-item label="信用额度" prop="fcredit">
          <el-input v-model="form.fcredit" placeholder="请输入信用额度" />
        </el-form-item>
        <el-form-item label="助记码" prop="fspell">
          <el-input v-model="form.fspell" placeholder="请输入助记码" />
        </el-form-item>
        <el-form-item label="启用标志位" prop="fflag">
          <el-input v-model="form.fflag" placeholder="请输入启用标志位" />
        </el-form-item>
        <el-form-item label="联系人" prop="fsalesman">
          <el-input v-model="form.fsalesman" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="区域" prop="fdistric">
          <el-input v-model="form.fdistric" placeholder="请输入区域" />
        </el-form-item>
        <el-form-item label="结算方式" prop="fpaymentmethod">
          <el-input v-model="form.fpaymentmethod" placeholder="请输入结算方式" />
        </el-form-item>
        <el-form-item label="所属分类，默认2077" prop="fcateid">
          <el-input v-model="form.fcateid" placeholder="请输入所属分类，默认2077" />
        </el-form-item>
        <el-form-item label="子分类ID" prop="fsubcateid">
          <el-input v-model="form.fsubcateid" placeholder="请输入子分类ID" />
        </el-form-item>
        <el-form-item label="建档日期" prop="fdate">
          <el-date-picker clearable size="small"
            v-model="form.fdate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择建档日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结算主号" prop="fgroupno">
          <el-input v-model="form.fgroupno" placeholder="请输入结算主号" />
        </el-form-item>
        <el-form-item label="结算主号标识" prop="fgroupnoflag">
          <el-input v-model="form.fgroupnoflag" placeholder="请输入结算主号标识" />
        </el-form-item>
        <el-form-item label="是否回扣" prop="frebateflag">
          <el-input v-model="form.frebateflag" placeholder="请输入是否回扣" />
        </el-form-item>
        <el-form-item label="打印单价" prop="fpushflag">
          <el-input v-model="form.fpushflag" placeholder="请输入打印单价" />
        </el-form-item>
        <el-form-item label="财务月结" prop="fmonthly">
          <el-input v-model="form.fmonthly" placeholder="请输入财务月结" />
        </el-form-item>
        <el-form-item label="月结日期" prop="fmonthlyday">
          <el-input v-model="form.fmonthlyday" placeholder="请输入月结日期" />
        </el-form-item>
        <el-form-item label="子类名称" prop="fsubcatename">
          <el-input v-model="form.fsubcatename" placeholder="请输入子类名称" />
        </el-form-item>
        <el-form-item label="结算主号标识是则为0，否在为1" prop="flevel">
          <el-input v-model="form.flevel" placeholder="请输入结算主号标识是则为0，否在为1" />
        </el-form-item>
        <el-form-item label="结算主号标识是则为0，否在为1" prop="fcreline">
          <el-input v-model="form.fcreline" placeholder="请输入结算主号标识是则为0，否在为1" />
        </el-form-item>
        <el-form-item label="结算主号标识是则为0，否在为1" prop="farmoney">
          <el-input v-model="form.farmoney" placeholder="请输入结算主号标识是则为0，否在为1" />
        </el-form-item>
        <el-form-item label="结算主号标识是则为0，否在为1" prop="ffrequency">
          <el-input v-model="form.ffrequency" placeholder="请输入结算主号标识是则为0，否在为1" />
        </el-form-item>
        <el-form-item label="省" prop="fprovince">
          <el-input v-model="form.fprovince" placeholder="请输入省" />
        </el-form-item>
        <el-form-item label="市" prop="fcity">
          <el-input v-model="form.fcity" placeholder="请输入市" />
        </el-form-item>
        <el-form-item label="区县" prop="fcounty">
          <el-input v-model="form.fcounty" placeholder="请输入区县" />
        </el-form-item>
        <el-form-item label="邮政编码" prop="fzipcode">
          <el-input v-model="form.fzipcode" placeholder="请输入邮政编码" />
        </el-form-item>
        <el-form-item label="省ID" prop="fprovinceid">
          <el-input v-model="form.fprovinceid" placeholder="请输入省ID" />
        </el-form-item>
        <el-form-item label="市ID" prop="fcityid">
          <el-input v-model="form.fcityid" placeholder="请输入市ID" />
        </el-form-item>
        <el-form-item label="区县ID" prop="fcountyid">
          <el-input v-model="form.fcountyid" placeholder="请输入区县ID" />
        </el-form-item>
        <el-form-item label="区县ID" prop="fcreditdays">
          <el-input v-model="form.fcreditdays" placeholder="请输入区县ID" />
        </el-form-item>
        <el-form-item label="区县ID" prop="fcreditvalue">
          <el-input v-model="form.fcreditvalue" placeholder="请输入区县ID" />
        </el-form-item>
        <el-form-item label="是否通过" prop="fcreditflag">
          <el-input v-model="form.fcreditflag" placeholder="请输入是否通过" />
        </el-form-item>
        <el-form-item label="地图坐标" prop="fcoordinate">
          <el-input v-model="form.fcoordinate" placeholder="请输入地图坐标" />
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
import { listCustomer, getCustomer, delCustomer, addCustomer, updateCustomer, exportCustomer } from "@/api/basic/customer";

export default {
  name: "Customer",
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
      // 客户档案表格数据
      customerList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        fcompanyid: null,
        fname: null,
        faddress: null,
        flinkman: null,
        fphome: null,
        fmoile: null,
        fmemo: null,
        fisprint: null,
        ftipsday: null,
        ffreight: null,
        fcredit: null,
        fspell: null,
        fflag: null,
        fsalesman: null,
        fdistric: null,
        fpaymentmethod: null,
        fcateid: null,
        fsubcateid: null,
        fdate: null,
        fgroupno: null,
        fgroupnoflag: null,
        frebateflag: null,
        fpushflag: null,
        fmonthly: null,
        fmonthlyday: null,
        fsubcatename: null,
        flevel: null,
        fcreline: null,
        farmoney: null,
        ffrequency: null,
        fprovince: null,
        fcity: null,
        fcounty: null,
        fzipcode: null,
        fprovinceid: null,
        fcityid: null,
        fcountyid: null,
        fcreditdays: null,
        fcreditvalue: null,
        fcreditflag: null,
        fcoordinate: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        fcompanyid: [
          { required: true, message: "所属公司ID不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询客户档案列表 */
    getList() {
      this.loading = true;
      listCustomer(this.queryParams).then(response => {
        this.customerList = response.rows;
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
        fcode: null,
        fcompanyid: null,
        fname: null,
        faddress: null,
        flinkman: null,
        fphome: null,
        fmoile: null,
        fmemo: null,
        fisprint: null,
        ftipsday: null,
        ffreight: null,
        fcredit: null,
        fspell: null,
        fflag: null,
        fsalesman: null,
        fdistric: null,
        fpaymentmethod: null,
        fcateid: null,
        fsubcateid: null,
        fdate: null,
        fgroupno: null,
        fgroupnoflag: null,
        frebateflag: null,
        fpushflag: null,
        fmonthly: null,
        fmonthlyday: null,
        fsubcatename: null,
        flevel: null,
        fcreline: null,
        farmoney: null,
        ffrequency: null,
        fprovince: null,
        fcity: null,
        fcounty: null,
        fzipcode: null,
        fprovinceid: null,
        fcityid: null,
        fcountyid: null,
        fcreditdays: null,
        fcreditvalue: null,
        fcreditflag: null,
        fcoordinate: null
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
      this.ids = selection.map(item => item.fcode)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加客户档案";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const fcode = row.fcode || this.ids
      getCustomer(fcode).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改客户档案";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.fcode != null) {
            updateCustomer(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCustomer(this.form).then(response => {
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
      const fcodes = row.fcode || this.ids;
      this.$confirm('是否确认删除客户档案编号为"' + fcodes + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delCustomer(fcodes);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有客户档案数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportCustomer(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>
<style scoped>
  .app-container {
    height: 100%;
    overflow: scroll;
  }
  form {
    height: 200px;
    overflow: scroll;
  }
</style>
