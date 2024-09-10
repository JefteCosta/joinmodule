import { JoinModule } from '../core/JoinModule.js';
export interface Plugin {
    apply(joinModule: JoinModule): void;
    applyAsync?(joinModule: JoinModule): Promise<void>;
  }