import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import FrameworkViewContainer from 'models/frameworkView';

const dashboardContainer = () => {
  const { beginLoading, finishLoading } = FrameworkViewContainer.useContainer();
  const [newsIsLoading, setNewsIsLoading] = useState(false);
  const [todayNewsIsLoading, setTodayNewsIsLoading] = useState(false);

  useEffect(() => {
    if (newsIsLoading || todayNewsIsLoading) {
      beginLoading();
    } else {
      finishLoading();
    }
  }, [newsIsLoading, todayNewsIsLoading]);

  return {
    beginNewsIsLoading: () => { setNewsIsLoading(true); },
    finishNewsIsLoading: () => { setNewsIsLoading(false); },
    beginTodayNewsIsLoading: () => { setTodayNewsIsLoading(true); },
    finishTodayNewsIsLoading: () => { setTodayNewsIsLoading(false); },
  };
};

const DashboardContainer = createContainer(dashboardContainer);
export default DashboardContainer;
