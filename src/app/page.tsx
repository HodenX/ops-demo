"use client"

import { useState } from "react"
import { Button, Input, Select, Switch, Checkbox, Table, DatePicker, Space } from "antd"
import { UnorderedListOutlined } from "@ant-design/icons"
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

interface DataItem {
  key: number;
  id: number;
  name: string;
  desc: string;
  type: string;
  level: number;
  autoInput: boolean;
  autoProcess: boolean;
  createTime: string;
  syncTime: string;
}

const { RangePicker } = DatePicker;

export default function Home() {
  const [, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);

  const data: DataItem[] = [
    {
      key: 1,
      id: 1,
      name: "iio_error",
      desc: "iio_error",
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
      name: "basic_env_interp...",
      desc: "basic_env_interpreter",
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
      name: "oscont-update",
      desc: "",
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
      desc: "时钟源异常",
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
      name: "kernel.sysrq",
      desc: "",
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
      desc: "大页与基线值不一致",
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
      desc: "bf3_vfe_version",
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
      name: "machine_rotatio...",
      desc: "机器轮转重启",
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
      name: "iio_error_ops_te...",
      desc: "",
      type: "基线对账",
      level: 2,
      autoInput: false,
      autoProcess: false,
      createTime: "2025-03-12 20:55:58",
      syncTime: "2025-03-17 19:27:21",
    },
  ];

  const columns: ColumnsType<DataItem> = [
    {
      title: <Checkbox />,
      key: 'selection',
      width: 50,
      render: () => <Checkbox />
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
      render: () => (
        <Button type="text" icon={<UnorderedListOutlined style={{ color: '#1890ff' }} />} />
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '等级',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: '自动录入',
      dataIndex: 'autoInput',
      key: 'autoInput',
      render: (checked) => <Switch checked={checked} />,
    },
    {
      title: '自动处理',
      dataIndex: 'autoProcess',
      key: 'autoProcess',
      render: (checked) => <Switch checked={checked} />,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '同步时间',
      dataIndex: 'syncTime',
      key: 'syncTime',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link">编辑</Button>
          <Button type="link">删除</Button>
          <Button type="link">详情</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ background: 'white', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', padding: '16px' }}>
      {/* Filters */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
        <RangePicker 
          onChange={(dates) => {
            if (dates) {
              setDateRange([dates[0], dates[1]]);
            } else {
              setDateRange([null, null]);
            }
          }} 
        />
        <Input placeholder="可搜索名称" style={{ maxWidth: '300px' }} />
        <Select
          placeholder="可搜索类型"
          style={{ width: '180px' }}
          options={[
            { value: 'all', label: '全部' },
            { value: 'baseline', label: '基线对账' },
            { value: 'non-standard', label: '非标对账' },
            { value: 'other', label: '其他' },
          ]}
        />
      </div>

      {/* Action Buttons */}
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary">创建配置项</Button>
          <Button type="primary">批量关闭处理</Button>
          <Button type="primary">批量开启处理</Button>
        </Space>
      </div>

      {/* Section Title */}
      <h2 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '16px' }}>配置接入</h2>

      {/* Table */}
      <Table 
        columns={columns} 
        dataSource={data} 
        pagination={{ pageSize: 10 }}
        size="middle"
        bordered
      />
    </div>
  )
}
