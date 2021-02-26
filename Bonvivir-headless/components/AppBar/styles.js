
import styled from "styled-components";


export const NavBar = styled.nav`
  width: 100%;
  height:45px;
  display:flex;
  justify-content: space-between;

  & .arrow-left {
    cursor: pointer;
    margin-left: 20px;
    margin-top: 10px;
  }

  & .arrow-right {
    cursor: pointer;
    margin-right: 20px;
    margin-top: 10px;
  }

  & ul {
    margin: 0;
    padding: 0;
    display:inline-block;
  }

  & .main-menu {
    display:none;
    margin:auto;
    z-index:3;
  }
  
  & input[type="checkbox"], ul span.drop-icon {
    margin-left:5px;
    display:none;
  }

  & li, .sub-menu {
    border-style: solid;
    border-color: rgba(0, 0, 0, .05);
    cursor:pointer;
  }

  & .sub-menu {
    background-color: white;
    border-width: 1px 1px 0;
    margin: 0 1em;
    border-radius: 10px 10px 10px 10px;
    -moz-border-radius: 10px 10px 10px 10px;
    -webkit-border-radius: 10px 10px 10px 10px;
    border: 0px solid #000000;
    -webkit-box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 20px -3px rgba(0,0,0,0.75);

    transition: all .125s ease-in-out;
    -webkit-transition: all .125s ease-in-out;
   
  }

  & .sub-menu li:last-child {
    border-width: 0;
  }

  &  li, a {
    position: relative;
    display: block;
    color: #7a7879;
    text-shadow: 1px 1px 0 rgba(0, 0, 0, .125);
    white-space:nowrap;
  }

  & li a:hover{
    color: #762057;
  }

  & a {
    padding: 0.8em 1.5em;
    text-decoration: none;
  }

  & .sub-menu li:first-child:hover {
    color: #762057;
    background-color: #EEE;
    border-radius: 10px 10px 0px 0px;
  }

  & .sub-menu li:last-child:hover {
    color: #762057;
    background-color: #EEE;
    border-radius: 0px 0px 10px 10px;
  }

  & .sub-menu li:not(first-child):not(last-child):hover {
    color: #762057;
    background-color: #EEE;
  }

  & .sub-menu {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.2s linear;
    display:block;
  }

  & input[type="checkbox"]:checked + .sub-menu {
    visibility: visible;
    opacity: 1;
  }
 

  & .sub-menu a:hover {
    color: #762057;
  }

  & li label.drop-icon {
    position: absolute;
    right: 0;
    top: 0;
  }

  & label.drop-icon{
    padding: 1em;
    font-size: 1em;
    text-align: center;
    background-color: rgba(0, 0, 0, .125);
    text-shadow: 0 0 0 transparent;
    color: rgba(255, 255, 255, .75);
  }

    @media only screen and (min-width: 1024px) {
      & .main-menu {
        display: inline-flex;
        margin:auto;
      }

      & label.drop-icon {
        display: none;
        margin-left:5px;
        & .display-left {
          transform: translateX(-200%);
        }
      }

      & ul span.drop-icon {
        display: inline-block;
      }

      & li {
        float: left;
        border-width: 0 0px 0 0;
      }

      & .sub-menu li {
        float: none;
      }

      & .sub-menu {
        border-width: 0;
        margin: 0;
        position: absolute;
        top: 100%;
        left: 0;
        min-width: 12em;

        & .display-left {
          transform: translateX(-200%);
        }
      }
      

      & .sub-menu, input[type="checkbox"]:checked + .sub-menu {
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.2s linear;
      }

      & .sub-menu li {
        border-width: 0 0 1px;
      }

      & .sub-menu .sub-menu {
        top: 0;
        left: 100%;
      }

      & .sub-menu .drop-icon {
        position: absolute;
        top: 0;
        right: 0;
        padding: 1em;
      }

      & li:hover > input[type="checkbox"] + .sub-menu {
        visibility: visible;
        opacity: 1;
      }
    }


`