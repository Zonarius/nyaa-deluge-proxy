import React from 'react';
import { Container } from 'bloomer/lib/layout/Container';
import { Title } from 'bloomer/lib/elements/Title';
import Search from './Search';
import Torrents from './Torrents';
import { Section } from 'bloomer/lib/layout/Section';
import { torrent } from '../mockdata';

export default class LoggedInApp extends React.Component {
  state = {}
  render() {
    return (
      <Section>
        <Container>
          <Title>Nyaa.si</Title>
          <Search onSearch={torrents => this.setState({ torrents })} />
          <Torrents data={torrent} />
        </Container>
      </Section>
    )
  }
}
