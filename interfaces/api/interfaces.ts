export interface GetRequest {
  path: string,
}

export interface PostRequest {
  path: string,
  payload: any
}

export interface Activity {
  id: string,
  type: string,
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