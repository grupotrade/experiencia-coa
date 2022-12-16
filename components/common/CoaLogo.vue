<template>
<img class="CoaLogo" alt="COA | Soluciones Odontológicas Integrales" :src="$vuetify.theme.dark || dark ? '/img/Logo_COA.png' : '/img/Logo_COA.png'">
</template>

<script>
export default {
    name: 'logo-coa',
    props: {
        dark: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style>
.CoaLogo {
    width: 180px;
}
</style>
