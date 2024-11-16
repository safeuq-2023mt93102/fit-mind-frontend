"use client";

import React, {useEffect, useState} from 'react';
import { Form, Input, Button, DatePicker, Layout, Typography, Flex, App } from 'antd';
import {useRouter} from "next/navigation";
import {ErrorResponse} from "@/interfaces/api/interfaces";
import {signIn} from "next-auth/react";

const {Title} = Typography;
const {Header, Sider, Content} = Layout;

function SignupComponent() {
  const [form] = Form.useForm();
  const { message, notification } = App.useApp();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  console.log("Notif: ", notification);

  const onFinish = (values: any) => {
    setLoading(true);
    console.log('Received values from form: ', values);
    const formattedDate = values.dateOfBirth.format("DD-MM-YYYY");
    // Here you would typically send a request to your backend to create a user
    fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        path: '/auth/signup',
        payload: {
          "password": values.password,
          "user": {
            "first_name": values.firstName,
            "last_name": values.lastName,
            "email": values.email,
            "date_of_birth": formattedDate
          }
        }
      })
    }).then((response) => {
      setLoading(false)
      console.log("Status: ", response.status);

      switch (response.status) {
        case 201:
          notification.success({
            message: 'Success',
            duration: 0,
            closeIcon: false,
            description: 'Account registered successfully. Redirecting...',
          });
          setTimeout(() => router.push("/"), 5000);
          break;
        case 400:
          response.json().then((error: ErrorResponse) => {
            console.log(error)
            switch (error.type) {
              case "param_not_unique":
                switch (error.metadata.param[0]) {
                  case "email":
                    return form.setFields([
                      { name: 'email', errors: ['This email is already taken']},
                    ]);
                }
                break;
            }
          })
          break;
      }
    })
  };

  return (
    <Layout style={{height: "100%", backgroundColor: "white"}}>
      <Header style={{padding: "0 20px 0 20px"}}>
        <Flex style={{height: "100%"}} align={"center"}>
          <Title level={4} style={{color: "white", margin: 0}}>Sign-up</Title>
        </Flex>
      </Header>
      <Content style={{width: "40%"}}>
        <Form style={{padding: "20px"}} form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'This field is required' },
              { type: 'email', message: 'Please enter a valid email address' },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="dateOfBirth"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Signup
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );

}
function SignupPage() {
  return (
    <App style={{height: "100%"}} notification={{ placement: 'bottomLeft' }}>
      <SignupComponent/>
    </App>
  );
};

export default SignupPage;