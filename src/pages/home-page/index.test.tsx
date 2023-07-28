import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from ".";

describe("HomePage", () => {
  it("shows pagination and fetches stories once story ids are available", async () => {
    render(<HomePage />);
    expect(screen.getByText("HACKER NEWS")).toBeInTheDocument();

    // it should show loading message
    const loading = screen.getByText("Loading...");
    expect(loading).toBeInTheDocument();
    expect(screen.queryByText("1")).not.toBeInTheDocument();

    // wait for the loading message to be removed
    // await waitForElementToBeRemoved(loading);

    // it should show pagination and buttons
    const pagination = screen.getByRole("navigation");
    expect(pagination).toBeInTheDocument();
    const navigationButtons = screen.getAllByRole("button");
    expect(navigationButtons).toHaveLength(2);

    // it should show stories
    const stories = await screen.findAllByRole("article");
    expect(stories).toHaveLength(20);
    const firstStory = stories[0];
    expect(firstStory).toHaveTextContent("Story 1");

    const secondButton = navigationButtons[1];

    // user clicks on the second button to load the next page
    userEvent.click(secondButton);

    await waitForElementToBeRemoved(screen.queryByText("Loading..."));

    // it should show the next page of stories
    const secondPageStories = await screen.findAllByRole("article");
    expect(secondPageStories).toHaveLength(1);
    expect(secondPageStories[0]).toHaveTextContent("Story 21");
  });
});
