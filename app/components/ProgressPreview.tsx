"use client";

import { useState } from "react";

interface ProgressPreviewProps {
    progressData: {
        steps: number;
        caloriesBurned: number;
        distance: number;
        goalsAchieved: string[];
    };
}

  const ProgressPreview: React.FC = () => {

const [progressData, setProgressData] = useState({
    steps: 12000,
    caloriesBurned: 500,
    distance: 8.5, // in kilometers
    goalsAchieved: ["Walk 10k steps", "Burn 400 calories"],
  });

  fetch("/api/get", {
    method: "POST",
    body: JSON.stringify({
      path: '/activity/',
    })
  }).then((listActivity) => {

    listActivity.json().then((data) => {
      const sum = data
      .filter((v:any) => v.data.type === "WALKING")
      .map((x:any) => x.data.steps)
    .reduce((a:any, b:any) => a + b, 0);
    setProgressData(prev => ({
      ...prev,
      steps: sum ,
      caloriesBurned:sum*0.04,
      distance:Math.round(sum/1400),
      goalsAchieved: ["Walk 10k steps", "Burn 400 calories"]
    }));
  });
  
});

    return (
      <div style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}>
        <h3>Your Fitness Progress</h3>
        <p><strong>Steps:</strong> {progressData.steps}</p>
        <p><strong>Calories Burned:</strong> {progressData.caloriesBurned}</p>
        <p><strong>Distance:</strong> {progressData.distance} km</p>
        <p>
          <strong>Goals Achieved:</strong>
          <ul>
            {progressData.goalsAchieved.map((goal, index) => (
              <li key={index}>{goal}</li>
            ))}
          </ul>
        </p>
      </div>
    );
  };
  
  export default ProgressPreview;
  