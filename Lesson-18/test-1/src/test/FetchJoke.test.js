import React from "react";
import renderer from "react-test-renderer";
import FetchJoke from "../components/FetchJoke.js";

const successResult = {
  type: "single",
  joke: "What do you call a fish wearing a bowtie? Sofishticated.",
};
const failResult = {
  error: true,
  message: "Something went wrong",
};
const getSuccess = jest.fn(() => Promise.resolve(successResult));
const getFail = jest.fn(() => Promise.reject(failResult));

// FetchJoke.test.js
it("renders correctly", async () => {
  const tree = renderer.create(<FetchJoke />);
  expect(tree).toMatchSnapshot();

  const button = tree.root.findByType(Button); // Menggunakan komponen Button
  await button.props.onPress();

  expect(tree).toMatchSnapshot();
  expect(getSuccess).toHaveBeenCalled();
});

it("renders error message", async () => {
  const tree = renderer.create(<FetchJoke />);
  expect(tree).toMatchSnapshot();

  const button = tree.root.findByType(Button); // Menggunakan komponen Button
  await button.props.onPress();

  expect(tree).toMatchSnapshot();
  expect(getFail).toHaveBeenCalled();
});
