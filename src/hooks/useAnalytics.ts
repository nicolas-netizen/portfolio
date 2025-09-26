import { useEffect } from 'react';
import { pageview, event } from '../utils/analytics';

export const useAnalytics = () => {
  useEffect(() => {
    // Track page views
    pageview(window.location.pathname);
  }, []);

  // Function to track custom events
  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    event({ action, category, label, value });
  };

  // Predefined tracking functions for common events
  const trackPageView = (pageName: string) => {
    trackEvent('page_view', 'navigation', pageName);
  };

  const trackButtonClick = (buttonName: string) => {
    trackEvent('click', 'button', buttonName);
  };

  const trackDownload = (fileName: string) => {
    trackEvent('download', 'file', fileName);
  };

  const trackExternalLink = (linkName: string) => {
    trackEvent('click', 'external_link', linkName);
  };

  const trackProjectView = (projectName: string) => {
    trackEvent('view', 'project', projectName);
  };

  const trackContactForm = (formType: string) => {
    trackEvent('submit', 'contact_form', formType);
  };

  return {
    trackEvent,
    trackPageView,
    trackButtonClick,
    trackDownload,
    trackExternalLink,
    trackProjectView,
    trackContactForm,
  };
};
