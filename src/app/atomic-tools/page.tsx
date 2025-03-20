"use client";

import { useState, useRef } from "react";
import { Button, Modal, Input, message } from "antd";
import {
  PlusOutlined,
} from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import type { ActionType, ProColumns } from "@ant-design/pro-components";

const { TextArea } = Input;

interface PluginItem {
  pluginName: string;
  remark: string;
  baselineItemCount: number;
  pluginVersionId: number;
}

// 创建操作组件
interface CreateOperationProps {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const CreateOperation = ({ open, onCancel, onSuccess }: CreateOperationProps) => {
  const handleSubmit = () => {
    // 模拟提交成功
    setTimeout(() => {
      message.success('创建成功');
      onCancel();
      onSuccess();
    }, 500);
  };

  return (
    <Modal
      title="新建原子操作"
      open={open}
      onCancel={onCancel}
      onOk={handleSubmit}
      width={500}
    >
      <div style={{ marginTop: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 8 }}>名称</div>
          <Input placeholder="请输入工具名称" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ marginBottom: 8 }}>描述</div>
          <TextArea placeholder="请输入工具描述" rows={4} />
        </div>
      </div>
    </Modal>
  );
};

export default function AtomicTools() {
  const [open, setOpen] = useState(false);
  const actionRef = useRef<ActionType>(null);
  
  // 模拟请求函数
  const requestFn = async (params: {
    current?: number;
    pageSize?: number;
    pluginName?: string;
  }) => {
    // 实际项目中这里会调用API
    const { current = 1, pageSize = 10, pluginName } = params;
    
    // 模拟数据
    const mockData: PluginItem[] = [
      {
        pluginName: "文件检查工具",
        remark: "检查服务器文件权限与配置，确保符合安全基线要求",
        baselineItemCount: 5,
        pluginVersionId: 1,
      },
      {
        pluginName: "日志分析工具",
        remark: "分析系统日志并生成报告，用于故障诊断和安全审计",
        baselineItemCount: 3,
        pluginVersionId: 2,
      },
      {
        pluginName: "网络诊断工具",
        remark: "检测网络连接状态与问题，包括延迟、丢包率和连接质量",
        baselineItemCount: 0,
        pluginVersionId: 3,
      },
      {
        pluginName: "服务监控工具",
        remark: "监控服务状态和资源使用，支持主动告警和自动化处理",
        baselineItemCount: 8,
        pluginVersionId: 4,
      },
      {
        pluginName: "数据备份工具",
        remark: "自动备份关键数据，支持增量备份和定时任务调度",
        baselineItemCount: 2,
        pluginVersionId: 5,
      },
    ];
    
    // 过滤数据
    let filteredData = [...mockData];
    if (pluginName) {
      filteredData = filteredData.filter(item => item.pluginName.includes(pluginName));
    }
    
    return {
      data: filteredData.slice((current - 1) * pageSize, current * pageSize),
      success: true,
      total: filteredData.length,
    };
  };
  
  // 处理创建按钮点击
  const handleCreateClick = () => {
    setOpen(true);
  };
  
  // 刷新表格数据
  const handleRefresh = () => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
    message.success('操作成功');
  };
  
  // 处理编辑功能
  const handleEdit = (record: PluginItem) => {
    message.info(`编辑: ${record.pluginName}`);
    // 实际项目中这里会打开编辑表单
  };
  
  // 处理删除功能
  const handleDelete = (id: string) => {
    message.info(`删除ID: ${id}`);
    // 实际项目中这里会调用删除API
  };
  
  // 表格列定义
  const columns: ProColumns<PluginItem>[] = [
    {
      title: '名称',
      dataIndex: 'pluginName',
      ellipsis: true,
      tooltip: '标题过长会自动收缩',
    },
    {
      title: '描述',
      dataIndex: 'remark',
      search: false,
      ellipsis: true,
      tooltip: '标题过长会自动收缩',
    },
    {
      title: '关联的基线项',
      dataIndex: 'baselineItemCount',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <a key="edit" onClick={() => handleEdit(record)}>
          编辑
        </a>,
        <a key="delete" onClick={() => handleDelete(record.pluginVersionId.toString())}>
          删除
        </a>,
      ],
    },
  ];

  return (
    <div style={{ background: 'white', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', padding: '16px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 500, margin: 0 }}>原子工具管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateClick}>
          创建原子工具
        </Button>
      </div>
      
      <div style={{ height: '100%', overflowX: 'hidden' }}>
        <ProTable<PluginItem>
          actionRef={actionRef}
          columns={columns}
          request={requestFn}
          cardBordered
          rowKey="pluginVersionId"
          search={{
            labelWidth: 120,
          }}
          pagination={{
            showQuickJumper: true,
            pageSize: 10,
          }}
          dateFormatter="string"
          headerTitle=""
          toolBarRender={() => []}
        />
      </div>
      
      <CreateOperation 
        open={open} 
        onCancel={() => setOpen(false)} 
        onSuccess={handleRefresh} 
      />
    </div>
  );
} 

