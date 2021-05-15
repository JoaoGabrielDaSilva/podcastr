import React from 'react';
import {format} from 'date-fns'
import {ptBR} from 'date-fns/locale'

import { Container, Text, CurrentDate } from './styles';

const Header: React.FC = () => {

  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {locale: ptBR})

  return <Container>
    <img src="/logo.svg" alt=""/>
    <Text>O melhor para você ouvir, sempre</Text>
    <CurrentDate>{currentDate}</CurrentDate>
  </Container>;
}

export default Header;