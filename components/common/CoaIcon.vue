<template>
<img class="CoaIcon" alt="COA | Soluciones Odontológicas Integrales" :src="$vuetify.theme.dark || dark ? '/img/Icon_COA.png' : '/img/Icon_COA.png'">
</template>

<script>
export default {
    name: 'icon-coa',
    props: {
        dark: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style>
.CoaIcon {
    width: 100px;
}
</style>
