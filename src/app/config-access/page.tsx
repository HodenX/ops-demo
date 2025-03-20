"use client";

import { useState } from "react";
import { Button, Table, Space, DatePicker, Input, Select, Switch, message } from "antd";
import {
  PlusOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import CreateConfigModal from "./components/CreateConfigModal";

const { RangePicker } = DatePicker;

interface ConfigItem {
  key: number;
  id: number;
  name: string;
  description: string;
  type: string;
  level: number;
  autoInput: boolean;
  autoProcess: boolean;
  createTime: string;
  syncTime: string;
}

export default function ConfigAccess() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 模拟数据
  const data: ConfigItem[] = [
    {
      key: 1,
      id: 1,
      name: "iio_error",
      description: "iio_error",
      type: "非标对账",
      level: 1,
      autoInput: true,
      autoProcess: true,
      createTime: "2024-12-04 19:40:03",
      syncTime: "2025-03-19 10:32:36",
    },
    {
      key: 2,
      id: 2,
      name: "basic_env_interpreter",
      description: "basic_env_interpreter",
      type: "基线对账",
      level: 0,
      autoInput: true,
      autoProcess: false,
      createTime: "2024-09-05 21:46:09",
      syncTime: "2025-01-22 19:15:39",
    },
    {
      key: 3,
      id: 13,
      name: "osconf-update",
      description: "",
      type: "其他",
      level: 2,
      autoInput: true,
      autoProcess: false,
      createTime: "2024-12-20 14:35:30",
      syncTime: "2025-01-22 19:11:25",
    },
    {
      key: 4,
      id: 14,
      name: "cpu_clocksource",
      description: "时钟源异常",
      type: "基线对账",
      level: 0,
      autoInput: true,
      autoProcess: true,
      createTime: "2024-12-24 17:28:16",
      syncTime: "2025-02-07 10:30:25",
    },
    {
      key: 5,
      id: 16,
      name: "kernel_sysrq",
      description: "",
      type: "基线对账",
      level: 0,
      autoInput: true,
      autoProcess: true,
      createTime: "2024-12-25 19:19:26",
      syncTime: "2025-01-21 19:10:55",
    },
    {
      key: 6,
      id: 17,
      name: "hugepage_num",
      description: "大页与基线值不一致",
      type: "非标对账",
      level: 1,
      autoInput: true,
      autoProcess: true,
      createTime: "2025-02-10 14:38:59",
      syncTime: "2025-02-24 10:33:15",
    },
    {
      key: 7,
      id: 18,
      name: "bf3_vfe_version",
      description: "bf3_vfe_version",
      type: "基线对账",
      level: 2,
      autoInput: true,
      autoProcess: true,
      createTime: "2025-02-18 20:57:10",
      syncTime: "2025-03-04 19:16:01",
    },
    {
      key: 8,
      id: 24,
      name: "machine_rotation",
      description: "机器轮转重启",
      type: "基线对账",
      level: 2,
      autoInput: true,
      autoProcess: true,
      createTime: "2025-02-28 14:35:26",
      syncTime: "2025-03-18 20:50:02",
    },
    {
      key: 9,
      id: 25,
      name: "iio_error_ops_test",
      description: "",
      type: "基线对账",
      level: 2,
      autoInput: false,
      autoProcess: false,
      createTime: "2025-03-12 20:55:58",
      syncTime: "2025-03-17 19:27:21",
    },
  ];

  // 列定义
  const columns: ColumnsType<ConfigItem> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 180,
      render: (text, record) => (
        <Space>
          {text}
          <a onClick={() => showDetails(record)} style={{ color: '#1890ff' }}>
            <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
              <path d="M232.727273 46.545455h209.454545a23.272727 23.272727 0 0 1 0 46.545454H232.727273a23.272727 23.272727 0 0 0-23.272728 23.272727v791.272728a23.272727 23.272727 0 0 0 23.272728 23.272727h558.545454a23.272727 23.272727 0 0 0 23.272728-23.272727V116.363636a23.272727 23.272727 0 0 0-23.272728-23.272727H581.818182a23.272727 23.272727 0 0 1 0-46.545454h209.454545a69.818182 69.818182 0 0 1 69.818182 69.818181v791.272728a69.818182 69.818182 0 0 1-69.818182 69.818181H232.727273a69.818182 69.818182 0 0 1-69.818182-69.818181V116.363636a69.818182 69.818182 0 0 1 69.818182-69.818181z"></path>
              <path d="M430.545455 160.581818a23.272727 23.272727 0 0 1 0-32.930909l116.363636-116.363636a23.272727 23.272727 0 0 1 33.000727 0l116.363636 116.363636a23.272727 23.272727 0 1 1-32.930909 32.930909L593.454545 91.089455V384a23.272727 23.272727 0 0 1-46.545454 0V91.089455l-69.981091 69.492363a23.272727 23.272727 0 0 1-32.930909 0zM325.818182 605.090909V512a23.272727 23.272727 0 0 1 23.272727-23.272727h325.818182A23.272727 23.272727 0 0 1 698.181818 512v93.090909a23.272727 23.272727 0 0 1-23.272727 23.272727H349.090909a23.272727 23.272727 0 0 1-23.272727-23.272727z m46.545454-23.272727v0.093091h279.272728V535.272727H372.363636z"></path>
            </svg>
          </a>
        </Space>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      width: 180,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 120,
    },
    {
      title: '等级',
      dataIndex: 'level',
      key: 'level',
      width: 80,
    },
    {
      title: '自动录入',
      dataIndex: 'autoInput',
      key: 'autoInput',
      width: 100,
      render: (value, record) => (
        <Switch 
          checked={value} 
          onChange={(checked) => handleSwitchChange(record.id, 'autoInput', checked)} 
        />
      ),
    },
    {
      title: '自动处理',
      dataIndex: 'autoProcess',
      key: 'autoProcess',
      width: 100,
      render: (value, record) => (
        <Switch 
          checked={value} 
          onChange={(checked) => handleSwitchChange(record.id, 'autoProcess', checked)} 
        />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
    },
    {
      title: '同步时间',
      dataIndex: 'syncTime',
      key: 'syncTime',
      width: 180,
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a onClick={() => handleDelete(record)}>删除</a>
          <a onClick={() => showDetails(record)}>详情</a>
        </Space>
      ),
    },
  ];

  // 行选择配置
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  // 处理创建配置
  const handleCreateConfig = () => {
    setIsModalOpen(true);
  };

  // 刷新表格数据
  const handleRefresh = () => {
    message.success('操作成功');
  };

  // 批量关闭处理
  const handleBatchCloseProcess = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要操作的项');
      return;
    }
    message.info(`批量关闭处理: ${selectedRowKeys.join(', ')}`);
  };

  // 批量开启处理
  const handleBatchOpenProcess = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要操作的项');
      return;
    }
    message.info(`批量开启处理: ${selectedRowKeys.join(', ')}`);
  };

  // 处理开关状态变化
  const handleSwitchChange = (id: number, field: string, checked: boolean) => {
    message.info(`修改 ID:${id} 的 ${field} 为 ${checked}`);
  };

  // 处理编辑
  const handleEdit = (record: ConfigItem) => {
    message.info(`编辑 ID:${record.id}`);
  };

  // 处理删除
  const handleDelete = (record: ConfigItem) => {
    message.info(`删除 ID:${record.id}`);
  };

  // 显示详情
  const showDetails = (record: ConfigItem) => {
    message.info(`查看详情 ID:${record.id}`);
  };

  return (
    <div style={{ background: 'white', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', padding: '16px' }}>
      {/* 过滤器 */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
        <RangePicker 
          placeholder={['开始日期', '结束日期']}
          style={{ width: '240px' }}
        />
        <Input placeholder="可搜索名称" style={{ width: '240px' }} />
        <Select
          placeholder="可搜索类型"
          style={{ width: '240px' }}
          options={[
            { value: 'all', label: '全部' },
            { value: 'baseline', label: '基线对账' },
            { value: 'non-standard', label: '非标对账' },
            { value: 'other', label: '其他' },
          ]}
        />
      </div>

      {/* 操作按钮 */}
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateConfig}>
            创建配置项
          </Button>
          <Button type="primary" onClick={handleBatchCloseProcess}>
            批量关闭处理
          </Button>
          <Button type="primary" onClick={handleBatchOpenProcess}>
            批量开启处理
          </Button>
        </Space>
      </div>

      {/* 区域标题 */}
      <h2 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '16px' }}>配置接入</h2>

      {/* 表格 */}
      <Table 
        rowSelection={rowSelection}
        columns={columns} 
        dataSource={data} 
        pagination={{ pageSize: 10 }}
        size="middle"
        bordered
        scroll={{ x: 1300 }}
      />

      {/* 创建配置模态框 */}
      {isModalOpen && (
        <CreateConfigModal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onSuccess={handleRefresh}
        />
      )}
    </div>
  );
} 