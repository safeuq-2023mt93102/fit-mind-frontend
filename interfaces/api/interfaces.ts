export enum Servers {
  USERS = "users-be",
  CORE = "core-be"
}

export interface Request {
  server: Servers,
  path: string,
}

export interface GetRequest extends Request {}

export interface PostRequest extends Request {
  payload: any
}

export interface Activity {
  id: string,
  created: string,
  type: ActivityType,
  details: string,
  key: number
}

export interface ActivityInput {
  walkingSteps: number,
  cyclingDistance: number,
  cyclingUnit: string
}

export interface ErrorResponse {
  type: string,
  message: string,
  metadata: any
}

export interface ActivityApi {
  id: string,
  created: number,
  data: ActivityMetadata,
  source: ActivitySource
}

export interface ActivityMetadata {
  type: ActivityType;
}

export interface WalkingActivity extends ActivityMetadata {
  steps: number;
}

export interface CyclingActivity extends ActivityMetadata {
  distance: number;
  unit: DistanceUnit;
}

export interface HeartRateActivity extends ActivityMetadata {
}

export interface SleepActivity extends ActivityMetadata {
  steps: number;
}

export interface CaloriesActivity extends ActivityMetadata {
  steps: number;
}

export interface ActivitySource {
  type: SourceType;
  provider: SourceProvider | null;
}

export enum SourceType {
  INTEGRATION,
  MANUAL
}

export enum DistanceUnit {
  KILOMETRES = "KILOMETRES",
  METRES = "METRES",
  MILES = "MILES",
  INCHES = "INCHES",
  FEET = "FEET",
}

export enum ActivityType {
  WALKING = "WALKING",
  CYCLING = "CYCLING",
  CALORIES_BURNED = "CALORIES_BURNED",
  SLEEP = "SLEEP",
  HEART_RATE = "HEART_RATE",
}

export enum SourceProvider {
  FITBIT = "FITBIT",
  GOOGLE_FIT = "GOOGLE_FIT",
  SAMSUNG_HEALTH = "SAMSUNG_HEALTH",
  APPLE_HEALTH = "APPLE_HEALTH",
  MI_FIT = "MI_FIT",
  REALME_LINK = "REALME_LINK"
}

export interface Workout {
  day: string,
  goals: string[]
}

export interface Goal {
  id: string,
  day: Date,
  completed: boolean,
  data: GoalData
}

export interface GoalData {
  type: string,
  sets: number,
  repetitions: number,
  duration: string,
  exercise: string
}