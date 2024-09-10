import { JoinModule } from '../core/JoinModule.ts';
export interface Plugin {
    apply(joinModule: JoinModule): void;
    applyAsync?(joinModule: JoinModule): Promise<void>;
  }