import styled from 'styled-components'

const PaginationStyles = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;
  border: 1px solid ${props => props.theme.lightgrey};
  border-radius: 10px;
  @media (max-width: 700px) {
    width: 100%;
  }
  & > * {
    margin: 0;
    padding: 15px 30px;
    border-right: 1px solid ${props => props.theme.lightgrey};
    @media (max-width: 700px) {
      padding: 5px 10px;
    }
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    filter: grayscale(1) opacity(0.2);
    pointer-events: none;
  }
`

export default PaginationStyles
