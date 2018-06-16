import React, { Component } from 'react';
import { Container } from 'bloomer/lib/layout/Container';
import { Title } from 'bloomer/lib/elements/Title';
import Search from './Search';
import Torrents from './Torrents';
import { Section } from 'bloomer/lib/layout/Section';

export default class App extends Component {
  state = {}
  render() {
    return (
      <Section>
        <Container>
          <Title>Nyaa.si</Title>
          <Search onSearch={torrents => this.setState({ torrents })} />
          <Torrents data={this.state.torrents} />
        </Container>
      </Section>
    )
  }
}
