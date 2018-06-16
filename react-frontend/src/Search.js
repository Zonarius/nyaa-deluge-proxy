import React from 'react';

import { Field } from 'bloomer/lib/elements/Form/Field/Field';
import { Input } from 'bloomer/lib/elements/Form/Input';
import { Icon } from 'bloomer/lib/elements/Icon';
import { Control } from 'bloomer/lib/elements/Form/Control';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'
import { Button } from 'bloomer/lib/elements/Button';

export default class Search extends React.Component {
  state = { query: localStorage.query || "" }

  search = ev => {
    ev.preventDefault()
    console.log(ev)
  }

  save = ev => {
    localStorage.query = ev.target.value;
    this.setState({ query: ev.target.value })
  }

  render() {
    return (
      <form onSubmit={this.search}>
        <Field hasAddons>
          <Control hasIcons>
            <Input type="text" placeholder="Search" onChange={this.save} value={this.state.query} />
            <Icon isSize="small" isAlign="left">
              <FontAwesomeIcon icon={faSearch} />
            </Icon>
          </Control>
          <Control>
            <Button type="submit" isColor="info">Search</Button>
          </Control>
        </Field>
      </form>
    )
  }
}