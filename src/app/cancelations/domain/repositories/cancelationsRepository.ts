import { HighDemandWeeks } from '../entities/cancelationsWeeksEntity'
export interface CancelationsRepository {
  getWeeks(): Promise<HighDemandWeeks>
}
