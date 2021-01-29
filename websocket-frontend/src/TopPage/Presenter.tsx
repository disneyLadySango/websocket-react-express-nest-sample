import styled from 'styled-components'

import Header from '../compontns/Header'

const StyledContents = styled.ul`
  padding: 40px 10% 120px;
`
export const TopPage: React.FC = ({ children }) => (
  <div>
    <Header title={'ソケット通信サンプルリンク'} />
    <StyledContents>
      {children}
    </StyledContents>
  </div>
)

const StyledList = styled.li`
  margin: 40px 0;
  text-align: left;
`
export const Link: React.FC = ({ children }) => (
  <StyledList>
    {children}
  </StyledList>
)