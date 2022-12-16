<template>
<v-card flat tile :loading="product">
    <v-tabs v-model="tab" background-color="primary" dark v-if="product != null">
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
    <v-tabs-items v-model="tab" v-if="product != null">
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
                            <v-slide-group v-model="imageGallery" show-arrows class="py-4" active-class="success">
                                <v-slide-item v-for="img in product.images" :key="img" v-slot="{ active, toggle }">
                                    <v-card :class="active ? 'card-thumbnail' : 'card-thumbnail-active'" flat tile @click="toggle" class="ma-2" color="transparent">
                                        <v-img :src="img" width="100" height="100"></v-img>
                                    </v-card>
                                </v-slide-item>
                            </v-slide-group>
                        </v-col>
                        <v-col cols="6">
                            <v-carousel hide-delimiters height="320" v-model="imageGallery" :continuous="true" :cycle="cycle" :show-arrows="false">
                                <v-carousel-item v-for="img in product.images" :key="img" class="mx-auto">
                                    <v-img :src="img" width="320" height="320"></v-img>
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
            <v-card flat tile class="text-center pa-12">
                <v-btn v-for="pdf, i in product.clinicFiles" :key="i" dark color="primary" large :href="pdf" target="_blank" class="ma-3">
                <v-icon left>
                    mdi-file-download
                </v-icon>{{$fire.storage.refFromURL(pdf).name}}
            </v-btn>
            </v-card>

        </v-tab-item>
    </v-tabs-items>

</v-card>
</template>

    
<script>
    export default {
        layout: 'clean_nobg',
        data() {
            return {
                tab: null,
                imageGallery: null,
                product: null
            }
        },
        mounted() {
            this.getProduct()
        },
        methods: {
            async getProduct() {
                let ref = this.$fire.firestore.collection('products')
                ref.doc(this.$route.params.slug).get().then((doc) => {
                    if (doc.exists) {
                        this.product = doc.data()

                    } else {
                        // doc.data() will be undefined in this case
                        console.log("Producto no encontrado!");
                    }
                }).catch((error) => {
                    console.log("Error buscando el producto:", error);
                });

            },
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
