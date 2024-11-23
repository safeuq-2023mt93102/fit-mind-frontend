"use client";
import { Button, message } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import {ProgressData} from "@/interfaces/app/interface";

interface SocialSharingProps {
  progressData: ProgressData;
  disabled?: boolean;
}

const SocialSharing: React.FC<SocialSharingProps> = ({ progressData, disabled }) => {
  const shareMessage = `
    🏋️ Fitness Progress:
    - Steps: ${progressData.steps}
    - Calories Burned: ${progressData.caloriesBurned}
    - Distance: ${progressData.distance} km
    - Goals Achieved: ${progressData.goalsAchieved.join(", ")}
  `.replace(/^ {4}/gm, '');

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Fitness Progress",
          text: shareMessage,
        });
        message.success('Progress shared successfully!');
      } catch (error) {
        if ((error as any).message === "Share canceled") {
          message.info('Share cancelled');
        } else {
          message.error('Error sharing progress');
          console.error("Error sharing:", error);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareMessage);
        message.success('Progress copied to clipboard!');
      } catch (error) {
        message.error('Failed to copy to clipboard');
        console.error("Error copying:", error);
      }
    }
  };

  return (
    <Button 
      type="primary" 
      icon={<ShareAltOutlined />} 
      onClick={handleShare}
      disabled={disabled}
    >
      Share Your Progress
    </Button>
  );
};

export default SocialSharing;