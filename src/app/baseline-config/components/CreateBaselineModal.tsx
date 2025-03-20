"use client";

import { useState } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';

interface CreateBaselineModalProps {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const { TextArea } = Input;

const baselineTypeOptions = [
  { value: '扩容基线', label: '扩容基线' },
  { value: '轮转基线', label: '轮转基线' },
  { value: '容灾基线', label: '容灾基线' },
  { value: '自定义基线', label: '自定义基线' },
];

export default function CreateBaselineModal({ open, onCancel, onSuccess }: CreateBaselineModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      setLoading(true);
      
      // 模拟API请求
      setTimeout(() => {
        setLoading(false);
        onCancel();
        form.resetFields();
        message.success('创建成功');
        onSuccess();
      }, 1000);
    } catch (error) {
      console.error('提交表单时出错:', error);
    }
  };

  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <Modal
      title="创建基线模块"
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
          <Input placeholder="可搜索基线名称" />
        </Form.Item>
        
        <Form.Item
          label="描述"
          name="description"
          rules={[{ required: true, message: '请输入描述' }]}
        >
          <TextArea rows={4} placeholder="请输入基线描述" />
        </Form.Item>
        
        {/* <Form.Item
          label="类型"
          name="type"
          rules={[{ required: true, message: '请选择类型' }]}
        >
          <Select
            placeholder="请选择类型"
            options={baselineTypeOptions}
          />
        </Form.Item> */}
        
        <Form.Item
          label="关联基线项"
          name="relatedBaseline"
          rules={[{ required: true, message: '请选择关联基线项' }]}
        >
          <Select
            placeholder="请选择关联基线项"
            mode="multiple"
            options={[
              { value: 'baseline1', label: 'CPU型号' },
              { value: 'baseline2', label: '磁盘大小' },
              { value: 'baseline3', label: '网络带宽' },
              { value: 'baseline4', label: '系统版本' },
            ]}
          />
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