import {
  ActivityApi,
  ActivityType,
  CyclingActivity,
  DistanceUnit,
  GetRequest,
  PostRequest,
  Servers,
  WalkingActivity
} from "@/interfaces/api/interfaces";
import {CORE_BE_URL, USERS_BE_URL} from "@/config/env";
import {signOut} from "next-auth/react";
import {ProgressData} from "@/interfaces/app/interface";

export function getBaseUrl(server: Servers) {
  switch (server) {
    case Servers.CORE:
      return CORE_BE_URL;
    case Servers.USERS:
      return USERS_BE_URL;
  }
}

export async function callGet(request: GetRequest) {
  return fetch("/api/get", {
    method: "POST",
    body: JSON.stringify(request)
  }).then((response): Response => {
    if (response.status == 401) {
      signOut();
    }
    return response;
  });
}

export async function callPost(request: PostRequest) {
  return fetch("/api/post", {
    method: "POST",
    body: JSON.stringify(request)
  }).then((response) => {
    if (response.status == 401) {
      signOut();
    }
    return response;
  });
}

function toKm(cycling: CyclingActivity) {
  switch (cycling.unit) {
    case DistanceUnit.KILOMETRES:
      return cycling.distance;
    case DistanceUnit.MILES:
      return cycling.distance * 1.609;
    case DistanceUnit.METRES:
      return cycling.distance / 1000;
    case DistanceUnit.FEET:
      return cycling.distance / 3281;
    case DistanceUnit.INCHES:
      return cycling.distance / 39370;
  }
}

function getGoalsAchieved(steps: number, caloriesBurned: number) {
  let goalsAchieved: string[] = [];
  const step10K = Math.floor(steps / 1e4);
  if (step10K > 0) {
    goalsAchieved.push(`Walk ${step10K * 10}k steps`)
  }
  const calories100 = Math.floor(caloriesBurned / 100);
  if (calories100 > 0) {
    goalsAchieved.push(`Burn ${calories100 * 100} calories`)
  }
  return goalsAchieved;
}

export function stepProgressData(steps: number) {
  const caloriesBurned: number = steps * 0.04;
  return {
    steps: steps,
    caloriesBurned: caloriesBurned,
    distance: +(steps / 1400).toFixed(2),
    goalsAchieved: getGoalsAchieved(steps, caloriesBurned),
  };
}

export function toProgressData(activity: ActivityApi): ProgressData | undefined {
  if (activity) {
    switch (activity.data.type) {
      case ActivityType.WALKING: {
        let walking: WalkingActivity
          = activity.data as WalkingActivity;
        const steps: number = walking.steps;
        return stepProgressData(steps);
      }
      case ActivityType.CYCLING: {
        let cycling
          = activity.data as CyclingActivity;
        const distance: number = toKm(cycling)
        const steps: number = Math.round(distance * 1400);
        return stepProgressData(steps);
      }
    }
  }
}