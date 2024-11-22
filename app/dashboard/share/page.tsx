"use client";

import ProgressPreview from "@/app/components/ProgressPreview";
import SocialSharing from "@/app/components/SocialSharing";

function SharePage() {
  const progressData = {
        steps: 12000,
    caloriesBurned: 500,
    distance: 8.5, // in kilometers
    goalsAchieved: ["Walk 10k steps", "Burn 400 calories"],
  };

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
      
      {/* Progress Preview Component */}
      <section>
        <h2>Progress Preview</h2>
        <ProgressPreview />
      </section>

      {/* Social Sharing Component */}
      <section>
        <h2>Share Now</h2>
        <SocialSharing shareMessage={shareMessage} />
      </section>
    </>
  ); 
}

export default SharePage;
