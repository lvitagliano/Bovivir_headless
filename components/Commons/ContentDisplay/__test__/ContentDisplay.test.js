import React from 'react';
import ReactDOM from 'react-dom';
import Article from "../Article";
import ContentDisplay from "../index";
import {render,cleanup} from "@testing-library/react";
import renderer from "react-test-renderer";
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import theme from "../../../../Styles/themes/main";

afterEach(cleanup);

const articles = [{
      title: 'Titulo item 1',
      label:'label 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://images.pexels.com/photos/3019019/pexels-photo-3019019.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      link:{label:'Link Test 1',href:'/test_link1'}
    },
    {
      title: 'Titulo item 2',
      label:'label 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://images.pexels.com/photos/3019019/pexels-photo-3019019.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      link:{label:'Link Test2',href:'/test_link2'}
    },
    {
      title: 'Titulo item 3',
      label:'label 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://images.pexels.com/photos/3019019/pexels-photo-3019019.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
      link:{label:'Link Test 3',href:'/test_link3'}
    }
    ];

afterEach(cleanup);

it("renders without problems", () => {
  const div = document.createElement("div");
  ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ContentDisplay 
      title="Main Title"
      description= "This is a description of the component"
      articles={articles}/> 
 </ThemeProvider>
 ,div);
});

it("renders correctly", () => {
  const domElem = render(
    <ThemeProvider theme={theme}>
      <ContentDisplay 
        title="Main Title"
        description= "This is a description of the component"
        articles={articles}/> 
    </ThemeProvider>
    );
  
  expect(domElem.getByTestId('_title')).toBeInTheDocument();;
  expect(domElem.getByText("This is a description of the component")).toBeInTheDocument();
  expect(domElem.getByTestId('_btn1')).toBeInTheDocument();
  expect(domElem.getByTestId('_btn2')).toBeInTheDocument();
});

it("matches snapshot Article", () => {
  const elem = renderer.create(
    <ThemeProvider theme={theme}>
      <ContentDisplay 
        title="Main Title"
        description= "This is a description of the component"
        articles={articles}/> 
    </ThemeProvider>
  );
  expect(elem).toMatchSnapshot();
});

