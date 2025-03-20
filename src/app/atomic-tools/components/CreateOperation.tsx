"use client";

import { useState } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';

interface CreateOperationProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
}

const typeOptions = [
  { value: '系统工具', label: '系统工具' },
  { value: '网络工具', label: '网络工具' },
  { value: '监控工具', label: '监控工具' },
  { value: '分析工具', label: '分析工具' },
];

export default function CreateOperation({ open, setOpen, onSuccess }: CreateOperationProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      setLoading(true);
      
      // 模拟API请求
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
        form.resetFields();
        message.success('创建成功');
        onSuccess();
      }, 1000);
    } catch (error) {
      console.error('提交表单时出错:', error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title="新建原子操作"
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={600}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: '请输入名称' }]}
        >
          <Input placeholder="请输入工具名称" />
        </Form.Item>
        
        <Form.Item
          label="描述"
          name="description"
          rules={[{ required: true, message: '请输入描述' }]}
        >
          <Input.TextArea rows={4} placeholder="请输入工具的功能描述" />
        </Form.Item>
        
        <Form.Item
          label="分类"
          name="type"
          rules={[{ required: true, message: '请选择分类' }]}
        >
          <Select
            placeholder="请选择分类"
            options={typeOptions}
          />
        </Form.Item>
        
        <Form.Item
          label="脚本路径"
          name="scriptPath"
          rules={[{ required: true, message: '请输入脚本路径' }]}
        >
          <Input placeholder="请输入脚本路径，例如：/home/scripts/check_file.sh" />
        </Form.Item>
        
        <Form.Item
          label="参数设置"
          name="parameters"
        >
          <Input placeholder="请输入参数设置，多个参数用逗号分隔" />
        </Form.Item>
        
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button onClick={handleCancel}>取消</Button>
            <Button type="primary" loading={loading} onClick={handleSubmit}>
              确定
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
} 