"use client";

import { useEffect, useState } from 'react';
import SocialSharing from "@/app/components/SocialSharing";
import { callGet } from "@/util/util";

interface ProgressData {
  steps: number;
  caloriesBurned: number;
  distance: number;
  goalsAchieved: string[];
}

interface ProgressPreviewProps {
  progressData: ProgressData;
}

export default function ProgressPreview({ progressData } : ProgressPreviewProps)  {
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}>
      <h3>Your Fitness Progress</h3>
      <p><strong>Steps:</strong> {progressData.steps}</p>
      <p><strong>Calories Burned:</strong> {progressData.caloriesBurned}</p>
      <p><strong>Distance:</strong> {progressData.distance} km</p>
      <strong>Goals Achieved:</strong>
      <ul>
        {progressData.goalsAchieved.map((goal, index) => (
          <li key={index}>{goal}</li>
        ))}
      </ul>
    </div>
  );
};
  