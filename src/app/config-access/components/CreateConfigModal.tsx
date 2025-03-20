"use client";

import { useState } from 'react';
import { Modal, Form, Input, Select, Button, Switch, message } from 'antd';

interface CreateConfigModalProps {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const { TextArea } = Input;

const configTypeOptions = [
  { value: '基线对账', label: '基线对账' },
  { value: '非标对账', label: '非标对账' },
  { value: '其他', label: '其他' },
];

export default function CreateConfigModal({ open, onCancel, onSuccess }: CreateConfigModalProps) {
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
      title="创建配置项"
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
          <Input placeholder="请输入配置项名称" />
        </Form.Item>
        
        <Form.Item
          label="描述"
          name="description"
          rules={[{ required: true, message: '请输入描述' }]}
        >
          <TextArea rows={4} placeholder="请输入配置项描述" />
        </Form.Item>

        <Form.Item
          label="故障等级"
          name="level"
          rules={[{ required: true, message: '请选择等级' }]}
        >
          <Select
            placeholder="请选择等级"
            options={[
              { value: 0, label: '0' },
              { value: 1, label: '1' },
              { value: 2, label: '2' },
            ]}
          />
        </Form.Item>
        
        <Form.Item
          label="对账方式"
          name="type"
          rules={[{ required: true, message: '请选择对账类型' }]}
        >
          <Select
            placeholder="请选择类型"
            options={configTypeOptions}
          />
        </Form.Item>
        
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

        <Form.Item
          label="自动录入"
          name="autoInput"
          valuePropName="checked"
          tooltip="创建的配置项对应的基线项自动加入到 OPS的扫描任务"
          initialValue={true}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="自动处置"
          name="autoProcess"
          valuePropName="checked"
          tooltip="创建的配置项对应的基线项自动加入到 OPS的处置任务"
          initialValue={true}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="处置时间"
          name="processTime"
          rules={[{ required: true, message: '请输入处置时间' }]}
          tooltip="每次间隔多久处置一次异常的对账数据"
        >
          <Input placeholder="请输入处置时间，e.g. 0 3/30 * * * ? *" />
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