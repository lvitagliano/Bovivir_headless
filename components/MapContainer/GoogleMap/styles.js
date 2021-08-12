import styled from 'styled-components'

const Container = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  height: ${props => props.heightContainer || '500px'};
`

const ColumnOne = styled.div`
  width: 30%;
  background-color: blue;
`
const ColumnTwo = styled.div`
  width: 30%;
  background-color: red;
`

export { Container, ColumnOne, ColumnTwo }
