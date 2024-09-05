import { JoinModuleOptions } from '#interfaces/JoinModuleOptions';

export interface EnvironmentConfig {
  development?: JoinModuleOptions;
  production?: JoinModuleOptions;
  [key: string]: JoinModuleOptions | undefined;
}