import React, { useEffect, useRef } from 'react';

const useActivityDetection = (inactivityTime = 15000) => {
  const timeoutRef = useRef(null);

  useEffect(() => {
    const resetTimer = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(onInactivity, inactivityTime);
    };

    const onInactivity = () => {
      console.error('User is inactive');
      // Perform the desired action on inactivity, e.g., log out or show a warning
    };

    const handleMouseMove = () => {
      resetTimer();
    };

    const handleKeyDown = () => {
      resetTimer();
    };

    const handleWheel = () => {
      resetTimer();
    };

    resetTimer();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel);

    return () => {
      clearTimeout(timeoutRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [inactivityTime]);

  return timeoutRef;
};

const withActivityDetection = (WrappedComponent, inactivityTime) => {
  return (props) => {
    // eslint-disable-next-line no-unused-vars
    const timeoutRef = useActivityDetection(inactivityTime);

    return <WrappedComponent {...props} />;
  };
};

export default withActivityDetection;
