import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from "../index";
import {render,cleanup} from "@testing-library/react";
import renderer from "react-test-renderer";
import '@testing-library/jest-dom';

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
  ReactDOM.render(<Carousel items={items}/>,div);
});

it("renders without items", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Carousel/>,div);
});

it("matches snapshot without navegation", () => {
  const elem = renderer.create(<Carousel items={items}/>)
  expect(elem).toMatchSnapshot();
});

it("matches snapshot with arrows", () => {
  const elem = renderer.create(<Carousel items={items} arrow={true}/>)
  expect(elem).toMatchSnapshot();
});

it("matches snapshot with circle steps", () => {
  const elem = renderer.create(<Carousel items={items} steps='circle'/>)
  expect(elem).toMatchSnapshot();
});

it("matches snapshot with button steps", () => {
  const elem = renderer.create(<Carousel items={items} steps='button'/>)
  expect(elem).toMatchSnapshot();
});

it("matches snapshot with arrows and circle steps", () => {
  const elem = renderer.create(<Carousel items={items} arrow={true} steps='circle'/>)
  expect(elem).toMatchSnapshot();
});

it("matches snapshot with arrows and button steps", () => {
  const elem = renderer.create(<Carousel items={items} arrow={true} steps='button'/>)
  expect(elem).toMatchSnapshot();
});

