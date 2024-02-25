import { setFullScreenEnabled } from '@/app/features/testWatchSlice';
import { ReduxRootState } from '@/app/store';
import SummaryPage from '@/components/TestSeries/TestWatch/SummaryPage';
import TestPage from '@/components/TestSeries/TestWatch/TestPage';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const TestWatch = () => {

  const router = useRouter();
  const dispatch = useDispatch();
  const { test_id: testId, test_attempt_id: testAttemptId } = router?.query;

  //states
  const showSummary = useSelector((state: ReduxRootState) => state.testWatch.showSummary);

  //handle user refresh and tab switch
  useEffect(() => {
    const handleRefreshPage = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    const handleTabChange = () => {
      if (document.hidden) {
        // Page is not visible (user switched tabs)
        alert('Switching tabs may result in closing of the Test.');
      } else {
        // Page is visible, You can handle any logic when the user returns to the tab
      }
    };

    window.addEventListener('beforeunload', handleRefreshPage);
    document.addEventListener('visibilitychange', handleTabChange);
    return () => {
      window.removeEventListener('beforeunload', handleRefreshPage);
      document.removeEventListener('visibilitychange', handleTabChange);
    }
  }, [])

  // enter in the fullscreen mode or else after every 10 seconds display an alert
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        dispatch(setFullScreenEnabled(false));
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [dispatch]);


  
  const handleFullScreenEnabled = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
    dispatch(setFullScreenEnabled(true));
  }

  // if the user clicks back button while in the test then display an alert
  useEffect(() => {
    const handleBeforePopState = () => {
      const answer = window.confirm('Are you sure you want to leave? Your test will be automatically Sumbmitted.');

      if (!answer) {
        // If the user clicks Cancel, prevent the navigation
        return false;
      }

      // Allow the navigation to proceed
      return true;
    };

    router.beforePopState(handleBeforePopState);
  }, [router])


  const handleEntireTestSubmit = () => {
    router.replace(`/courses/test-series/test-result?test_id=${testId}&test_attempt_id=${testAttemptId}`);
  }



  return (
    <div className='relative'>
      {
        showSummary && <SummaryPage handleEntireTestSubmit={handleEntireTestSubmit} handleFullScreenEnabled={handleFullScreenEnabled} />
      }
      <TestPage handleEntireTestSubmit={handleEntireTestSubmit} handleFullScreenEnabled={handleFullScreenEnabled} />
    </div>
  )
}


export default TestWatch