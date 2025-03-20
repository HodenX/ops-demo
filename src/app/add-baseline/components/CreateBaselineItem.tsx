"use client";

import React from 'react';
import { Modal, Button } from 'antd';

interface CreateBaselineItemProps {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const CreateBaselineItem: React.FC<CreateBaselineItemProps> = ({ open, onCancel, onSuccess }) => {
  const handleOk = () => {
    setTimeout(() => {
      onCancel();
      onSuccess();
    }, 1000);
  };

  return (
    <Modal
      title="创建基线项"
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          确定
        </Button>,
      ]}
    >
      <p>简化版基线项创建模态框内容</p>
      <p>在实际应用中这里会包含完整的表单内容</p>
    </Modal>
  );
};

export default CreateBaselineItem; 