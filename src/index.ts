import { JoinModule } from '#src/core/JoinModule';
import { JoinModuleOptions } from '#interfaces/JoinModuleOptions';

export default function createJoinModule(options: JoinModuleOptions) {
  return new JoinModule(options);
}