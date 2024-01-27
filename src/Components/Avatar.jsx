// Avatar.js
import React from 'react';
import AvatarInitials from 'avatar-initials';

const Avatar = ({ firstName, lastName, size, alt }) => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  const avatarOptions = {
    size: size,
    initials: initials,
  };

  const avatarUrl = AvatarInitials(avatarOptions);

  return <img src={avatarUrl} alt={alt} style={{ width: size, height: size, borderRadius: '50%' }} />;
};

export default Avatar;
