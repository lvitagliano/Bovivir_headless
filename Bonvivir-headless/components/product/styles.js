import styled from "styled-components"

const StyledCucarda = styled.div.attrs((props)=>({
    // className: props.className,
    children: props.text
}))`
    background-color: ${({colour})=> colour};
    width: ${({width})=> width};
    height: ${({height})=> height};
    position: ${({position})=> position};
    left: ${({left})=> left};
    top: ${({top})=> top};
    border-radius: ${({borderRadius})=> borderRadius};
    font-weight: ${({fontWeight})=> fontWeight};
    font-size: 0.9em;
    color: white;
    text-align: center;
    border-left: ${({borderLeft})=> borderLeft};
    &.oferta{
        clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);
    }

    &.dosxuno {
        clip-path: circle(50% at 50% 50%);
        font-size: 0.9em;
        display: flex;
        justify-content: center;
        
        flex-wrap: wrap;
    }

`


const CustomCucarda = ({text, ...props}) => <StyledCucarda {...props} >
    {text}
</StyledCucarda>


export {
    StyledCucarda,
    CustomCucarda
}