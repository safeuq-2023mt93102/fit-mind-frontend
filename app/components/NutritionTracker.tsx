"use client";

import React, { useState } from 'react';
import { Button, Modal, Input, Table, Form, DatePicker, Flex } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface NutritionEntry {
  key: number;
  id: number;
  foodItem: string;
  calories: number;
  date: string;
}

const columns: ColumnsType<NutritionEntry> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Food Item',
    dataIndex: 'foodItem',
    key: 'foodItem',
  },
  {
    title: 'Calories',
    dataIndex: 'calories',
    key: 'calories',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
];

const NutritionTracker: React.FC = () => {
  const [data, setData] = useState<NutritionEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setIsModalOpen(false);
        const newEntry: NutritionEntry = {
          key: data.length + 1,
          id: data.length + 1,
          foodItem: values.foodItem,
          calories: values.calories,
          date: values.date.format('DD/MM/YYYY'),
        };
        setData([...data, newEntry]);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Flex style={{height: "100%", padding: "20px"}} gap={"middle"} justify={"center"} vertical>
        <Flex gap={"middle"}>
          <Button type="primary" onClick={showModal}>
            Log Nutrition
          </Button>
        </Flex>
        <Table columns={columns} dataSource={data}/>
        <div style={{flexGrow: 1}}/>
      </Flex>
      <Modal title="Log Nutrition" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" name="nutrition_form">
          <Form.Item
            name="foodItem"
            label="Food Item"
            rules={[{required: true, message: 'Please enter the food item'}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name="calories"
            label="Calories"
            rules={[{required: true, message: 'Please enter the number of calories'}]}
          >
            <Input type="number"/>
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{required: true, message: 'Please select the date'}]}
          >
            <DatePicker format="DD/MM/YYYY"/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default NutritionTracker;