"use client";

import {useEffect, useState} from 'react';
import {Card, Flex, Layout, Spin, Typography} from 'antd';
import ProgressPreview from "@/app/components/ProgressPreview";
import SocialSharing from "@/app/components/SocialSharing";
import {callGet, stepProgressData, toProgressData} from "@/util/util";
import {ActivityApi, ActivityType, Servers, WalkingActivity} from "@/interfaces/api/interfaces";
import {ProgressData} from "@/interfaces/app/interface";

const {Content} = Layout;
const {Title} = Typography;

export default function SharePageView() {
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState<ProgressData>({
    steps: 0,
    caloriesBurned: 0,
    distance: 0,
    goalsAchieved: [],
  });

  useEffect(() => {
    setLoading(true);
    callGet({
      server: Servers.CORE,
      path: '/activity/'
    }).then(async (response) => {
      const data: ActivityApi[] = await response.json();
      const steps: number = data
        .map((activityApi) => toProgressData(activityApi)?.steps as number)
        .reduce((first, second) => first + second, 0);

      setProgressData(stepProgressData(steps) as ProgressData);
      setLoading(false);
    });
  }, []);

  return (
    <Layout style={{height: "100%"}}>
      <Content style={{padding: "20px"}}>
        <Spin spinning={loading}>
          <Card>
            <Flex style={{height: "100%"}} justify="center" gap="middle" vertical>
              <ProgressPreview progressData={progressData}/>
              <Flex>
                <SocialSharing progressData={progressData} disabled={loading}/>
              </Flex>
            </Flex>
          </Card>
        </Spin>
      </Content>
    </Layout>
  );
} 