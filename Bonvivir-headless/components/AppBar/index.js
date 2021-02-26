import React,{useState,useEffect,memo} from 'react';
import { Paper } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {NavBar} from './styles'
import Tab from "./Tab";

const LEFT = 'LEFT';
const RIGHT = 'RIGHT';

function AppBar({tabs}) {
  const [maxItems,setMaxItems] = useState(tabs.length);
  const [indexes, setIndexes] = useState({left:0,right:maxItems});
  const [refs, setRefs] = useState([]);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() =>{
    if(refs.length && firstRender){
      setMaxItems(refs.length);
      setIndexes({...indexes,right:indexes.left+refs.length});
      setFirstRender(false);
    }
  },[])

  const handleArrowClick = (type) => {
    if(type===LEFT && tabs[indexes.left-1]){
      setIndexes({left:indexes.left-1,right:indexes.right-1});
    }
    
    if(type===RIGHT && tabs[indexes.right+1]){
      setIndexes({left:indexes.left+1,right:indexes.right+1});
    }
  }

  return (
    <Paper square elevation={2} style={{marginTop:'65px',width:'100%', position:'absolute',top: 0 }}>
        <NavBar id="menu">
            {<ChevronLeftIcon onClick={() => {handleArrowClick(LEFT)}} className="arrow-left" style={{visibility:`${tabs[indexes.left-1] ? 'visible':'hidden'}`}}/>}
            <ul className="main-menu cf">
              {tabs.length>0 && 
              tabs.map( (tab,i) => {
                if(indexes.left <= i && i < indexes.right)
                  return <Tab key={i} tab={tab} index={i} setRefs = {setRefs}/>
              })}
            </ul>
            {<ChevronRightIcon onClick={() => {handleArrowClick(RIGHT)}} className="arrow-right" style={{visibility:`${tabs[indexes.right+1] ? 'visible':'hidden'}`}}/>}
        </NavBar>
    </Paper>
  );
}

AppBar.defaultProps = {
  tabs: [],
}

export default memo(AppBar)
