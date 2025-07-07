<template>
    <!-- // Layout principal de la aplicación -->
    <DefaultLayout>
        <b-row class="justify-content-center">
            <b-col cols="12">
                <b-card no-body>
                    <b-card-header>
                        <b-row class="align-items-center justify-content-between">
                            <b-col lg="3">
                                <b-card-title><i class="fas fa-tags"></i> Categorias</b-card-title>
                            </b-col>
                            <b-col cols="12" lg="2" class="mt-2 mt-lg-0 text-lg-right text-center">
                                <b-button variant="success" v-if="authStore.isPermitedRoute('register_categorie')"
                                    @click="openModal = !openModal"
                                    class="w-100 w-lg-auto d-flex align-items-center justify-content-center">
                                    <i class="fas fa-plus mr-2"></i> Registrar
                                </b-button>
                            </b-col>
                        </b-row>
                        <b-row class="align-items-center">
                            <b-col cols="12" lg="5" class="mt-2 mb-2">
                                <b-form-input type="text" v-model="search" placeholder="Buscar por Categoria"
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
                                        <th>Id</th>
                                        <th>Imagen</th>
                                        <th>Categoria</th>
                                        <th>Descripcion</th>
                                        <th>Estado</th>
                                        <th>Fecha de Creación</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(categorie, index) in categories" :key="index">
                                        <td>{{ categorie.id }}</td>
                                        <td>
                                            <img v-if="categorie.image" :src="categorie.image" alt="Imagen de la categoría"
                                                width="50px" class="rounded d-block mx-auto" />
                                        </td>
                                        <td>{{ categorie.name }}</td>
                                        <td>{{ categorie.description }}</td>
                                        <td>
                                            <span class="badge"
                                                :class="categorie.state == 1 ? 'bg-success' : 'bg-danger'">
                                                {{ categorie.state == 1 ? 'Activo' : 'Inactivo' }}
                                            </span>
                                        </td>
                                        <td>{{ categorie.created_at }}</td>
                                        <td>
                                            <a href="#" onclick="return false;"
                                                v-if="authStore.isPermitedRoute('edit_categorie')"
                                                @click="editcategorie(categorie)">
                                                <i class="las la-pen text-secondary fs-22"></i></a>{{ " " }}
                                            <a href="#" onclick="return false;"
                                                v-if="authStore.isPermitedRoute('delete_categorie')"
                                                @click="deletecategorie(categorie)">
                                                <i class="las la-trash-alt text-secondary fs-22"></i>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </b-card-body>
                </b-card>
                <!-- verificar si hay categories para mostrar paginación -->
                <b-row  class="justify-content-center">
                    <b-pagination v-model="currentPage" :total-rows="totalPage" :per-page="perPageRows"
                        prev-text="Anterior" next-text="Siguiente" align="center" class="mt-3">
                    </b-pagination>
                </b-row>
            </b-col>
        </b-row>
        <b-modal v-model="openModal" :title="`🔐 ${categorie_selected ? 'Editar' : 'Registrar'} un Rol`"
            :header-class="`bg-${themeColor}`" title-class="m-0 text-white" ok-title="Save changes"
            :ok-variant="themeColor" cancel-title="Close" centered hide-footer size="md">
            <b-row>
                <b-col cols="12" class="mb-3">
                    <label for="categorie" class="col-form-label text-lg-end">Nombre del la Categoría</label>
                    <b-form-input type="text" id="categorie" v-model="name" placeholder="Ej: Galletas" />
                </b-col>
                <b-col cols="12" class="mb-3">
                    <label for="description" class="col-form-label text-lg-end">Descripción</label>
                    <b-form-textarea id="description" v-model="description" placeholder="Descripción de la categoría"
                        rows="3"></b-form-textarea>
                </b-col>
                 <b-col lg="6" class="mt-2">
                    <label for="state" class="col-form-label text-lg-end">Estado: </label>
                    <b-form-radio name="state" @click="state = 1" value="1"
                        :checked="state == 1">Activo</b-form-radio>
                    {{ " " }}
                    <b-form-radio name="state" @click="state = 2" value="2"
                        :checked="state == 2">Inactivo</b-form-radio>
                </b-col>
                <b-col lg="6" class="mt-2">
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
                            {{ categorie_selected ? 'Editar' : 'Guardar' }}
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
import type { Categorie, CategorieResponse, Categories } from "@/types/categories";
import { onMounted, ref, watch } from "vue";
import HttpClient from "@/helpers/http-client";

import { showAlert, showConfirm } from '@/utils/alert';
// importar utils
import { clearFields, validateRequiredFields } from '@/utils/validation';

import httpClient from "@/helpers/http-client";

import { useAuthStore } from '@/stores/auth'; // Importa el store de autenticación
const authStore = useAuthStore(); // Crea una instancia del store de autenticación

const categories = ref<Categorie[]>([]);

const openModal = ref(false);
const themeColor = ref<any>("primary");

const categorie_selected = ref<Categorie>();


const search = ref<string>("");
const loading = ref<boolean>(false);

// declaracion de variables para el formulario
const name = ref<string>("");
const description = ref<string>("");
const state = ref<number>(1); // 1: Activo, 2: Inactivo

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
        const res: AxiosResponse<Categories> = await HttpClient.get(
            'categories?page=' + currentPage.value + '&search=' + search.value);
        console.log(res.data);
        totalPage.value = res.data.total;
        perPageRows.value = res.data.paginate;
        categories.value = res.data.categories;
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
    ];


    if (!validateRequiredFields(requiredFields)) {
      loading.value = false;
      return;
    }

    let formData = new FormData();
    formData.append('name', name.value);
    formData.append('description', description.value);
    formData.append('state', state.value.toString());
    if (FILE_AVATAR.value) {
      formData.append('image', FILE_AVATAR.value);
    }

    let res;
    if(categorie_selected.value) {
        const resp: AxiosResponse<CategorieResponse> = await httpClient.post('categories/' + categorie_selected.value.id,formData );
        res = resp;
    } else {
      const resp: AxiosResponse<CategorieResponse> = await httpClient.post('categories',formData );
            res = resp;
    }
    if (res.data.code == 201) {
        console.log(res.data.categorie);
        showAlert('Éxito', res.data.message, 'success', true);
        // si es editar, reemplazar la categoría editada
        if(categorie_selected.value && res.data.categorie) {
            let index = categories.value.findIndex((categorie) => categorie.id === categorie_selected.value?.id);
            if (index !== -1) {
                categories.value[index] = res.data.categorie;
            }
        console.log('aca llegamos');
        }else if (res.data.categorie) {
            categories.value.unshift(res.data.categorie);
        }
        console.log('aca llegamos 2');
        // limpiar campos
        openModal.value = false;
        clearFields([name, description, state, FILE_AVATAR, IMAGEN_PREVIZUALIZA]);
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
    // cerrar el modal
    openModal.value = false;
  }
};

const editcategorie = (categorie: Categorie) => {
   categorie_selected.value = categorie;
    openModal.value = true;
    name.value = categorie.name ?? '';
    description.value = categorie.description ?? '';
    state.value = categorie.state;
    FILE_AVATAR.value = null; // limpiar el archivo de imagen
    IMAGEN_PREVIZUALIZA.value = categorie.image ; // mostrar la imagen actual del usuario
}

const deletecategorie = async (categorie: Categorie) => {
    showConfirm('¿Estás seguro de', ` eliminar la categoría ${categorie.name}?`)
        .then(async (result: { isConfirmed: boolean }) => {
            if (result.isConfirmed) {
            try {
                const res: AxiosResponse<any> = await httpClient.delete('categories/' + categorie.id);
                if (res.data.code == 200) {
                    showAlert('Éxito', res.data.message, 'success', true);
                    let index = categories.value.findIndex((c) => c.id === categorie.id);
                    if (index !== -1) {
                        categories.value.splice(index, 1);
                    }
                }
            } catch (error) {
                console.error('Error al eliminar la categoría:', error);
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
        clearFields([name, description, state, FILE_AVATAR, IMAGEN_PREVIZUALIZA]);
        categorie_selected.value = undefined;
    }
});
watch(currentPage, (value) => {
    list();
})

onMounted(() => {
    list();
})
</script>