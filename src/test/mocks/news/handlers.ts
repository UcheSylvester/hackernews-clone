import { rest } from "msw";
import { BASE_URL } from "../../../pages/home-page";
import { storiesIDs } from "./data";

const mockGetStories = () => {
  return storiesIDs.map((id) =>
    rest.get(`${BASE_URL}/item/${id}.json`, (req, res, ctx) => {
      return res(
        ctx.json({
          title: `Story ${id}`,
          type: "story",
          url: "test",
        })
      );
    })
  );
};

export const newsHandlers = [
  rest.get(`${BASE_URL}/topstories.json`, (req, res, ctx) => {
    return res(ctx.delay(500), ctx.json(storiesIDs));
  }),
  ...mockGetStories(),
];
