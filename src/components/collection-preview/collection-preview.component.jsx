import React from 'react';

import './collection-preview.styles.scss';
import CollectionItem from '../collection-item/collection-item.component';

const CollectionPreview = ({title, items}) => {
  return (
    <div className="collection-preview">
      <h1 className="title">{title.toUpperCase()}</h1>
      {/* The Items go here */}
      <div className="preview">
        {
          items
            .filter((item, idx) => idx < 4)
            .map(({id, ...otherCollectionItemProps}) => (
              <CollectionItem key={id} {...otherCollectionItemProps} />
            ))
        }
      </div>
    </div>
  )
}

export default CollectionPreview;