import { JoinModuleOptions } from './JoinModuleOptions.js';

export interface EnvironmentConfig {
  development?: JoinModuleOptions;
  production?: JoinModuleOptions;
  [key: string]: JoinModuleOptions | undefined;
}