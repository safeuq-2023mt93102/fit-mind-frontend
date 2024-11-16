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