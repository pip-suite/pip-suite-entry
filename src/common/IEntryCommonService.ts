import { EntryPageConfig } from './EntryPageConfig';

export interface IEntryCommonService {
    configureAppBar(): void;
    initScope($scope): EntryPageConfig;
}

