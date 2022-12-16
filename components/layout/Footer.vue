<template>
     <v-footer :class="(!$vuetify.breakpoint.xs) ? 'footer-default py-6' : 'py-6'">
        <v-row dense align="center">
            <v-col cols="6">
                <img src="/img/18-Logo-COA.png"  style="max-width:100%" />
            </v-col>
            <v-col cols="6" class="text-right">
                <img src="/img/ESR_MEM.png" style="max-width:250px; width: 100%;"/>
               
            </v-col>
        </v-row>
    </v-footer>
</template>