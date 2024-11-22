"use client";
import { Card, Statistic, List, Typography, Flex } from 'antd';
import { GiBootPrints } from "react-icons/gi";
import { StepForwardOutlined, FireOutlined, CompassOutlined, TrophyOutlined } from '@ant-design/icons';
import { useEffect, useState, useRef } from 'react';

const { Title, Text } = Typography;

interface ProgressData {
  steps: number;
  caloriesBurned: number;
  distance: number;
  goalsAchieved: string[];
}

interface ProgressPreviewProps {
  progressData: ProgressData;
}

export default function ProgressPreview({ progressData }: ProgressPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gap, setGap] = useState(64);

  useEffect(() => {
    const updateGap = () => {
      if (containerRef.current) {
        const statisticElements = containerRef.current.getElementsByClassName('ant-statistic');
        let totalWidth = 0;
        
        Array.from(statisticElements).forEach(element => {
          totalWidth += element.clientWidth;
        });

        const containerWidth = containerRef.current.offsetWidth;
        const calculatedGap = Math.max(16, Math.min(64, 
          Math.floor(64 - (totalWidth / containerWidth) * 48)
        ));

        setGap(calculatedGap);
      }
    };

    // Initial calculation
    updateGap();

    // Create ResizeObserver to watch the statistics
    const resizeObserver = new ResizeObserver(updateGap);
    
    // Observe each statistic element
    if (containerRef.current) {
      const statisticElements = containerRef.current.getElementsByClassName('ant-statistic');
      Array.from(statisticElements).forEach(element => {
        resizeObserver.observe(element);
      });
    }

    return () => resizeObserver.disconnect();
  }, [progressData]); // Re-run when progressData changes

  return (
    <>
      <Flex vertical={true} gap={"middle"} ref={containerRef}>
        <Text strong style={{fontSize: "16px"}}>Your Fitness Progress</Text>
        <Flex gap={gap} wrap="wrap">
          <Statistic
            title="Steps"
            value={progressData.steps}
            prefix={<GiBootPrints />}
          />
          <Statistic
            title="Calories Burned"
            value={progressData.caloriesBurned.toFixed(1)}
            prefix={<FireOutlined />}
            suffix="kcal"
          />
          <Statistic
            title="Distance"
            value={progressData.distance}
            prefix={<CompassOutlined />}
            suffix="km"
          />
        </Flex>
          <Text><TrophyOutlined /> Goals Achieved</Text>
          <List
            bordered
            size={"small"}
            dataSource={progressData.goalsAchieved}
            renderItem={(goal) => (
              <List.Item>
                {goal}
              </List.Item>
            )}
          />
      </Flex>
    </>
  );
}
  