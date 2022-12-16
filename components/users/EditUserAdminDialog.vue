<template>
<v-dialog v-model="show" width="950px">
    <v-toolbar dense flat color="midground">
        <v-toolbar-title>{{$t('users.edit_user')}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = false">
            <v-icon>mdi-window-close</v-icon>
        </v-btn>
    </v-toolbar>
    <v-card flat tile class="card-surface pt-2">
        <v-card-text>
            <v-form v-model="valid" v-on:submit.prevent="onSubmitEditUser">
                <v-row>
                    <v-col cols="6">
                    <v-text-field v-model="user.name" label="Nombre" required :rules="rulesGlobal.required" :items="roles" outlined></v-text-field>
                    <v-text-field v-model="user.lastName" label="Apellido" required :rules="rulesGlobal.required" :items="roles" outlined></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field v-model="user.group" label="Empresa" :items="roles" outlined></v-text-field>
                    <v-select v-model="user.role" label="Rol" required :rules="rulesGlobal.required" :items="roles" outlined></v-select>
                </v-col>
                <v-col cols="12" class="text-center">
                    <v-btn color="success" :disabled="!valid" type="submit">
                        Editar
                    </v-btn>
                </v-col>
                </v-row>
                
            </v-form>
        </v-card-text>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    name: 'dialogEditUser',
    props: {
        value: {
            type: Boolean,
            required: true,
        },
        user: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            show: this.value,
            valid: false,
            roles: [
                'admin',
                'public'
            ]
        }
    },
    watch: {
        show(val) {
            this.$emit('input', val)
        },
        value(val) {
            this.show = val
        }
    },
    methods: {
        onSubmitEditUser(event) {
            event.preventDefault()
            this.$emit('save', this.user)
        }
    }
}
</script>
