import { useState } from 'react';
import { createContainer } from 'unstated-next';

const frameworkViewContainer = () => {
  const [isLoading, setLoading] = useState(false);

  return {
    isLoading,
    beginLoading: () => { setLoading(true); },
    finishLoading: () => { setLoading(false); },
  };
};

const FrameworkViewContainer = createContainer(frameworkViewContainer);
export default FrameworkViewContainer;
