"use client";

import React, { useState } from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import {useRouter} from "next/navigation";

const SignupPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    console.log('Received values from form: ', values);
    // Here you would typically send a request to your backend to create a user
    fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        path: '/auth/signup',
        payload: {
          data: values
        }
      })
    }).then((response) => {
      setLoading(false)
      console.log("Status: ", response.status);
      switch (response.status) {
        case 200:
          console.log("Response: ", response.json());
          break;
        case 401:
          router.push("/")
          break;
      }
    })
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}>
      <h2>Signup</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: 'Please enter your first name' }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: true, message: 'Please enter your last name' }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Date of Birth"
          name="date_of_birth"
          rules={[{ required: true, message: 'Please select your date of birth' }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Signup
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignupPage;