<template>
  <section>
    <div class="w-full">
      <DashboardWeeksCard
        :title="title"
        :subtitle="subtitle"
      >
        <template #body>
          <DashboardProgressAsset :assets="assets" />
        </template>

        <template #footer>
          <div
            class="mt-12 flex w-full flex-col-reverse pe-items-center justify-between md:flex-row"
          >
            <PEButton
              :label="$t('learnMore')"
              :to="localePath('/preferential-weeks')"
              tag="NuxtLink"
              text
            />
            <PEButton
              :label="$t('useNow')"
              :to="localePath('/build-your-search')"
              tag="NuxtLink"
              flat
              secondary
              uppercase
            />
          </div>
        </template>
      </DashboardWeeksCard>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import i18n from '~/src/ui/i18n/dashboard/dashboard.lang'

@Component({
  i18n,
})
export default class PreferentialWeeks extends Vue {
  @Prop({type: String, default: ''})
  title!: string

  @Prop({type: String, default: ''})
  subtitle!: string

  @Prop({type: Array, default: () => []})
  assets!: any[]
}
</script>
