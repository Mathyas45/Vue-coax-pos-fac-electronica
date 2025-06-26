<template>
    <!-- // Layout principal de la aplicación -->
    <DefaultLayout>
        <b-row class="justify-content-center">
            <b-col cols="12">
                <b-card no-body>
                    <b-card-header>
                        <b-row class="align-items-center justify-content-between">
                            <b-col lg="3">
                                <b-card-title>🔐 Roles y Permisos</b-card-title>
                            </b-col>
                            <b-col cols="12" lg="2" class="mt-2 mt-lg-0 text-lg-right text-center">
                                <b-button variant="success" v-if="authStore.isPermitedRoute('register_role')" @click="openModal = !openModal"
                                    class="w-100 w-lg-auto d-flex align-items-center justify-content-center">
                                    <i class="fas fa-plus mr-2"></i> Registrar
                                </b-button>
                            </b-col>
                        </b-row>
                        <b-row class="align-items-center">
                            <b-col cols="12" lg="5" class="mt-2 mb-2">
                                <b-form-input type="text" v-model="search" placeholder="Buscar por Rol" @keyup.enter="list"/>
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
                                        <th>Role</th>
                                        <th>Permisos</th>
                                        <th>Fecha R.</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(role, index) in roles" :key="index">
                                        <td>{{ role.id }}</td>
                                        <td>{{ role.name }}</td>
                                        <td>
                                            <ul>
                                                <li v-for="(permission, index1) in role.permissions" :key="index1">
                                                    {{ permission }}
                                                </li>
                                            </ul>
                                        </td>
                                        <td>{{ role.created_at }}</td>
                                        <td>
                                            <a href="#" onclick="return false;" v-if="authStore.isPermitedRoute('edit_role')" @click="editRole(role)">
                                                <i class="las la-pen text-secondary fs-22"></i></a>{{ " " }}
                                            <a href="#" onclick="return false;" v-if="authStore.isPermitedRoute('delete_role')  " @click="deleteRole(role)">
                                                <i class="las la-trash-alt text-secondary fs-22"></i>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </b-card-body>
                </b-card>
                <!-- verificar si hay roles para mostrar paginación -->
                <b-row v-if="roles.length > 0" class="justify-content-center">
                    <b-pagination v-model="currentPage" :total-rows="totalPage" :per-page="perPageRows"
                        prev-text="Anterior" next-text="Siguiente" align="center" class="mt-3">
                    </b-pagination>
                </b-row>
            </b-col>
        </b-row>
        <b-modal v-model="openModal" :title="`🔐 ${role_selected ? 'Editar' : 'Registrar'} un Rol`"
            :header-class="`bg-${themeColor}`" title-class="m-0 text-white" ok-title="Save changes"
            :ok-variant="themeColor" cancel-title="Close" centered hide-footer size="md">
            <b-row>
                <b-col cols="12" class="mb-3">
                    <label for="role" class="col-form-label text-lg-end">Nombre del Rol</label>
                    <b-form-input type="text" id="role" v-model="name" placeholder="Admin de Sede" />
                </b-col>
                <b-col cols="12">
                    <table class="table table-responsive">
                        <thead class="table-light">
                            <tr>
                                <th>Modulo</th>
                                <th>Permisos</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(permission, index) in list_permissions" :key="index">
                                <td>
                                    {{ permission.name }}
                                </td>
                                <td>
                                    <ul>
                                        <!-- ["register_role","register_user","register_categorie"].includes("register_sale") -->
                                        <li style="list-style: none;" class="d-flex"
                                            v-for="(permiso, index2) in permission.permisos" :key="index2">
                                            <b-form-checkbox :checked="permissions.includes(permiso.permiso)"
                                                @click="addPermission(permiso)"></b-form-checkbox>
                                            <span class="mx-1">{{ permiso.name }}</span>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-col>
                <b-col lg="12" class="mt-3">
                    <div class="modal-footer">
                        <b-button type="button" variant="secondary" @click="openModal = false">
                            Cerrar
                        </b-button>
                        <b-button type="button" variant="primary" @click="store">
                            {{ role_selected ? 'Editar' : 'Guardar' }}
                        </b-button>
                    </div>
                </b-col>
            </b-row>
        </b-modal>
    </DefaultLayout>
</template>
<script setup lang="ts">
import httpClient from '@/helpers/http-client';
import DefaultLayout from '@/layouts/DefaultLayout.vue'; // Importa el layout principal
import { PERMISOS, type createdRole, type ResponseRoles, type Role } from '@/types/roles';
import type { AxiosResponse } from 'axios';
import { onMounted, ref, watch } from 'vue';
//importar archivos de sweetalert2
import { showAlert, showConfirm } from '@/utils/alert';
import { clearFields } from '@/utils/validation';
// Importar permisos botones
import { useAuthStore } from '@/stores/auth'; // Importa el store de autenticación

const authStore = useAuthStore();
const roles = ref<Role[]>([]);
const name = ref<string>('');
const openModal = ref(false);
const themeColor = ref('primary');
const role_selected = ref<Role | null>(null);
const list_permissions = ref(PERMISOS);
const permissions = ref<String[]>([]);
// cargando boton
const loading = ref(false);
// paginación
const currentPage = ref<number>(1);
const perPageRows = ref<number>(10);
const totalPage = ref<number>(0);

const search = ref<string>('');

    

const list = async() => {
    try {
        const res : AxiosResponse<ResponseRoles> = await httpClient.get("roles?page=" + currentPage.value + "&search=" + (search.value ? search.value : ''));
        roles.value = res.data.roles;
        totalPage.value = res.data.total;
        perPageRows.value = res.data.pagination;
    } catch (error) {
        console.error('Error al listar roles:', error);
    }
}
const reset = () => {
    search.value = '';
    list();
};
// agregar nuevo rol
const addPermission = async (permiso: any) => {
    let Index = permissions.value.findIndex((permission) => permission == permiso.permiso);
    if (Index != -1) {
        permissions.value.splice(Index, 1);
    }else{
        permissions.value.push(permiso.permiso);
    }
}
const store = async () => {
  if (loading.value) return; // prevenir doble click

  try {
    // activar loading
    loading.value = true;

    if (!name.value) {
      showAlert('Upps!', 'El campo nombre es obligatorio', 'error', true);
      return;
    }

    if (permissions.value.length === 0) {
      showAlert('Upps!', 'Debe seleccionar al menos un permiso', 'error', true);
      return;
    }
    let res;
    if(role_selected.value) {
        const resp: AxiosResponse<createdRole> = await httpClient.put('roles/' + role_selected.value.id, {
            name: name.value,
            permissions: permissions.value
            
        });
        res = resp;
    } else {
      const resp: AxiosResponse<createdRole> = await httpClient.post('roles', {
            name: name.value,
            permissions: permissions.value
            });
            res = resp;
    }
    if (res.data.code == 201) {
        showAlert('Éxito', res.data.message, 'success', true);
        // si es editar, reemplazar el rol editado
        if(role_selected.value) {
            let index = roles.value.findIndex((role) => role.id === role_selected.value?.id);
            if (index !== -1) {
                roles.value[index] = res.data.role;
            }
        }else {
            roles.value.unshift(res.data.role);
        }
        // limpiar campos
        openModal.value = false;
        name.value = '';
        permissions.value = [];
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
  }
};
const editRole = (role: Role) => {
    role_selected.value = role;
    openModal.value = true;
    name.value = role.name;
    permissions.value = role.permissions;
}

const deleteRole = async (role: Role) => {
    showConfirm('¿Estás seguro de', ` eliminar el rol ${role.name}?`)
        .then(async (result: { isConfirmed: boolean }) => {
            if (result.isConfirmed) {
            try {
                const res: AxiosResponse<any> = await httpClient.delete('roles/' + role.id);
                if (res.data.code == 200) {
                    showAlert('Éxito', res.data.message, 'success', true);
                    let index = roles.value.findIndex((rol) => rol.id === role.id);
                    if (index !== -1) {
                        roles.value.splice(index, 1);
                    }
                }
            } catch (error) {
                console.error('Error al eliminar el rol:', error);
            }
            }
        });

}
watch(openModal, (value) => {
    if (value == false) {
        // Limpiar campos al cerrar el modal
        clearFields([
            name,
            permissions
        ]);
        role_selected.value = null;
    }
   
});
watch(currentPage, (value) => {
    list();
})


onMounted(() => {
    list();
})

</script>