"use client";

import { useState, useRef } from "react";
import { Button, message } from "antd";
import {
  PlusOutlined,
} from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import CreateBaselineModal from "./components/CreateBaselineModal";

interface BaselineConfig {
  key: number;
  name: string;
  description: string;
  baselineStatus: string;
  deviceStatus: string;
}

export default function BaselineConfig() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const actionRef = useRef<ActionType>(null);
  
  // 模拟请求函数
  const requestFn = async (params: {
    current?: number;
    pageSize?: number;
    name?: string;
  }) => {
    // 实际项目中这里会调用API
    const { current = 1, pageSize = 10, name } = params;
    
    // 模拟数据
    const mockData: BaselineConfig[] = [
      {
        key: 1,
        name: "XXXXX",
        description: "扩容基线",
        baselineStatus: "达到终态 (8/8)",
        deviceStatus: "达到终态 (8/8)",
      },
      {
        key: 2,
        name: "XXXXX",
        description: "轮转基线",
        baselineStatus: "未达终态 (5/8)",
        deviceStatus: "未达终态 (90/100)",
      },
    ];
    
    // 过滤数据
    let filteredData = [...mockData];
    if (name) {
      filteredData = filteredData.filter(item => item.name.includes(name));
    }
    
    return {
      data: filteredData.slice((current - 1) * pageSize, current * pageSize),
      success: true,
      total: filteredData.length,
    };
  };
  
  // 处理创建按钮点击
  const handleCreateClick = () => {
    console.log("点击创建基线模块按钮");
    setIsModalOpen(true);
  };
  
  // 刷新表格数据
  const handleRefresh = () => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
    message.success('操作成功');
  };
  
  // 处理查看详情功能
  const handleDetails = (record: BaselineConfig) => {
    message.info(`查看详情: ${record.name}`);
    // 实际项目中这里会跳转到详情页面
  };
  
  // 表格列定义
  const columns: ProColumns<BaselineConfig>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: true,
      tooltip: '标题过长会自动收缩',
    },
    {
      title: '描述',
      dataIndex: 'description',
      search: false,
      ellipsis: true,
    },
    {
      title: '基线项状态',
      dataIndex: 'baselineStatus',
      search: false,
      render: (text) => {
        const statusText = text as string;
        if (statusText && statusText.includes('达到终态')) {
          return <span style={{ color: 'green' }}>{statusText}</span>;
        }
        return <span style={{ color: 'red' }}>{statusText}</span>;
      },
    },
    {
      title: '部署机器状态',
      dataIndex: 'deviceStatus',
      search: false,
      render: (text) => {
        const statusText = text as string;
        if (statusText && statusText.includes('达到终态')) {
          return <span style={{ color: 'green' }}>{statusText}</span>;
        }
        return <span style={{ color: 'red' }}>{statusText}</span>;
      },
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <a key="details" onClick={() => handleDetails(record)}>
          详情
        </a>,
      ],
    },
  ];

  return (
    <div style={{ background: 'white', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', padding: '16px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 500, margin: 0 }}>基线模块</h2>
      </div>
      
      <div style={{ height: '100%', overflowX: 'hidden' }}>
        <ProTable<BaselineConfig>
          actionRef={actionRef}
          columns={columns}
          request={requestFn}
          cardBordered
          rowKey="key"
          pagination={{
            showQuickJumper: true,
            pageSize: 10,
          }}
          search={{
            labelWidth: 120,
          }}
          dateFormatter="string"
          headerTitle=""
          toolBarRender={() => [<Button key="create-baseline" type="primary" icon={<PlusOutlined />} onClick={handleCreateClick}>
            创建基线模板
          </Button>]}
        />  
      </div>
      
      {isModalOpen && (
        <CreateBaselineModal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onSuccess={handleRefresh}
        />
      )}
    </div>
  );
} 