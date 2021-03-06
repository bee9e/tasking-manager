import React from 'react';
import { useSelector } from 'react-redux';

import { ProfilePictureIcon, CloseIcon } from '../svgIcons';

export const CurrentUserAvatar = props => {
  const userPicture = useSelector(state => state.auth.getIn(['userDetails', 'pictureUrl']));
  if (userPicture) {
    return <img {...props} src={userPicture} alt={'user avatar'} />;
  }
  return <ProfilePictureIcon {...props} />;
};

export const UserAvatar = ({name, username, picture, size, colorClasses, removeFn, editMode}: Object) => {
  let sizeClasses = 'h2 w2 f5';
  let textPadding = editMode ? {top: "-0.75rem"} : {paddingTop: "0.375rem"};
  let closeIconStyle = {left: "0.4rem"};
  if(size === 'large') {
    closeIconStyle = {marginLeft: "3rem"};
    sizeClasses = 'h3 w3 f2';
    textPadding = editMode ? {top: "-0.5rem"} : {paddingTop: "0.625rem"};
  }

  let letters;
  if (name) {
    letters = name.split(' ').map(word => word[0]).join('');
  } else {
    letters = username.split(' ').map(word => word[0]).join('');
  }

  return <div className={`dib mh1 br-100 tc v-mid ${colorClasses} ${sizeClasses}`}>
    {removeFn && editMode &&
      <div
        className="relative top-0 z-1 fr br-100 f7 tc h1 w1 bg-red white pointer"
        style={closeIconStyle}
        onClick={() => removeFn(username)}
      >
        <CloseIcon className="pt1"/>
      </div>
    }
    {picture ? (
      <img className={`tc br-100 dib v-mid ${sizeClasses} ${editMode ? 'relative top--1' : ''}`} src={picture} alt={name || username} />
      ) :
      <span className="relative tc w-100 dib ttu dib barlow-condensed v-mid" style={textPadding}>
        {letters.substr(0,3)}
      </span>
    }
  </div>;
};
