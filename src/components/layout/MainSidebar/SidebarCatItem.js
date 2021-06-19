import React from 'react';
import { NavLink as RouteNavLink } from 'react-router-dom';
import { NavItem, NavLink } from 'shards-react';
import { useSelector } from 'react-redux';

const SidebarCatItem = ({ item, onClick, parent }) => {
  const adType = useSelector((st) => st.store.adType);

  const type = adType ? adType : 'category';

  if (item)
    return (
      <NavItem>
        <NavLink
          className={!parent ? 'nav-link-child' : !item.parent ? '' : 'active'}
          tag={RouteNavLink}
          to={
            parent
              ? parent !== 'root'
                ? `/${type}/` + parent.to + '/' + parent.title.en
                : '/'
              : `/${type}/` + item.to + '/' + item.title.en
          }
          onClick={() => onClick()}>
          {item.title && (
            <span
              className={item.parent && !parent ? 'nav-link-child-text' : ''}>
              {item.title.en}
            </span>
          )}
          {parent && (
            <div
              className="d-inline-block item-icon-wrapper"
              dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
            />
          )}
        </NavLink>
      </NavItem>
    );
  else return <></>;
};

export default SidebarCatItem;
