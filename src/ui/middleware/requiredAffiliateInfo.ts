import { Middleware } from '@nuxt/types'
import { BPGStore } from '../store/bpgStore';

export const requiredAffiliateInfo: Middleware = ({app, redirect}) => {
  const bpgStore = new BPGStore()

  if (!bpgStore.affiliateInfo.application) {
    return redirect({path: app.localePath('/affiliate-search')})
  }
}

export default requiredAffiliateInfo