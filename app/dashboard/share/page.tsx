"use client";

import { useEffect, useState } from 'react';
import ProgressPreview from "@/app/components/ProgressPreview";
import SocialSharing from "@/app/components/SocialSharing";
import { callGet } from "@/util/util";
import { Servers } from "@/interfaces/api/interfaces";

function SharePage() {
  const [progressData, setProgressData] = useState({
    steps: 0,
    caloriesBurned: 0,
    distance: 0,
    goalsAchieved: ["Walk 10k steps", "Burn 400 calories"],
  });

  useEffect(() => {
    callGet({
      server: Servers.CORE,
      path: '/activity/'
    }).then(async (response) => {
      const data = await response.json();
      const sum = data
        .filter((v: any) => v.data.type === "WALKING")
        .map((x: any) => x.data.steps)
        .reduce((a: any, b: any) => a + b, 0);

      setProgressData({
        steps: sum,
        caloriesBurned: sum * 0.04,
        distance: Math.round(sum / 1400),
        goalsAchieved: ["Walk 10k steps", "Burn 400 calories"]
      });
    });
  }, []);

  const shareMessage = `
    🏋️ Fitness Progress:
    - Steps: ${progressData.steps}
    - Calories Burned: ${progressData.caloriesBurned}
    - Distance: ${progressData.distance} km
    - Goals Achieved: ${progressData.goalsAchieved.join(", ")}
  `;

  return (
    <>
      <h1>Share Your Progress</h1>
      
      <section>
        <h2>Progress Preview</h2>
        <ProgressPreview progressData={progressData} />
      </section>

      <section>
        <h2>Share Now</h2>
        <SocialSharing shareMessage={shareMessage} />
      </section>
    </>
  ); 
}

export default SharePage;
