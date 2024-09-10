import { JoinModuleOptions } from './JoinModuleOptions.ts';

export interface EnvironmentConfig {
  development?: JoinModuleOptions;
  production?: JoinModuleOptions;
  [key: string]: JoinModuleOptions | undefined;
}