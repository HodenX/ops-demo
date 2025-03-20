"use client";

import { useState, useRef } from "react";
import { Button, message } from "antd";
import {
  PlusOutlined,
} from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import CreateBaselineItem from "./components/CreateBaselineItem";

interface BaselineItem {
  key: number;
  name: string;
  desc: string;
  type: string;
  associatedFlavorTags: number;
  relationshipOperation: string;
}

export default function AddBaseline() {
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
    const mockData: BaselineItem[] = [
      {
        key: 1,
        name: "cpu型号",
        desc: "XXXX",
        type: "omc 基线",
        associatedFlavorTags: 4,
        relationshipOperation: "全部关联",
      },
      {
        key: 2,
        name: "磁盘大小",
        desc: "XXXXXX",
        type: "自定义",
        associatedFlavorTags: 2,
        relationshipOperation: "部分关联 (1/2)",
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
    console.log("点击创建基线项按钮");
    setIsModalOpen(true);
  };
  
  // 刷新表格数据
  const handleRefresh = () => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
    message.success('操作成功');
  };
  
  // 处理编辑功能
  const handleEdit = (record: BaselineItem) => {
    message.info(`编辑: ${record.name}`);
    // 实际项目中这里会打开编辑表单
  };
  
  // 处理删除功能
  const handleDelete = (id: number) => {
    message.info(`删除ID: ${id}`);
    // 实际项目中这里会调用删除API
  };

  // 处理详情查看
  const handleDetails = (record: BaselineItem) => {
    message.info(`查看详情: ${record.name}`);
    // 实际项目中这里会打开详情页面
  };
  
  // 表格列定义
  const columns: ProColumns<BaselineItem>[] = [
    {
      title: '基线项',
      dataIndex: 'name',
      ellipsis: true,
      tooltip: '标题过长会自动收缩',
    },
    {
      title: '描述',
      dataIndex: 'desc',
      search: false,
      ellipsis: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      search: false,
    },
    {
      title: '关联 flavor_tag 数',
      dataIndex: 'associatedFlavorTags',
      search: false,
    },
    {
      title: '关联原子操作',
      dataIndex: 'relationshipOperation',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <a key="details" onClick={() => handleDetails(record)}>
          详情
        </a>,
        <a key="edit" onClick={() => handleEdit(record)}>
          编辑
        </a>,
        <a key="delete" onClick={() => handleDelete(record.key)}>
          删除
        </a>,
      ],
    },
  ];

  return (
    <div style={{ background: 'white', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', padding: '16px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 500, margin: 0 }}>基线项管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateClick}>
          创建基线项
        </Button>
      </div>
      
      <div style={{ height: '100%', overflowX: 'hidden' }}>
        <ProTable<BaselineItem>
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
          toolBarRender={() => []}
        />
      </div>
      
      {isModalOpen && (
        <CreateBaselineItem
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onSuccess={handleRefresh}
        />
      )}
    </div>
  );
} 