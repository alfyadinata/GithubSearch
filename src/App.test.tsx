import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import App from "./App";
// import Api from "./utils/Api";

// jest.mock("./utils/Api");

describe("App", () => {
  // test("renders App component", () => {
  //   render(<App />);
  // });

  // test("searches users and displays them", async () => {
  //   const mockResponse = {
  //     data: {
  //       items: [
  //         { login: "user1", html_url: "https://github.com/user1" },
  //         { login: "user2", html_url: "https://github.com/user2" },
  //       ],
  //     },
  //     status: 200,
  //     statusText: "OK",
  //     headers: {},
  //   };

  //   (Api.get as jest.Mock).mockResolvedValueOnce(mockResponse);

  //   render(<App />);

  //   const searchInput = screen.getByLabelText("Enter a username");
  //   fireEvent.change(searchInput, { target: { value: "john" } });

  //   const searchButton = screen.getByRole("button", { name: "Search" });
  //   fireEvent.click(searchButton);

  //   await waitFor(() => expect(screen.queryByRole("progressbar")).toBeNull());

  //   expect(screen.getByText("user1")).toBeInTheDocument();
  //   expect(screen.getByText("user2")).toBeInTheDocument();
  // });

  // test("displays error message for empty search query", () => {
  //   render(<App />);

  //   const searchButton = screen.getByRole("button", { name: "Search" });
  //   fireEvent.click(searchButton);

  //   expect(screen.getByText("Please enter a username.")).toBeInTheDocument();
  // });

  // test("displays error message for API error", async () => {
  //   const errorMessage = "Error searching users. Please try again later.";
  //   (Api.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

  //   render(<App />);

  //   const searchInput = screen.getByLabelText("Enter a username");
  //   fireEvent.change(searchInput, { target: { value: "john" } });

  //   const searchButton = screen.getByRole("button", { name: "Search" });
  //   fireEvent.click(searchButton);

  //   await waitFor(() => expect(screen.queryByRole("progressbar")).toBeNull());

  //   expect(screen.getByText(errorMessage)).toBeInTheDocument();
  // });
});
