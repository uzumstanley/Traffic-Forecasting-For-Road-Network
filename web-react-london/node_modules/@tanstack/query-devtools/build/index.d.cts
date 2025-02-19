import { Query, QueryClient, onlineManager } from '@tanstack/query-core';

type XPosition = 'left' | 'right';
type YPosition = 'top' | 'bottom';
type DevtoolsPosition = XPosition | YPosition;
type DevtoolsButtonPosition = `${YPosition}-${XPosition}` | 'relative';
interface DevToolsErrorType {
    /**
     * The name of the error.
     */
    name: string;
    /**
     * How the error is initialized.
     */
    initializer: (query: Query) => Error;
}
interface QueryDevtoolsProps {
    readonly client: QueryClient;
    queryFlavor: string;
    version: string;
    onlineManager: typeof onlineManager;
    buttonPosition?: DevtoolsButtonPosition;
    position?: DevtoolsPosition;
    initialIsOpen?: boolean;
    errorTypes?: Array<DevToolsErrorType>;
    shadowDOMTarget?: ShadowRoot;
}

interface TanstackQueryDevtoolsConfig extends QueryDevtoolsProps {
    styleNonce?: string;
    shadowDOMTarget?: ShadowRoot;
}
declare class TanstackQueryDevtools {
    #private;
    constructor(config: TanstackQueryDevtoolsConfig);
    setButtonPosition(position: DevtoolsButtonPosition): void;
    setPosition(position: DevtoolsPosition): void;
    setInitialIsOpen(isOpen: boolean): void;
    setErrorTypes(errorTypes: Array<DevToolsErrorType>): void;
    setClient(client: QueryClient): void;
    mount<T extends HTMLElement>(el: T): void;
    unmount(): void;
}

export { type DevToolsErrorType, type DevtoolsButtonPosition, type DevtoolsPosition, TanstackQueryDevtools, type TanstackQueryDevtoolsConfig };
