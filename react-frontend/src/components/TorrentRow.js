import React from 'react';
import icons from '../icons';
import classNames from 'classnames';
import Download from './Download';

export default function TorrentRow(row) {
  const classes = row.attribute ? classNames({
    [row.attribute]: true
  }) : undefined;

  return (
    <tr key={row.id} className={classes}>
      <td><Download url={row.magnet} path={row.path} /></td>
      <td><Img category={row.categoryId} /></td>
      <td title={row.path}>
        <a target="_blank" href={`https://nyaa.si/view/${row.id}`}>{row.name}</a>
      </td>
      <td className="seeder">{row.seedCount}</td>
      <td className="leecher">{row.leechCount}</td>
    </tr>
  )
}

function Img({ category }) {
  if (!category || !icons[category]) {
    return null;
  }
  return (
    <img src={icons[category]} alt="" />
  )
}