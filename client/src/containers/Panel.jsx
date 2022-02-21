import React from 'react';
import { PanelHeader, PanelBody } from '../components';

const Panel = ({option, setIsOpen}) => {
  return (
    <main className="panel--container">
        <PanelHeader title={option} setIsOpen={setIsOpen} />
        <PanelBody option={option} setIsOpen={setIsOpen} />
    </main>
  )
}

export default Panel;