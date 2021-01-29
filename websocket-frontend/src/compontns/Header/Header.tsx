import React from 'react';

import * as Presenter from './Presenter'
import * as Types from './type'

const Header: React.FC<Types.Props> = ({ title }) => (
  <Presenter.Header>
    <Presenter.TypographyLink>{title}</Presenter.TypographyLink>
  </Presenter.Header>
)
export default Header
