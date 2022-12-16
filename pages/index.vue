<template>
<v-sheet>
    <v-sheet class="hero my-8 mx-4">
        <v-row dense>
            <v-col cols="12" lg="6">
                <v-sheet color="transparent" class="py-8 px-12">
                    <h1 class="white--text mb-6" v-if="!$vuetify.breakpoint.xs">Bienvenidos a <br />Experiencia <br />COA Dental</h1>
                    <h2 class="white--text mb-6" v-else>Bienvenidos a <br />Experiencia COA Dental</h2>
                    <h4 class="white--text">Encuentra las mejores marcas<br /> y contenidos exclusivos</h4>
                    <Countdown deadline="November 24, 2020, 8:00" v-if="false"></Countdown>
                    <!-- <v-btn color="secondary" class="mt-6 px-8 py-5 btn-evento" rounded depressed @click="openLogin()" v-if="!user.displayName">
                        Iniciar sesión
                    </v-btn> -->
                </v-sheet>

            </v-col>
            <v-col cols="6" v-if="$vuetify.breakpoint.lgAndUp">
                <img src="/img/hero.png" class="hero-img" />
            </v-col>
        </v-row>
    </v-sheet>
    <v-container fluid id="salas" class="px-4">
        <v-col cols="12" class="pb-12">
            <h3 class="primary--text text-center"><span class="secondary--text">Conoce tu </span> nuevo consultorio</h3>
        </v-col>
        <v-row justify="center">
            <v-col cols="4" lg="2" v-for="item in rooms" :key="item.img" class="text-center">
                <v-btn :color="item.color" rounded depressed class="pa-4" width="80" height="80" @click="$router.push(item.to)">
                    <v-img :src="'img/rooms/'+item.img" width="50" contain></v-img>
                </v-btn>
                <h6 class="text-center mt-3" :style="'color:'+item.color+';cursor:pointer'" @click="$router.push(item.to)">{{item.name}}</h6>
            </v-col>
        </v-row>
    </v-container>
    <v-container fluid id="productos" class="px-4">
        <v-row dense>
            <v-col cols="12" class="pb-12">
                <h3 class="primary--text text-center"><span class="secondary--text">Productos</span> destacados</h3>
            </v-col>
            <v-col cols="12" lg="3" v-for="item in productsHome" :key="item.name">
                <v-card elevation="3" shaped class="py-3 ma-2">
                    <v-img :src="item.images[0]"></v-img>
                    <v-card-text style="min-height:180px">
                        <h4 class="pt-3">{{item.name}}</h4>
                        <p>{{item.description.substring(0, 100)}}...</p>
                        <!-- <h5 v-if="user.displayName" class="primary--text text-right">${{item.price}}</h5> -->
                    </v-card-text>
                    <v-card-actions class="justify-center">
                        <v-btn color="primary" rounded depressed class="px-4" @click="viewProduct(item)">
                            Ver más
                        </v-btn>
                        <!-- <v-btn color="primary" rounded depressed @click="openLogin" v-else class="px-4">
                            Iniciar sesión
                        </v-btn> -->
                    </v-card-actions>
                </v-card>
            </v-col>
            <!-- <v-slide-group v-model="productSlider" show-arrows class="pa-4" active-class="success">
            </v-slide-group> -->
        </v-row>
    </v-container>
    <v-container fluid id="marcas" class="px-4">
        <v-row justify="center" class="mt-10">
            <v-col cols="12" class="pb-12">
                <h3 class="primary--text text-center"><span class="secondary--text">Encuentra las</span> mejores marcas</h3>
            </v-col>
            <v-col cols="9">
                <v-row>
                    <v-col cols="6" lg="3" class=" px-sm-3 px-lg-8" v-for="(item, i) in brands" :key="i">
                        <v-img :src="item.img" contain></v-img>
                    </v-col>
                </v-row>
            </v-col>

            <!-- <v-slide-group v-model="slideBrands" class="px-8" show-arrows>
                <v-slide-item v-for="(item, i) in brands" :key="i" class="pa-1">
                    <v-img :src="item.img" width="200" class="mx-8"></v-img>
                </v-slide-item>
            </v-slide-group>  -->
        </v-row>
    </v-container>

    <ProductsViewProductDialog v-model="viewProductDialog" :product="productSelected" v-if="productSelected != null" />
    <DialogsLogin v-model="loginDialog" @openRegister="openRegister" />
    <DialogsRegister v-model="registerDialog" />
</v-sheet>
</template>

<script>
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            agenda: null,
            eventRoute: '',
            eventRouteNew: '',
            loginDialog: false,
            productSlider: null,
            registerDialog: false,
            productDialog: false,
            viewProductDialog: false,
            productSelected: null,
            brands: [{
                    img: '/img/brands/coltene.jpg'
                },
                {
                    img: '/img/brands/nsk.jpg'
                },
                {
                    img: '/img/brands/septodont.jpg'
                },
                {
                    img: '/img/brands/bisco.jpg'
                },
                {
                    img: '/img/brands/mani.jpg'
                },
                {
                    img: '/img/brands/bio-art.jpg'
                },
                {
                    img: '/img/brands/philips.jpg'
                },
                {
                    img: '/img/brands/geistlich.jpg'
                }
            ],
            rooms: [{
                    name: 'Prostodoncia',
                    img: 'prostodoncia.png',
                    color: '#94C01F',
                    to: '/salas/prostodoncia'
                },
                {
                    name: 'Operatoria / Estética',
                    img: 'operatoria_dental.png',
                    color: '#941B80',
                    to: '/salas/operatoria'
                },
                {
                    name: 'Periodoncia e Implantología',
                    img: 'periodoncia_e_implantologia.png',
                    color: '#E5332A',
                    to: '/salas/periodoncia'
                },
                {
                    name: 'Odontopediatría',
                    img: 'odontopediatria.png',
                    color: '#36A8E0',
                    to: '/salas/odontopediatria'
                },
                {
                    name: 'Endodoncia',
                    img: 'endodoncia.png',
                    color: '#868686',
                    to: '/salas/endodoncia'
                },
                {
                    name: 'Práctica estudiantil',
                    img: 'practica_estudiantil.png',
                    color: '#F29100',
                    to: '/salas/practica'
                }
            ]
        }
    },
    computed: {
        ...mapGetters({
            productsHome: "products/getProductsHome",
        }),
        user() {
            return this.$store.state.authUser;
        }
    },
    mounted() {
        this.listProducts()
    },
    methods: {
        listProducts() {
            this.$store.dispatch('products/getProductsHome')
        },
        openRegister() {
            this.registerDialog = true
        },
        openLogin() {
            this.loginDialog = true
        },

        viewProduct(product) {
            this.viewProductDialog = true,
                this.productSelected = product
        },
        closeProductDialog() {
            this.productDialog = false,
                this.productSelected = {}
        }
    }
}
</script>

<style scoped>
.hero {
    background-repeat: no-repeat !important;
    background-color: var(--v-primary-base) !important;
    border-radius: 25px;
    background-position: right !important;
    background-size: contain !important;
    min-height: 320px;
}

.hero-img {
    position: absolute;
    width: 540px;
    margin: -30px 0 0 36px;
}
</style>
