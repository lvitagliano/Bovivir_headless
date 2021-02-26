import React,{useEffect,useState} from 'react';
import DropDown from "./DropDown";
import { useRouter } from 'next/router';


const Tab = ({tab,idx,setRefs}) => {
    const [ref, setRef] = useState(null)
    const [visible, setVisible] = useState(true);
    const router = useRouter();

  
    const handleClick = (tab) => {
      if(tab.href && tab.as)
        router.push(tab.href,tab.as,{shallow:true})
    }

    useEffect(() => {
      if(ref){
        if(ref.getBoundingClientRect().right<window.innerWidth+20){
           setRefs(prevRefs => ([...prevRefs,ref]));
        }
        else{
          setVisible(false);
        }
      }
    },[ref,setRefs,setVisible])
  
    if(visible && tab){
      return (
        <li ref={setRef} className='tab' onClick= {() => handleClick(tab)}>
          {!tab.items && <a href={tab.href ? tab.href: ''}>{tab.text}</a>}
          {tab.items && 
            <>
              <a href="">{tab.text}
                <span className="drop-icon">▾</span>
                <label title="Toggle Drop-down" className="drop-icon" for='sm'>▾</label>
              </a>
              <input type="checkbox" id='sm'/>
              <DropDown items={tab.items} index={idx*100}/>
            </>
          }
  
        </li>
      )
    }
  
    return null;
  }

export default Tab;