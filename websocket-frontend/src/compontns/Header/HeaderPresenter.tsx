import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export const Header: React.FC = ({ children }) => (
  <header>
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h5" color="primary">
          {children}
        </Typography>
      </Toolbar>
    </AppBar>
  </header>
);

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;
export const TypographyLink: React.FC = ({ children }) => (
  <StyledLink to="/">{children}</StyledLink>
);
