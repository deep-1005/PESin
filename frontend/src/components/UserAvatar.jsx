import React from 'react';

/**
 * UserAvatar component - Fast, local avatar generation
 * Creates avatars from user initials with customizable colors
 */
const UserAvatar = ({ 
  name, 
  profilePicture, 
  size = 52, 
  fontSize,
  className = '' 
}) => {
  // Generate initials from name
  const getInitials = (fullName) => {
    if (!fullName) return 'U';
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Generate consistent background color from name
  const getBackgroundColor = (str) => {
    if (!str) return '#5b7cfa';
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      '#5b7cfa', '#667eea', '#764ba2', '#f093fb', '#4facfe',
      '#00f2fe', '#43e97b', '#38f9d7', '#fa709a', '#fee140'
    ];
    return colors[Math.abs(hash) % colors.length];
  };

  const initials = getInitials(name);
  const bgColor = getBackgroundColor(name);
  const calculatedFontSize = fontSize || `${size * 0.4}px`;

  if (profilePicture) {
    return (
      <img
        src={profilePicture}
        alt={name || 'User'}
        className={className}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid rgba(79, 103, 227, 0.12)'
        }}
        onError={(e) => {
          // Fallback to initials if image fails to load
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
    );
  }

  return (
    <div
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: bgColor,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: calculatedFontSize,
        fontWeight: 'bold',
        border: '2px solid rgba(79, 103, 227, 0.12)',
        flexShrink: 0
      }}
    >
      {initials}
    </div>
  );
};

export default UserAvatar;
