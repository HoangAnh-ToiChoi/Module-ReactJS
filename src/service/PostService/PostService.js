import http, { httpClient } from "~/utils/http";

export const getFeed = async (params = {}) => {
  try {
    const response = await http.get("/api/posts/feed", {
      params: {
        type: "for_you",
        ...params,
      },
    });
    return response;
  } catch (e) {
    throw e;
  }
};
