import React from 'react';
import ReactDOM from 'react-dom';
import CarouselFixedText from "../index";
import {render,cleanup} from "@testing-library/react";
import renderer from "react-test-renderer";
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import theme from "../../../../Styles/themes/main";


const items = [
  {
      title: 'Titulo item 1',
      label:'item 1',
      description: 'Este es el item 1',
      image:''
  },
  {
      title: 'Titulo item 2',
      label:'item 2',
      description: 'Este es el item 2',
      image:''
  },
  {
      title: 'Titulo item 3',
      label:'item 3',
      description: 'Este es el item 3',
      image:''
  },
  {
      title: 'Titulo item 4',
      label:'item 4',
      description: 'Este es el item 4',
      image:''
  }
];

afterEach(cleanup);

it("renders without problems", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ThemeProvider theme={theme}>
                    <CarouselFixedText items={items}/>
                  </ThemeProvider>,div);
});

it("renders without items", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ThemeProvider theme={theme}>
                      <CarouselFixedText/>
                  </ThemeProvider>,div);
});

it("matches snapshot without navegation", () => {
  const elem = renderer.create( <ThemeProvider theme={theme}>
                                  <CarouselFixedText items={items}/>
                                </ThemeProvider>)
  expect(elem).toMatchSnapshot();
});

it("matches snapshot with arrows", () => {
  const elem = renderer.create(<ThemeProvider theme={theme}>
                                  <CarouselFixedText items={items} arrow={true}/>
                              </ThemeProvider>)
  expect(elem).toMatchSnapshot();
});

it("matches snapshot with circle steps", () => {
  const elem = renderer.create(<ThemeProvider theme={theme}>
                                  <CarouselFixedText items={items} steps='circle'/>
                                </ThemeProvider>)
  expect(elem).toMatchSnapshot();
});

it("matches snapshot with button steps", () => {
  const elem = renderer.create(<ThemeProvider theme={theme}>
                                  <CarouselFixedText items={items} steps='button'/>
                                </ThemeProvider>)
  expect(elem).toMatchSnapshot();
});

it("matches snapshot with arrows and circle steps", () => {
  const elem = renderer.create(<ThemeProvider theme={theme}>
                                  <CarouselFixedText items={items} arrow={true} steps='circle'/>
                                </ThemeProvider>)
  expect(elem).toMatchSnapshot();
});

it("matches snapshot with arrows and button steps", () => {
  const elem = renderer.create(<ThemeProvider theme={theme}>
                                  <CarouselFixedText items={items} arrow={true} steps='button'/>
                                </ThemeProvider>)
  expect(elem).toMatchSnapshot();
});

