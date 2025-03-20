"use client"

import { Button, Space } from "antd"
import {
  DownOutlined,
  InfoCircleOutlined,
  AppstoreOutlined,
  SettingOutlined, 
  FileTextOutlined,
  DatabaseOutlined,
  MonitorOutlined,
  SafetyOutlined,
  UserOutlined,
} from "@ant-design/icons"

export default function Header() {
  return (
    <header style={{ background: 'white', borderBottom: '1px solid #e8e8e8', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <div>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jietu-1742375696070.jpg-nlZdlAfznLGjIgUfFBp0emk3MQj2C8.jpeg"
            alt="OPS Logo"
            style={{ height: '64px' }}
          />
        </div>

        <Space size={4}>
          <Button type="text">当前节点: 云计算</Button>
          <Button type="text" icon={<AppstoreOutlined />}>事件中心</Button>
          <Button type="text" icon={<FileTextOutlined />}>调度中心</Button>
          <Button type="text" icon={<AppstoreOutlined />}>变更中心</Button>
          <Button type="text" icon={<SettingOutlined />}>运维中心</Button>
          <Button type="text" icon={<DatabaseOutlined />}>资源中心</Button>
          <Button type="text" icon={<MonitorOutlined />}>监控中心</Button>
          <Button type="text" icon={<SafetyOutlined />}>安全中心</Button>
        </Space>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button type="text" icon={<InfoCircleOutlined />} />
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
          <UserOutlined />
          <span style={{ marginLeft: '4px' }}>liulingfeng</span>
          <DownOutlined style={{ fontSize: '12px', marginLeft: '4px' }} />
        </div>
      </div>
    </header>
  )
} 