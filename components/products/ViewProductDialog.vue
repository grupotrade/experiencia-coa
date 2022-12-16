<template>
<v-dialog v-model="show" width="1040px">
    <v-toolbar flat class="primary" dark>
        <v-toolbar-title>
            {{product.name}}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip bottom content-class="bottom">
            <template v-slot:activator="{ on }">
                <v-btn depressed icon v-on="on" @click.stop="show = false">
                    <v-icon>mdi-window-close</v-icon>
                </v-btn>
            </template>
            <span>{{$t('close')}}</span>
        </v-tooltip>
    </v-toolbar>

    <v-tabs v-model="tab" background-color="primary" dark>
        <v-tab>
            Información
        </v-tab>
        <v-tab v-if="product.video">
            Vídeo
        </v-tab>
        <v-tab v-if="product.model360">
            Modelado 360°
        </v-tab>
        <v-tab v-if="product.clinicVideo">
            Video caso clínico
        </v-tab>
        <v-tab v-if="product.clinicFiles.length > 0">
            Documentos caso clínico
        </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
        <v-tab-item>
            <v-card flat tile class="primary" dark>
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <h3>{{product.name}}</h3>
                            <v-divider></v-divider>
                            <p class="body-2 pa-4">{{product.description}}</p>
                            <v-divider></v-divider>
                            <v-btn large color="secondary" @click="view360" class="my-3" v-if="product.model360">
                                <v-icon left>
                                    mdi-rotate-orbit
                                </v-icon> Ver Modelado 360°
                            </v-btn>
                            <v-divider></v-divider>
                            <div v-if="product.technicalFiles.length > 0">
                                <v-btn v-for="pdf, i in product.technicalFiles" :key="i" dark color="primary" :href="pdf" target="_blank" class="ma-3">
                                    <v-icon left>
                                        mdi-file-download
                                    </v-icon> Ver ficha técnica <span v-if="product.technicalFiles.length > 1">&nbsp;{{i+1}}</span>
                                </v-btn>
                            </div>
                            <v-slide-group v-model="imageGallery" show-arrows class="pa-4" active-class="success">
                                <v-slide-item v-for="img in product.images" :key="img" v-slot="{ active, toggle }">
                                    <v-card :class="active ? 'card-thumbnail' : 'card-thumbnail-active'" flat tile @click="toggle" class="ma-2" color="transparent">
                                        <v-img :src="img" width="120" height="120"></v-img>
                                    </v-card>
                                </v-slide-item>
                            </v-slide-group>
                        </v-col>
                        <v-col cols="6">
                            <v-carousel hide-delimiters height="400" v-model="imageGallery" :continuous="true" :cycle="cycle" :show-arrows="false">
                                <v-carousel-item v-for="img in product.images" :key="img"  class="mx-auto">
                                    <v-img :src="img" width="400" height="400" ></v-img>
                                </v-carousel-item>
                            </v-carousel>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-tab-item>
        <v-tab-item v-if="product.video">
            <iframe width="100%" height="500" :src="'https://www.youtube.com/embed/'+product.video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </v-tab-item>
        <v-tab-item v-if="product.model360">
            <iframe width="100%" height="500" :src="product.model360" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </v-tab-item>
        <v-tab-item v-if="product.clinicVideo">
            <iframe width="100%" height="500" :src="'https://www.youtube.com/embed/'+product.clinicVideo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </v-tab-item>
        <v-tab-item v-if="product.clinicFiles.length > 0">
            <v-btn v-for="pdf, i in product.clinicFiles" :key="i" dark color="primary" large :href="pdf" target="_blank" class="ma-3">
                <v-icon left>
                    mdi-file-download
                </v-icon>{{$fire.storage.refFromURL(pdf).name}}
            </v-btn>
        </v-tab-item>
    </v-tabs-items>

</v-dialog>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean
        },
        product: {
            type: Object,
            require: true
        }
    },
    model: {
        event: `modified`
    },
    data() {
        return {
            tab: null,
            imageGallery: null
        }
    },
    computed: {
        show: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit("modified", val);
            }
        },
    },
    methods: {
        view360() {
            this.tab = 2
        }
    }
}
</script>

<style>
.card-thumbnail {
    opacity: 0.6 !important;
}

.card-thumbnail-active {
    opacity: 1 !important;
}
</style>
