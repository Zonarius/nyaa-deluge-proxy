import React from 'react';

import { Field } from 'bloomer/lib/elements/Form/Field/Field';
import { Input } from 'bloomer/lib/elements/Form/Input';
import { Icon } from 'bloomer/lib/elements/Icon';
import { Control } from 'bloomer/lib/elements/Form/Control';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'
import { Button } from 'bloomer/lib/elements/Button';

import * as api from '../api';

export default class Search extends React.Component {
  state = {
    query: localStorage.query || "",
    loading: false
  }

  componentDidMount() {
    this.search();
  }

  search = async ev => {
    if (ev) {
      ev.preventDefault()
    }

    if (!this.state.loading) {
      this.setState({ loading: true })
      try {
        const data = await api.search(this.state.query)
        if (typeof this.props.onSearch === 'function') {
          this.props.onSearch(data)
        }
      } finally {
        this.setState({ loading: false })
      }
    }
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
            <Input name="q" type="text" placeholder="Search" onChange={this.save} value={this.state.query} />
            <Icon isSize="small" isAlign="left">
              <FontAwesomeIcon icon={faSearch} />
            </Icon>
          </Control>
          <Control>
            <Button type="submit" isColor="info" isLoading={this.state.loading}>Search</Button>
          </Control>
        </Field>
      </form>
    )
  }
}