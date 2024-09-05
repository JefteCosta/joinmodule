import { JoinModule } from '#src/core/JoinModule';
export interface Plugin {
    apply(joinModule: JoinModule): void;
  }