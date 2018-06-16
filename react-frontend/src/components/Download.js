import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faDownload from '@fortawesome/fontawesome-free-solid/faDownload'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
import { Button } from 'bloomer/lib/elements/Button';
import * as api from '../api';

export default class Download extends React.Component {
  state = {
    loading: false,
    status: "init"
  }

  download = async () => {
    this.setState({ loading: true })
    try {
      await api.addMagnet(this.props.url)
      this.setState({
        loading: false,
        status: "done"
      })
    } finally {
      this.setState({
        loading: false,
        status: "error"
      })
    }
  }

  render() {
    if (this.state.status === "done") {
      return (
        <Button isColor="success">
          <FontAwesomeIcon icon={faCheck} />
        </Button>
      )
    } else {
      const color = this.state.status === "error" ? "danger" : undefined;
      return (
        <Button isLoading={this.state.loading} onClick={this.download} isColor={color}>
          <FontAwesomeIcon icon={faDownload} />
        </Button>
      );
    }
  }
}
