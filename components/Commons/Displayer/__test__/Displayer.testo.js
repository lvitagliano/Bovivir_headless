import React from 'react';
import ReactDOM from 'react-dom';
import Displayer from "../index";
import {render,cleanup} from "@testing-library/react";
import renderer from "react-test-renderer";
import '@testing-library/jest-dom';
import {Paper,Button,Grid} from "@material-ui/core";

const items = [
  {title: 'Titulo item 1'},
  {title: 'Titulo item 2'},
  {title: 'Titulo item 3'},
  {title: 'Titulo item 4'},
  {title: 'Titulo item 5'},
  {title: 'Titulo item 6'},
  {title: 'Titulo item 7'},
];

    const innerComp = items.map((item, i) => 
        <Paper key={i} elevation={3}>
            <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="center"
            >
                <Grid item><div  style={{width:"240px",height:"320px"}}>{item.title}</div></Grid>
                <Grid item><Button>TEST</Button></Grid>
            </Grid>
        </Paper>
    );

afterEach(cleanup);

it("renders without problems", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Displayer>{innerComp}</Displayer>,div);
});

it("matches snapshot", () => {
  const elem = renderer.create(<Displayer>{innerComp}</Displayer>)
  expect(elem).toMatchSnapshot();
});

