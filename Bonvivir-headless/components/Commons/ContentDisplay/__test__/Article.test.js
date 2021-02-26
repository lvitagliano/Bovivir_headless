import React from 'react';
import ReactDOM from 'react-dom';
import Article from "../Article";
import {render,cleanup} from "@testing-library/react";
import renderer from "react-test-renderer";
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import theme from "../../../../Styles/themes/main";

afterEach(cleanup);

const article = {
    title: 'Titulo item 1',
    label:'Bonvivir',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://images.pexels.com/photos/3019019/pexels-photo-3019019.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
    link:{label:'Link Test',href:'/test_link'}
};

afterEach(cleanup);

it("renders without problems", () => {
  const div = document.createElement("div");
  ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Article article={article}/>
 </ThemeProvider>
 ,div);
});

it("renders correctly", () => {
  const domElem = render(
    <ThemeProvider theme={theme}>
       <Article article={article}/>
    </ThemeProvider>
    );
  expect(domElem.getByTestId("subtitle")).toBeInTheDocument();
  domElem.getByText("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
  expect(domElem.getByTestId("link")).toHaveAttribute('href',"/test_link");
});

it("matches snapshot Article", () => {
  const elem = renderer.create(
  <ThemeProvider theme={theme}>
    <Article article={article}/>
 </ThemeProvider>
 );
  expect(elem).toMatchSnapshot();
});

