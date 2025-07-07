<template>
    <DefaultLayout>
        <b-row class="justify-content-center">
            <b-col cols="12">
                <b-card no-body>
                    <b-card-header>
                        <b-row class="align-items-center justify-content-between">
                            <b-col lg="3">
                                <b-card-title> 👩‍👧‍👦Usuarios</b-card-title>
                            </b-col>
                            <b-col cols="12" lg="2" class="mt-2 mt-lg-0 text-lg-right text-center">
                                <b-button variant="success" @click="openModal = !openModal"
                                    class="w-100 w-lg-auto d-flex align-items-center justify-content-center">
                                    <i class="fas fa-plus mr-2"></i> Registrar
                                </b-button>
                            </b-col>
                        </b-row>
                        <b-row class="align-items-center">
                            <b-col cols="12" lg="5" class="mt-2 mb-2">
                                <b-form-input type="text" v-model="search" placeholder="Buscar por usuario"
                                    @keyup.enter="list" />
                            </b-col>
                            <b-col lg="3" md="3">
                                <b-button type="button" @click="list" variant="success">
                                    <i class="fas fa-search"></i>
                                </b-button>
                                <b-button type="button" @click="reset" variant="dark" class="mx-2">
                                    <i class="fas fa-sync"></i>
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-card-header>
                    <b-card-body class="pt-0">
                        <div class="table-responsive m-0">
                            <table class="table datatable" id="datatable_1">
                                <thead class="table-light">
                                    <tr>
                                        <th>ID</th>
                                        <th>NOMBRE Y APELLIDO</th>
                                        <th>EMAIL</th>
                                        <th>PHONE</th>
                                        <th>TIPO DOCUMENTO</th>
                                        <th>N DE DOCUMENTO</th>
                                        <th>ROLE</th>
                                        <th>F.REGISTRO</th>
                                        <TH>ACCIÓN</TH>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(user, index) in users" :key="index">
                                        <td>{{user.id}}</td>
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <span
                                                    class="thumb-md justify-content-center d-flex align-items-center bg-purple-subtle text-purple rounded-circle me-2">{{
                                                    avatarText(user.full_name) }}</span>
                                                <span>{{ user.full_name }}</span>
                                            </div>
                                        </td>
                                        <td>{{ user.email }}</td>
                                        <td>{{ user.phone }}</td>
                                        <td>{{ user.type_document }}</td>
                                        <td>{{ user.n_document }}</td>
                                        <td>{{ user.role.name }}</td>
                                        <td>{{ user.created_at }}</td>
                                        <td>
                                            <a href="#" onclick="return false;" @click="editUser(user)">
                                                <i class="las la-pen text-secondary fs-22"></i></a>{{ " " }}
                                            <a href="#" onclick="return false;" @click="deleteUser(user)">
                                                <i class="las la-trash-alt text-secondary fs-22"></i>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </b-card-body>
                </b-card>
                <!-- verificar si hay registros para mostrar paginación -->
                <b-row v-if="users.length > 0" class="justify-content-center">
                    <b-pagination v-model="currentPage" :total-rows="totalPage" :per-page="perPageRows"
                        prev-text="Anterior" next-text="Siguiente" align="center" class="mt-3">
                    </b-pagination>
                </b-row>
            </b-col>
        </b-row>
        <b-modal v-model="openModal" :title="`🔐 ${user_selected ? 'Editar' : 'Registrar'} un Usuario`"
            :header-class="`bg-${themeColor}`" title-class="m-0 text-white" ok-title="Save changes"
            :ok-variant="themeColor" cancel-title="Close" centered hide-footer size="lg" modal-class="custom-modal"
            body-class="custom-modal-body">
            <b-row>
                <b-col lg="6">
                    <label for="name-user" class="col-form-label text-lg-end">Nombre: </label>
                    <b-form-input type="text" id="name-user" v-model="name" placeholder="Example: Jose" />
                </b-col>
                <b-col lg="6">
                    <label for="surname-user" class="col-form-label text-lg-end">Apellido: </label>
                    <b-form-input type="text" id="surname-user" v-model="surname" placeholder="Example: Jose" />
                </b-col>

                <b-col lg="4" class="mt-2">
                    <label for="email-user" class="col-form-label text-lg-end">Email: </label>
                    <b-form-input type="text" id="email-user" v-model="email"
                        placeholder="Example: laravest@gmail.com" />
                </b-col>

                <b-col lg="4" class="mt-2">
                    <label for="phone-user" class="col-form-label text-lg-end">Telefono: </label>
                    <b-form-input type="number" id="phone-user" v-model="phone"
                        placeholder="Example: laravest@gmail.com" />
                </b-col>
                <b-col lg="4" class="mt-2">
                    <label for="role_user" class="col-form-label text-lg-end">Role: </label>
                    <b-form-select id='' v-model="role_id">
                        <template v-for="(role, index) in roles" :key="index">
                            <option :value="role.id">{{ role.name }}</option>
                        </template>
                    </b-form-select>
                </b-col>

                <b-col lg="4" class="mt-2">
                    <label for="type-document-user" class="col-form-label text-lg-end">Tipo de documento: </label>
                    <b-form-select id="type_document_list" v-model="type_document">
                        <option value="DNI">DNI</option>
                        <option value="PASAPORTE">PASAPORTE</option>
                        <option value="CARNET DE EXTRANJERIA">CARNET DE EXTRANJERIA</option>
                        <option value="TARJETA MILITAR">TARJETA MILITAR</option>
                    </b-form-select>
                </b-col>

                <b-col lg="4" class="mt-2">
                    <label for="n_document-user" class="col-form-label text-lg-end">N° de Documento: </label>
                    <b-form-input type="number" id="n_document-user" v-model="n_document"
                        placeholder="Example: #######" />
                </b-col>

                <b-col lg="4" class="mt-2">
                    <label for="gender-user" class="col-form-label text-lg-end">Genero: </label>
                    <b-form-radio name="gender-user" @click="gender = 'M'" value="M"
                        :checked="gender == 'M'">Masculino</b-form-radio>
                    {{ " " }}
                    <b-form-radio name="gender-user" @click="gender = 'F'" value="F"
                        :checked="gender == 'F'">Femenino</b-form-radio>
                </b-col>


                <b-col lg="3" class="mt-2">
                    <label for="state-user" class="col-form-label text-lg-end">Estado: </label>
                    <b-form-radio name="state-user" @click="state = 1" value="1"
                        :checked="state == 1">Activo</b-form-radio>
                    {{ " " }}
                    <b-form-radio name="state-user" @click="state = 2" value="2"
                        :checked="state == 2">Inactivo</b-form-radio>
                </b-col>

                <b-col lg="4" class="mt-2">
                    <label for="password-user" class="col-form-label text-lg-end">Contraseña: </label>
                    <b-form-input type="password" id="password-user" v-model="password" placeholder="*********" />
                </b-col>

                <b-col lg="5" class="mt-2">
                    <label for="avatar-user" class="col-form-label text-lg-end">Avatar de Usuario: </label>
                    <b-input-group class="mb-3">
                        <b-form-file @change="loadFile($event)" />
                        <b-input-group-text>Upload</b-input-group-text>
                    </b-input-group>

                    <img v-if="IMAGEN_PREVIZUALIZA" :src="IMAGEN_PREVIZUALIZA" alt="" width="100px"
                        class="rounded d-block mx-auto" />
                </b-col>

                <b-col lg="12" class="mt-3">
                    <div class="modal-footer">
                        <b-button type="button" variant="secondary" @click="openModal = false">
                            Cerrar
                        </b-button>
                        <b-button type="button" variant="primary" @click="store">
                            {{ user_selected ? 'Editar' : 'Crear' }}
                        </b-button>
                    </div>
                </b-col>
            </b-row>
        </b-modal>
    </DefaultLayout>
</template>
<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import type { AxiosResponse } from "axios";
import { onMounted, ref, watch } from "vue";
import HttpClient from "@/helpers/http-client";
import {type RoleUser, type User, type UserResponse, type Users } from "@/types/users";

import { showAlert, showConfirm } from '@/utils/alert';
// importar utils
import { clearFields, validateRequiredFields } from '@/utils/validation';

import httpClient from "@/helpers/http-client";

// const authStore = useAuthStore();

const users = ref<User[]>([]);

const openModal = ref(false);
const themeColor = ref<any>("primary");

const user_selected = ref<User>();


const search = ref<string>("");
const loading = ref<boolean>(false);

// declaracion de variables para el formulario
const surname = ref<string>("");
const name = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const phone = ref<number | null>(null);
const role_id = ref<string>("");
const roles = ref<RoleUser[]>([]);
const type_document = ref<string>("DNI");
const n_document = ref<number>();
const gender = ref<string>("M");
const state = ref<number>(1);
// fin de  declaracion de variables para el formulario
// imagenes 
const IMAGEN_PREVIZUALIZA = ref<any>(null);
const FILE_AVATAR = ref<File | null>(null);
// fin  imagenes 
// paginación
const currentPage = ref<number>(1);
const perPageRows = ref<number>(10);
const totalPage = ref<number>(0);


    
const list = async () => {
    try {
        const res: AxiosResponse<Users> = await HttpClient.get(
            'users?page=' + currentPage.value + '&search=' + search.value);
        totalPage.value = res.data.total
        perPageRows.value = res.data.pagination;
        roles.value = res.data.roles;
        users.value = res.data.users.data;
    } catch (error) {
        console.log(error);
    }
}

const reset = () => {
    search.value = "";
    list();
}


const store = async () => {
  if (loading.value) return; // prevenir doble click

  try {
    // activar loading
    loading.value = true;

    // 🔧 Construimos los campos requeridos dinámicamente
    const requiredFields = [
        { value: name, label: 'nombre' },
        { value: surname, label: 'apellido' },
        { value: email, label: 'email' },
        { value: n_document, label: 'número de documento' },
        { value: role_id, label: 'rol' },

    ];
    // Si es creación (no edición), añadimos password como obligatorio
      if (!user_selected.value) {
      requiredFields.push({ value: password, label: 'contraseña' });
    }

    if (!validateRequiredFields(requiredFields)) {
      loading.value = false;
      return;
    }

    let formData = new FormData();
    formData.append('name', name.value);
    formData.append('surname', surname.value);
    formData.append('email', email.value);
    formData.append('phone', phone.value !== null ? phone.value.toString() : '');
    formData.append('role_id', role_id.value.toString());
    formData.append('type_document', type_document.value);
    formData.append('n_document', n_document.value?.toString() || '');
    formData.append('gender', gender.value);
    formData.append('password', password.value);
    formData.append('state', state.value+ '');
    if (FILE_AVATAR.value) {
      formData.append('imagen', FILE_AVATAR.value);
    }

    let res;
    if(user_selected.value) {
        const resp: AxiosResponse<UserResponse> = await httpClient.post('users/' + user_selected.value.id,formData );
        res = resp;
    } else {
      const resp: AxiosResponse<UserResponse> = await httpClient.post('users',formData );
            res = resp;
    }
    if (res.data.code == 201) {
        showAlert('Éxito', res.data.message, 'success', true);
        // si es editar, reemplazar el usuario editado
        if(user_selected.value && res.data.user) {
            let index = users.value.findIndex((user) => user.id === user_selected.value?.id);
            if (index !== -1) {
                users.value[index] = res.data.user;
            }
        }else if (res.data.user) {
            users.value.unshift(res.data.user);
        }
        // limpiar campos
        clearFields([name, surname, email, password, phone, role_id, type_document, n_document, FILE_AVATAR, IMAGEN_PREVIZUALIZA]);
        openModal.value = false;
    }else if (res.data.code == 409) {
      showAlert('Upps!', res.data.message, 'error');
    }
    else {
      showAlert('Upps!', "ocurrió un error", 'error');
    }

  } catch (error) {
    console.error('Error al guardar el rol:', error);
  } finally {
    // desactivar loading aunque haya error
    loading.value = false;
    openModal.value = false;
  }
};

const editUser = (user: User) => {
    user_selected.value = user;
    openModal.value = true;
    
    name.value = user.name ?? '';
    surname.value = user.surname ?? '';
    email.value = user.email ?? '';
    phone.value = user.phone ?? null;
    role_id.value = user.role_id?.toString() ?? '';
    type_document.value = user.type_document ?? '';
    n_document.value = user.n_document ?? undefined;
    state.value = user.state;
    gender.value = user.gender;
    password.value =  ""; // no mostrar la contraseña actual
    FILE_AVATAR.value = null; // limpiar el archivo de imagen
    IMAGEN_PREVIZUALIZA.value = user.avatar ; // mostrar la imagen actual del usuario
}
      
const deleteUser = async (user: User) => {
    showConfirm('¿Estás seguro de', ` eliminar el usuario ${user.name}?`)
        .then(async (result: { isConfirmed: boolean }) => {
            if (result.isConfirmed) {
            try {
                const res: AxiosResponse<any> = await httpClient.delete('users/' + user.id);
                if (res.data.code == 200) {
                    showAlert('Éxito', res.data.message, 'success', true);
                    let index = users.value.findIndex((user) => user.id === user.id);
                    if (index !== -1) {
                        users.value.splice(index, 1);
                    }
                }
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
            }
            }
    });
}

const loadFile = ($event:any) => {
    if($event.target.files[0].type.indexOf("image") < 0){
        IMAGEN_PREVIZUALIZA.value = null;
        FILE_AVATAR.value = null;
        showAlert('Upps!', 'El archivo seleccionado no es una imagen', 'error', true);
        // "SOLAMENTE PUEDEN SER ARCHIVOS DE TIPO IMAGEN";
        return;
    }
    FILE_AVATAR.value = $event.target.files[0];
    let reader = new FileReader();
    if(FILE_AVATAR.value){
        reader.readAsDataURL(FILE_AVATAR.value);
        reader.onloadend = () => IMAGEN_PREVIZUALIZA.value = reader.result;
    }
}


// Devuelve las iniciales del nombre completo del usuario
const avatarText = (value:string) => {
    if (!value)
        return ''
    const nameArray = value.split(' ')
    return nameArray.map(word => word.charAt(0).toUpperCase()).join('')
}


watch(openModal, (value) => {
    if (value == false) {
        // Limpiar campos al cerrar el modal
        clearFields([name, surname, email, password, phone, role_id, type_document, n_document, FILE_AVATAR, IMAGEN_PREVIZUALIZA]);
        user_selected.value = undefined;
    }
   
});

watch(currentPage, (value) => {
    list();
})



onMounted(() => {
    list();
})
</script>