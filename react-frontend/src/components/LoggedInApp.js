import React from 'react';
import { Container } from 'bloomer/lib/layout/Container';
import { Title } from 'bloomer/lib/elements/Title';
import Search from './Search';
import Torrents from './Torrents';
import { Section } from 'bloomer/lib/layout/Section';
import { toPath } from '../api';



export default class LoggedInApp extends React.Component {
  state = {
    torrents: []
  }

  handleSearch = async torrents => {
    for (const torrent of torrents) {
      torrent.path = await toPath(torrent.name)
    }
    this.setState({ torrents })
  }

  render() {
    return (
      <Section>
        <Container>
          <Title>Nyaa.si</Title>
          <Search onSearch={this.handleSearch} />
          <Torrents data={this.state.torrents} />
        </Container>
      </Section>
    )
  }
}
