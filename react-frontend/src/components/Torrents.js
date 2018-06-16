import React from 'react';
// import { Table } from 'bloomer/lib/elements/Table';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faArrowUp from '@fortawesome/fontawesome-free-solid/faArrowUp'
import faArrowDown from '@fortawesome/fontawesome-free-solid/faArrowDown'

import classNames from 'classnames';
import TorrentRow from './TorrentRow';

function Table({ children, isFullWidth }) {
  const classes = classNames({
    table: true,
    "is-fullwidth": isFullWidth,
    "torrents": true
  });
  return (
    <table className={classes}>
      {children}
    </table>
  )
}

export default function Torrents({ data }) {
  return (
    <Table isFullWidth>
      <thead>
        <tr>
          <th>DL</th>
          <th>Category</th>
          <th>Name</th>
          <th><FontAwesomeIcon icon={faArrowUp} /></th>
          <th><FontAwesomeIcon icon={faArrowDown} /></th>
        </tr>
      </thead>
      <tbody>
        {data.map(TorrentRow)}
      </tbody>
    </Table>
  )
}
