import { API_BASE_URL } from "../constants/config";

/**
 * Generic response checker for fetch requests
 * @param res Response object from fetch
 * @returns Parsed JSON if response is ok, or rejected promise with error
 */
function checkResponse<T>(res: Response): Promise<T> {
  if (res.ok) return res.json();
  return Promise.reject(`Error: ${res.status}`);
}

/**
 * Challenge object with normalized ID
 * MongoDB returns _id, but we normalize to id for consistency
 */
export type Challenge = {
  id: string;
  title: string;
  difficulty: string;
  prompt?: string;
};

/**
 * Raw challenge object as returned from API
 * Used for internal response handling
 */
type ChallengeResponse = {
  _id?: string;
  id?: string;
  title: string;
  difficulty: string;
  prompt?: string;
};

/**
 * Normalize challenge data from API response
 * Ensures consistent id field regardless of API response format
 * Prioritizes _id (MongoDB format) then falls back to id
 * @throws Error if no ID is present
 */
function normalizeChallenge(data: ChallengeResponse): Challenge {
  const id = data._id || data.id;
  if (!id) {
    throw new Error("Challenge missing required ID field (_id or id)");
  }
  return {
    id,
    title: data.title,
    difficulty: data.difficulty,
    prompt: data.prompt,
  };
}

/**
 * Fetch all challenges from the API
 */
export function getChallenges(): Promise<Challenge[]> {
  return fetch(`${API_BASE_URL}/challenges`)
    .then((res) => checkResponse<ChallengeResponse[]>(res))
    .then((data) => data.map(normalizeChallenge));
}

/**
 * Fetch a single challenge by ID
 * @param id Challenge ID (works with both MongoDB _id and regular id)
 */
export function getChallengeById(id: string): Promise<Challenge> {
  return fetch(`${API_BASE_URL}/challenges/${id}`)
    .then((res) => checkResponse<ChallengeResponse>(res))
    .then(normalizeChallenge);
}