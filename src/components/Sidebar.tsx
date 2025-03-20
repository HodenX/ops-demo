"use client"

import { Menu } from "antd"
import type { MenuProps } from "antd"
import {
  UnorderedListOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
} from "@ant-design/icons"
import { usePathname, useRouter } from 'next/navigation'
import { useMemo } from "react"

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  // 定义菜单项
  const menuItems = useMemo(() => [
    {
      key: 'task-list',
      icon: <UnorderedListOutlined />,
      label: '任务列表',
    },
    {
      key: 'task-template',
      icon: <AppstoreOutlined />,
      label: '任务模板',
    },
    {
      key: 'baseline-rotation',
      icon: <DatabaseOutlined />,
      label: '基线轮转',
      children: [
        {
          key: '/atomic-tools',
          label: '原子工具',
        },
        {
          key: '/add-baseline',
          label: '添加基线',
        },
        {
          key: '/baseline-config',
          label: '创建配置',
        },
        {
          key: '/config-access',
          label: '配置接入',
        },
        {
          key: 'fault-view',
          label: '故障查看',
        },
      ],
    },
   
    {
      key: 'custom-view',
      icon: <AppstoreOutlined />,
      label: '自定义视图',
      children: [
        {
          key: 'view-management',
          label: '视图管理',
        },
        {
          key: 'create-view',
          label: '创建视图',
        },
      ],
    },
  ], [])

  // 获取当前选中的菜单项
  const selectedKeys = useMemo(() => {
    if (pathname === '/') return ['/atomic-tools']
    // 找到匹配的顶层菜单项
    return [pathname]
  }, [pathname])

  // 处理菜单点击
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    // 如果是带路径的菜单项，直接导航
    if (e.key.startsWith('/')) {
      router.push(e.key)
    }
  }

  return (
    <aside style={{ width: '200px', background: 'white', borderRight: '1px solid #e8e8e8' }}>
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        onClick={handleMenuClick}
        style={{ height: '100%', borderRight: 0 }}
        items={menuItems}
      />
    </aside>
  )
} 