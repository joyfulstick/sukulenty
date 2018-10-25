import styled from 'styled-components'

const Title = styled.div`
  margin: 0 1rem;
  text-align: center;
  transform: skew(-5deg) rotate(-1deg);
  margin-top: -3rem;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  h3 {
    background: ${props => props.theme.green};
    display: inline;
    line-height: 1.3;
    font-size: 4rem;
    color: white;
    padding: 0 1rem;
  }
`

export default Title
