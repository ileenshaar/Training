import React from 'react';

import { BrowserRouter as Router, NavLink } from 'react-router-dom';

const CharacterListItem = ({ character }) => {
  const { id, name } = character;
  return (
    <Router>
    <article className="CharacterListItem">
      <NavLink className="CharacterListItemLink" to={`/characters/${id}`}>
        {name}
      </NavLink>
    </article>
    </Router>
  );
};

export default CharacterListItem;
