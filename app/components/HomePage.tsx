"use client"

import Navbar from "@/app/components/Navbar";
import {Session} from "next-auth";
import { Typography, Button, Flex, Layout } from "antd";
import {SessionProvider} from "next-auth/react";
import '@/css/banner.css'

const { Title, Paragraph } = Typography;

export default function HomePage({session}:{session: Session | null}) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Navbar/>
        <Layout.Content>
          <Flex className="banner-container banner-image"
                style={{flexDirection: "row-reverse", height: "800px", backgroundImage: "url('/images/walking.jpg')"}}>
            <div className="banner-content">
              <Title level={1} className="banner-title">
                Activity
              </Title>
              <Paragraph className="banner-description">
                Regular physical activity is essential for maintaining both physical and mental well-being. Our comprehensive fitness tracking platform helps you stay on top of your health goals through multiple features. Track your daily activities, monitor your nutrition intake, and follow personalized workout plans tailored to your fitness level. Whether you&apos;re a beginner or an advanced fitness enthusiast, our platform provides the tools you need to log exercises, share progress with friends, and integrate with your favorite fitness devices. Start your journey to a healthier lifestyle with our easy-to-use activity tracking and goal-setting features.
              </Paragraph>
            </div>
            <div className="banner-gradient"></div>
            <div style={{flexGrow: 1}}></div>
          </Flex>
          <Flex className="banner-container banner-image"
                style={{flexDirection: "row", height: "800px", backgroundImage: "url('/images/diet-plan.jpg')"}}>
            <div className="banner-content">
              <Title level={1} className="banner-title">
                Diet Plan
              </Title>
              <Paragraph className="banner-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna lectus, luctus nec ex ac, bibendum ornare nisi. In ac scelerisque enim, eget vehicula libero. Pellentesque convallis est bibendum nibh elementum sagittis. Morbi pharetra iaculis ex, et auctor enim suscipit eu. Quisque lobortis lorem in est venenatis rutrum. Praesent et fringilla neque. Fusce mattis quis tellus at posuere. Sed quis lacus non leo laoreet aliquam eu non velit. Pellentesque ullamcorper vestibulum enim vel vehicula. Pellentesque non posuere enim. Aliquam imperdiet quam et fringilla facilisis. Vivamus dapibus metus eros, et dictum ipsum luctus rutrum. Morbi nec malesuada eros, et volutpat purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. Sed eu quam venenatis, tempor ante id, imperdiet nulla.
              </Paragraph>
            </div>
            <div className="banner-gradient-reverse"></div>
            <div style={{flexGrow: 1}}></div>
          </Flex>
          <Flex className="banner-container banner-image"
                style={{flexDirection: "row-reverse", height: "800px", backgroundImage: "url('/images/fitness.jpg')"}}>
            <div className="banner-content">
              <Title level={1} className="banner-title">
                Fitness
              </Title>
              <Paragraph className="banner-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In urna lectus, luctus nec ex ac, bibendum ornare nisi. In ac scelerisque enim, eget vehicula libero. Pellentesque convallis est bibendum nibh elementum sagittis. Morbi pharetra iaculis ex, et auctor enim suscipit eu. Quisque lobortis lorem in est venenatis rutrum. Praesent et fringilla neque. Fusce mattis quis tellus at posuere. Sed quis lacus non leo laoreet aliquam eu non velit. Pellentesque ullamcorper vestibulum enim vel vehicula. Pellentesque non posuere enim. Aliquam imperdiet quam et fringilla facilisis. Vivamus dapibus metus eros, et dictum ipsum luctus rutrum. Morbi nec malesuada eros, et volutpat purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam erat volutpat. Sed eu quam venenatis, tempor ante id, imperdiet nulla.
              </Paragraph>
            </div>
            <div className="banner-gradient"></div>
            <div style={{flexGrow: 1}}></div>
          </Flex>
        </Layout.Content>
      </Layout>x
    </SessionProvider>
  );
}