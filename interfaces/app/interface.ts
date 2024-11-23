import {ActivityApi, ActivityType} from "@/interfaces/api/interfaces";

export interface Activity {
  key: number,
  id: string,
  created: string,
  type: ActivityType,
  message: string,
  apiData: ActivityApi
}

export interface ActivityInput {
  walkingSteps: number,
  cyclingDistance: number,
  cyclingUnit: string
}

export interface ProgressData {
  steps: number,
  caloriesBurned: number,
  distance: number,
  goalsAchieved: string[]
}