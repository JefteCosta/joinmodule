import { JoinModule } from '../core/JoinModule';
export interface Plugin {
    apply(joinModule: JoinModule): void;
    applyAsync?(joinModule: JoinModule): Promise<void>;
  }