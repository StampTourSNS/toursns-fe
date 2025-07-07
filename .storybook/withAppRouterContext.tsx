import React, { FC } from 'react';

import {
  AppRouterContext,
  type AppRouterInstance,
} from 'next/dist/shared/lib/app-router-context.shared-runtime';

const withAppRouterContext = (Story: FC) => (
  <AppRouterContext.Provider value={{} as AppRouterInstance}>
    <Story />
  </AppRouterContext.Provider>
);

export default withAppRouterContext;
