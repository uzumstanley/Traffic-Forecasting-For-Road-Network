import * as React from 'react';
import { DevtoolsButtonPosition, DevtoolsPosition, DevToolsErrorType } from '@tanstack/query-devtools';
import { QueryClient } from '@tanstack/react-query';

interface DevtoolsOptions {
    /**
     * Set this true if you want the dev tools to default to being open
     */
    initialIsOpen?: boolean;
    /**
     * The position of the React Query logo to open and close the devtools panel.
     * 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
     * Defaults to 'bottom-right'.
     */
    buttonPosition?: DevtoolsButtonPosition;
    /**
     * The position of the React Query devtools panel.
     * 'top' | 'bottom' | 'left' | 'right'
     * Defaults to 'bottom'.
     */
    position?: DevtoolsPosition;
    /**
     * Custom instance of QueryClient
     */
    client?: QueryClient;
    /**
     * Use this so you can define custom errors that can be shown in the devtools.
     */
    errorTypes?: Array<DevToolsErrorType>;
    /**
     * Use this to pass a nonce to the style tag that is added to the document head. This is useful if you are using a Content Security Policy (CSP) nonce to allow inline styles.
     */
    styleNonce?: string;
    /**
     * Use this so you can attach the devtool's styles to specific element in the DOM.
     */
    shadowDOMTarget?: ShadowRoot;
}
declare function ReactQueryDevtools(props: DevtoolsOptions): React.ReactElement | null;

type devtools_DevtoolsOptions = DevtoolsOptions;
declare const devtools_ReactQueryDevtools: typeof ReactQueryDevtools;
declare namespace devtools {
  export { type devtools_DevtoolsOptions as DevtoolsOptions, devtools_ReactQueryDevtools as ReactQueryDevtools };
}

export { type DevtoolsOptions as D, ReactQueryDevtools as R, devtools as d };
