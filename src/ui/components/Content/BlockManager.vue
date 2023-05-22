<template>
    <div>
        <template v-for="(component, index) in blocks">
            <Component
                :is="component.clientOnly ? 'div' : 'ClientOnly'"
                :key="component.props?.id || index"
            >
                <Component
                    :is="component.component"
                    v-bind="component.props"
                    @onClickLinkStrapi="onClickLinkStrapi"
                />
            </Component>
        </template>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component({
  name: 'BlockManager'
})

export default class BlockManager extends Vue {
  @Prop({default: null, type: Array}) blocks!: any

    onClickLinkStrapi(value: any){
        const { target, to } = value;

        if (to) {
            if (target === '_blank') {
                window.open(to, target);
            } else {
                this.$nuxt.$router.push({ path: to });
            }

            return;
        }

        let { href } = value;

        if (href) {
            if (!href.startsWith('http://') && !href.startsWith('https://')) {
                href = `https://${href}`;
            }

            window.open(href, target);
        }
    }
}
</script>
