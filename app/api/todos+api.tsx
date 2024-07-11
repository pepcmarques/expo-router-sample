import { ExpoRequest, ExpoResponse } from "expo-router/server";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function GET(request: ExpoRequest) {
  const token = await request.headers.get("Authorization");

  const response = await fetch(`${API_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    return ExpoResponse.json(
      { error: data.message },
      { status: response.status }
    );
  }

  return ExpoResponse.json(data);
}
