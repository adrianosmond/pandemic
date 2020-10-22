import { useState, useCallback } from 'react';

export default () => {
  const [uiVisible, setUiVisible] = useState(true);
  const [visibleTab, setVisibleTab] = useState(null);
  const [visibleModal, setVisibleModal] = useState(null);

  const showTab = useCallback((tabName) => {
    setVisibleTab((state) => {
      setUiVisible(tabName !== state);
      return tabName === state ? null : tabName;
    });
  }, []);

  const closeUi = useCallback(() => {
    setUiVisible(false);
    setVisibleTab(null);
  }, []);

  return {
    uiVisible,
    visibleTab,
    visibleModal,
    showTab,
    closeUi,
    setVisibleModal,
  };
};
