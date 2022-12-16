<template>
<v-dialog v-model="show" width="950px">
    <v-toolbar dense flat color="primary" dark>
        <v-toolbar-title>{{$t('products.new_product')}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-tooltip bottom content-class="bottom">
            <template v-slot:activator="{ on }">
                <v-btn depressed icon v-on="on" @click="minimizeNewProductDialog()">
                    <v-icon>mdi-window-minimize</v-icon>
                </v-btn>
            </template>
            <span>{{ $t("minimize") }}</span>
        </v-tooltip>
        <v-tooltip bottom content-class="bottom">
            <template v-slot:activator="{ on }">
                <v-btn depressed icon v-on="on" @click="cancelProductDialog()">
                    <v-icon>mdi-window-close</v-icon>
                </v-btn>
            </template>
            <span>{{ $t("cancel") }}</span>
        </v-tooltip>
    </v-toolbar>
    <v-card flat tile class="card-surface pt-2">
        <v-form v-model="validProduct" v-on:submit.prevent="saveProduct">
            <v-card-text>
                <v-container>
                    <v-row dense>
                        <v-col>
                            <v-text-field dense outlined class="body-1" background-color="foreground" required :rules="rulesGlobal.required" v-model="product.name" label="Nombre" color="secondary"></v-text-field>
                            <v-text-field dense outlined class="body-1" background-color="foreground" v-model="product.tag" label="Etiqueta"></v-text-field>
                            <v-text-field dense outlined class="body-1" background-color="foreground" v-model="product.video" label="Vídeo" color="secondary"></v-text-field>
                            <v-text-field dense outlined class="body-1" background-color="foreground" v-model="product.model360" label="Modelado 360°" color="secondary"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-textarea dense outlined class="body-1" background-color="foreground" required :rules="rulesGlobal.required" v-model="product.description" label="Descripción">
                            </v-textarea>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col>
                            <h5 class="body-1 pa-3">Imágenes</h5>
                            <v-file-input dense v-model="product.file" placeholder="Seleccione sus archivos" accept="image/*" color="secondary" background-color="foreground" outlined prepend-icon="mdi-paperclip" @change="onImagesPicked" :disabled="processing" multiple>
                            </v-file-input>
                            <v-row dense>
                                <v-col cols="3">
                                    <span v-if="progress > 0 && progress < 100">Subiendo archivos...</span>
                                    <span v-if="progress == 100" class="success--text">Archivos subidos</span>
                                </v-col>
                                <v-col>
                                    <v-progress-linear class="my-3" :value="progress" :buffer-value="100" :color="(progress == 100) ? 'success' : 'primary'" v-if="progress > 0 && progress < 100"></v-progress-linear>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="3" v-for="image in product.images" :key="image">
                                    <v-btn icon small class="white float-right mt-n4 ml-n4 z-index1000" @click="removeImage(image)">
                                        <v-icon small>close</v-icon>
                                    </v-btn>
                                    <v-img contain :src="image" width=""></v-img>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col>
                            <h5 class="body-1 pa-3">Fichas técnicas</h5>
                            <v-file-input dense v-model="product.pdf" placeholder="Seleccione sus archivos" accept=".pdf" color="secondary" background-color="foreground" outlined prepend-icon="mdi-paperclip" @change="onPdfsPicked" :disabled="processingPdf" multiple>
                            </v-file-input>
                            <v-row dense>
                                <v-col cols="3">
                                    <span v-if="progressPdf > 0 && progressPdf < 100">Subiendo archivos...</span>
                                    <span v-if="progressPdf == 100" class="success--text">Archivos subidos</span>
                                </v-col>
                                <v-col>
                                    <v-progress-linear class="my-3" :value="progressPdf" :buffer-value="100" :color="(progressPdf == 100) ? 'success' : 'primary'" v-if="progressPdf > 0 && progressPdf < 100"></v-progress-linear>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="3" v-for="pdf in pdfs" :key="pdf">
                                    <h5 class="body-2">{{pdf.name}}
                                        <v-btn icon small class="white float-right mt-n4 ml-n4 z-index1000" @click="removePdf(pdf)">
                                            <v-icon small>close</v-icon>
                                        </v-btn>
                                    </h5>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <h5 class="body-1 pa-3">Caso clínico vídeo</h5>
                    <v-row dense>
                        <v-col>
                            <v-text-field dense outlined class="body-1" background-color="foreground" v-model="product.clinicVideo" label="Caso clínico vídeo" color="secondary"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col>
                            <h5 class="body-1 pa-3">Casos clínicos PDF</h5>
                            <v-file-input dense v-model="product.clinicPdf" placeholder="Seleccione sus archivos" accept=".pdf" color="secondary" background-color="foreground" outlined prepend-icon="mdi-paperclip" @change="onClinicPdfsPicked" :disabled="processingPdf" multiple>
                            </v-file-input>
                            <v-row dense>
                                <v-col cols="3">
                                    <span v-if="progressPdf > 0 && progressPdf < 100">Subiendo archivos...</span>
                                    <span v-if="progressPdf == 100" class="success--text">Archivos subidos</span>
                                </v-col>
                                <v-col>
                                    <v-progress-linear class="my-3" :value="progressPdf" :buffer-value="100" :color="(progressPdf == 100) ? 'success' : 'primary'" v-if="progressPdf > 0 && progressPdf < 100"></v-progress-linear>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols="3" v-for="pdf in pdfsClinic" :key="pdf">
                                    <h5 class="body-2">{{pdf.name}}
                                        <v-btn icon small class="white float-right mt-n4 ml-n4 z-index1000" @click="removeClinicPdf(pdf)">
                                            <v-icon small>close</v-icon>
                                        </v-btn>
                                    </h5>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions class="justify-center background">
                <v-btn large color="primary" type="submit" :disabled="!validProduct || processing" depressed>{{$t('save')}}</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    props: {
        user: {
            type: Object
        },
        value: {
            type: Boolean
        },
    },
    model: {
        event: `modified`
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
    data() {
        return {
            validProduct: false,
            processing: false,
            processingPdf: false,
            fileURL: null,
            progress: 0,
            progressPdf: 0,
            blobs: [],
            images: [],
            pdfBlobs: [],
            pdfs: [],
            pdfClinicBlobs: [],
            pdfsClinic: [],
            product: {
                name: '',
                tag: '',
                description: '',
                images: [],
                model360: '',
                video: '',
                technicalFiles: [],
                clinicVideo: '',
                clinicFiles: [],
            }

        }
    },
    methods: {
        minimizeNewProductDialog() {
            this.$emit("minimize");
            this.show = false;
        },
        cancelProductDialog() {
            this.$dialog.show({
                name: `${this.$t("confirm_dialog.cancel_new_product")}`,
                text: `${this.$t("confirm_dialog.confirm_cancel")} ${this.$t(
          "confirm_dialog.new_product"
        )}`,
                buttons: [{
                    text: this.$t("accept"),
                    color: "primary",
                    handle: () => {
                        this.$dialog.hide();
                        this.show = false;
                        this.$emit("cancel");
                    },
                }, ],
            });
        },
        saveProduct: function (e) {
            e.preventDefault()
            const productsRef = this.$fire.firestore.collection("products")
            const dateTime = new Date()
            productsRef.add({
                name: this.product.name,
                tag: this.product.tag,
                description: this.product.description,
                images: this.product.images,
                date: dateTime.toISOString(),
                deletedAt: null,
                status: 1,
                model360: this.product.model360,
                video: this.product.video,
                technicalFiles: this.product.technicalFiles,
                clinicVideo: this.product.clinicVideo,
                clinicFiles: this.product.clinicFiles,
                user: {
                    name: this.user.displayName,
                    id: this.user.uid
                },
            }, )
            this.product = {
                name: '',
                tag: '',
                description: '',
                images: [],
                model360: '',
                video: '',
                technicalFiles: [],
                clinicVideo: '',
                clinicFiles: [],
            }
            this.success = true
            this.images = []
            this.blobs = []
            this.images = []
            this.pdfBlobs = [],
                this.pdfs = [],
                this.pdfClinicBlobs = [],
                this.pdfsClinic = [],
                this.show = false;
            this.$emit('finish', this.user)
            this.$toasted.success('Producto cargado', {
                theme: "bubble",
                position: "top-right",
                duration: 2000
            })
        },
        async onImagesPicked(files) {
            this.images = []
            for (let file of files) {
                this.images.push(file)
                let blob = await this.prepareImagesForUpload(file)
                this.blobs.push(blob)
            }
            this.uploadImagesToFirebase()
        },
        prepareImagesForUpload(file) {
            return new Promise((resolve, reject) => {
                let filename = file.name
                if (filename.lastIndexOf(".") <= 0) {
                    alert("Please add a valid file: ", filename)
                    reject()
                }
                const fileReader = new FileReader()
                fileReader.readAsDataURL(file)
                fileReader.addEventListener("load", async () => {
                    resolve(fileReader.result)
                })
            })
        },
        async uploadImagesToFirebase() {
            this.product.images = []
            this.processing = true
            for (let image of this.images) {
                const filePath = `${Date.now()}-${image.name}`;
                var storageRef = await this.$fire.storage.ref('products').child(filePath)
                let uploadTask = storageRef.put(image)
                uploadTask.on('state_changed', (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        this.progress = progress
                        this.progress = 0
                    },
                    (error) => {
                        console.log(error);
                    })
                uploadTask.then(
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            this.product.images.push(downloadURL);
                        })
                        this.processing = false
                    }
                )

            }
        },
        async onPdfsPicked(files) {
            this.pdfs = []
            for (let file of files) {
                this.pdfs.push(file)
                let blob = await this.preparePdfsForUpload(file)
                this.pdfBlobs.push(blob)
            }
            this.uploadPdfsToFirebase()
        },
        preparePdfsForUpload(file) {
            return new Promise((resolve, reject) => {
                let filename = file.name
                if (filename.lastIndexOf(".") <= 0) {
                    alert("Please add a valid file: ", filename)
                    reject()
                }
                const fileReader = new FileReader()
                fileReader.readAsDataURL(file)
                fileReader.addEventListener("load", async () => {
                    resolve(fileReader.result)
                })
            })
        },
        async uploadPdfsToFirebase() {
            this.product.technicalFiles = []
            this.processingPdf = true
            for (let pdf of this.pdfs) {
                const filePath = `${pdf.name}`;
                var storageRef = await this.$fire.storage.ref('products').child(filePath)
                let uploadTask = storageRef.put(pdf)
                uploadTask.on('state_changed', (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        this.progressPdf = progress
                        this.progressPdf = 0
                    },
                    (error) => {
                        console.log(error);
                    })
                uploadTask.then(
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            this.product.technicalFiles.push(downloadURL);
                        })
                        this.processingPdf = false
                    }
                )
            }
        },
        async onClinicPdfsPicked(files) {
            this.pdfsClinic = []
            for (let file of files) {
                this.pdfsClinic.push(file)
                let blob = await this.prepareClinicPdfsForUpload(file)
                this.pdfClinicBlobs.push(blob)
            }
            this.uploadClinicPdfsToFirebase()
        },
        prepareClinicPdfsForUpload(file) {
            return new Promise((resolve, reject) => {
                let filename = file.name
                if (filename.lastIndexOf(".") <= 0) {
                    alert("Please add a valid file: ", filename)
                    reject()
                }
                const fileReader = new FileReader()
                fileReader.readAsDataURL(file)
                fileReader.addEventListener("load", async () => {
                    resolve(fileReader.result)
                })
            })
        },
        async uploadClinicPdfsToFirebase() {
            this.product.clinicFiles = []
            this.processingPdf = true
            for (let pdf of this.pdfsClinic) {
                const filePath = `${pdf.name}`;
                var storageRef = await this.$fire.storage.ref('products').child(filePath)
                let uploadTask = storageRef.put(pdf)
                uploadTask.on('state_changed', (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        this.progressPdf = progress
                        this.progressPdf = 0
                    },
                    (error) => {
                        console.log(error);
                    })
                uploadTask.then(
                    () => {
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            this.product.clinicFiles.push(downloadURL);
                            console.log( this.product.clinicFiles)
                        })
                        this.processingPdf = false
                    }
                )
            }
        },
        removeImage(image) {
            const indexOf = this.product.images.indexOf(image)
            if (indexOf > -1) {
                this.product.images.splice(indexOf, 1)
                this.blobs.splice(indexOf, 1)
                this.images.splice(indexOf, 1)
                if (this.images.length == 0) {
                    this.product.file = null
                }
            }
        },
        removePdf(pdf) {
            const indexOf = this.pdfs.indexOf(pdf)
            if (indexOf > -1) {
                this.product.technicalFiles.splice(indexOf, 1)
                this.pdfBlobs.splice(indexOf, 1)
                this.pdfs.splice(indexOf, 1)
                if (this.pdfs.length == 0) {
                    this.product.pdf = null
                }
            }
        },
        removeClinicPdf(pdf) {
            const indexOf = this.pdfsClinic.indexOf(pdf)
            if (indexOf > -1) {
                this.product.clinicFiles.splice(indexOf, 1)
                this.pdfClinicBlobs.splice(indexOf, 1)
                this.pdfsClinic.splice(indexOf, 1)
                if (this.pdfsClinic.length == 0) {
                    this.product.clinicPdf = null
                }
            }
        },
        async fileInput(file) {
            try {
                if (file && file.name) {
                    this.processingPdf = true;
                    const fr = new FileReader();
                    fr.readAsDataURL(file);
                    fr.addEventListener("load", () => {
                        // this is to load image on the UI
                        // .. not related to file upload :)
                        this.fileURL = fr.result;
                    });
                    const pdfData = new FormData();
                    pdfData.append("pdf", this.product.pdf);
                    const filePath = `${Date.now()}-${file.name}`;
                    const metadata = {
                        contentType: this.product.pdf.type
                    };
                    this.product.technicalFile = filePath
                    await this.$fire.storage.ref('products')
                        .child(filePath)
                        .put(this.product.pdf, metadata);
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.processingPdf = false;
            }
        }
    }
}
</script>
