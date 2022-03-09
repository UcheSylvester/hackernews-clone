import { setupServer } from "msw/node";
import { newsHandlers } from "./news/handlers";

const handlers = [...newsHandlers];

export const server = setupServer(...handlers);
