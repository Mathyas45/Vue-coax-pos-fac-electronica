<template>
    <DefaultLayout>
        <b-row class="justify-content-center">
            <b-col cols="12">
                <b-card>
                    <b-card-header>
                        <b-row class="align-items-center justify-content-between">
                            <b-col lg="3">
                                <b-card-title>🧮 Configuraciones</b-card-title>
                            </b-col>
                        </b-row>
                    </b-card-header>

                    <b-card-body class="pt-0">
                        <b-row>
                            <b-col lg="6">
                                <label for="fullname-client" class="col-form-label text-lg-end">Razon Social: </label>
                                <b-form-input
                                    type="text"
                                    id="fullname-client"
                                    v-model="razon_social"
                                    placeholder="Example: Laravest Sac"
                                />
                            </b-col>
                            <b-col lg="6">
                                <label for="razon_social_comercial-client" class="col-form-label text-lg-end">Razon Social Comercial: </label>
                                <b-form-input
                                    type="text"
                                    id="razon_social_comercial-client"
                                    v-model="razon_social_comercial"
                                    placeholder="Example: Laravest"
                                />
                            </b-col>

                            <b-col lg="4">
                                <label for="email-client" class="col-form-label text-lg-end">Email: </label>
                                <b-form-input
                                    type="text"
                                    id="email-client"
                                    v-model="email"
                                    placeholder="Example: laravest@gmail.com"
                                />
                            </b-col>

                            <b-col lg="4">
                                <label for="phone-client" class="col-form-label text-lg-end">Telefono: </label>
                                <b-form-input
                                    type="number"
                                    id="phone-client"
                                    v-model="phone"
                                    placeholder="Example: 999999999"
                                />
                            </b-col>

                            <b-col lg="4">
                                <label for="type-document-client" class="col-form-label text-lg-end">Tipo de documento: </label>
                                <select id="type_document_list_company">
                                    <option value="RUC">RUC</option>
                                </select>
                            </b-col>

                            <b-col lg="4">
                                <label for="n_document-client" class="col-form-label text-lg-end">N° de Documento: </label>
                                <b-form-input
                                    type="number"
                                    id="n_document-client"
                                    v-model="n_document"
                                    placeholder="Example: ######"
                                />
                            </b-col>

                            <b-col lg="4">
                                <label for="birth_date-client-company" class="col-form-label text-lg-end">Fecha de Aniversario: </label>
                                <b-form-input
                                    type="date"
                                    id="birth_date_client-company"
                                    v-model="birth_date"
                                    placeholder="Example: 2011-08-19"
                                />
                            </b-col>

                            
                            <b-col lg="5">
                                <label for="address-client" class="col-form-label text-lg-end">Dirección: </label>
                                <b-form-input
                                    type="text"
                                    id="address-client"
                                    v-model="address"
                                    placeholder="Example: Psje Lt 18"
                                />
                            </b-col>

                            <b-col lg="5">
                                <label for="urbanizacion-client" class="col-form-label text-lg-end">Urbanización: </label>
                                <b-form-input
                                    type="text"
                                    id="urbanizacion-client"
                                    v-model="urbanizacion"
                                    placeholder="Example: *****"
                                />
                            </b-col>

                            <b-col lg="2">
                                <label for="cod_local-client" class="col-form-label text-lg-end">Codigo Local: </label>
                                <b-form-input
                                    type="text"
                                    id="cod_local-client"
                                    v-model="cod_local"
                                    placeholder="Example: ####"
                                />
                            </b-col>

                            <b-col lg="4">
                                <label for="region-client" class="col-form-label text-lg-end">Región: </label>
                                
                            </b-col>
            
                            <b-col lg="4">
                                <label for="provincia-client" class="col-form-label text-lg-end">Provincia: </label>
                                
                            </b-col>
            
                            <b-col lg="4">
                                <label for="distrito-client" class="col-form-label text-lg-end">Distrito: </label>
                                
                            </b-col>

                            <b-col lg="12" class="mt-3">
                                <div class="modal-footer">
                                    <b-button
                                        type="button"
                                        variant="secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Cerrar
                                    </b-button>
                                    <b-button type="button" variant="primary" @click="store" class="mx-3">
                                    {{ company_selected ? 'Editar' : 'Guardar' }}
                                    </b-button>
                                </div>
                            </b-col>
                        </b-row>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
</DefaultLayout>
</template>
<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import REGIONES from '../clients/json/regiones.json'
import PROVINCIAS from '../clients/json/provincias.json'
import DISTRITOS from '../clients/json/distritos.json'

import HttpClient from "@/helpers/http-client";
import type { AxiosResponse } from "axios";

import type { UbigeoClient } from "@/types/clients";
import { onMounted, ref } from "vue";

import Swal from "sweetalert2/dist/sweetalert2.js";
type TVueSwalInstance = typeof Swal & typeof Swal.fire;
import Selectr from "mobius1-selectr";
import type { Company, CompanyResponse } from "@/types/company";

const REGIONES_L = REGIONES;
const PROVINCIAS_L = PROVINCIAS;
const DISTRITOS_L = DISTRITOS;

const PROVINCIA_SELECTS = ref<UbigeoClient[]>([]);
const DISTRITO_SELECTS = ref<UbigeoClient[]>([]);

const razon_social = ref<string>("");
const razon_social_comercial = ref<string>("");
const email = ref<string>("");
const phone = ref<number>();
const type_document = ref<string>("DNI");
const n_document = ref<string>();
const address = ref<string>("");
const urbanizacion = ref<string>("");
const cod_local = ref<string>("");
const ubigeo_region = ref<string>("");
const ubigeo_provincia = ref<string>("");
const ubigeo_distrito = ref<string>("");
const region = ref<string>("");
const provincia = ref<string>("");
const distrito = ref<string>("");

const birth_date = ref<Date | string>();

const error = ref("");
const type_document_list_company = ref<any>(null);
const region_list = ref<any>(null);
const provincia_list = ref<any>(null);
const distrito_list = ref<any>(null);

const company_selected = ref<Company | undefined>();

const show = async () => {
  try {
    const res: AxiosResponse<CompanyResponse> = await HttpClient.get("company");
    console.log(res);
    company_selected.value = res.data.company;

    razon_social.value = company_selected.value?.razon_social ?? '';
    razon_social_comercial.value = company_selected.value?.razon_social_comercial ?? '';
    email.value = company_selected.value?.email ?? '';
    phone.value = company_selected.value?.phone;
    n_document.value = company_selected.value?.n_document;
    birth_date.value = company_selected.value?.birth_date;
    address.value = company_selected.value?.address ?? '';
    urbanizacion.value = company_selected.value?.urbanizacion ?? '';
    cod_local.value = company_selected.value?.cod_local ?? '';

  } catch (e: any) {
    console.log(e);
    if (e.response?.data?.error) {
      if (error.value.length == 0) error.value = e.response?.data?.error;
    }
  }
};

const store = async () => {
    
    ubigeo_region.value = region_list.value.getValue();
    ubigeo_provincia.value = provincia_list.value.getValue();
    ubigeo_distrito.value = distrito_list.value.getValue();

    type_document.value = type_document_list_company.value.getValue();
    if(!razon_social.value){
        message_text.value = "Necesitas digitar la razon social del cliente";
        return;
    }

    if(!phone.value){
        message_text.value = "Necesitas digitar un telefono del usuario";
        return;
    }

    if(!email.value){
        message_text.value = "Necesitas digitar el correo del cliente";
        return;
    }

    if(!n_document.value){
        message_text.value = "Necesitas digitar un numero de documento del cliente";
        return;
    }

    if(!birth_date.value){
        message_text.value = "Necesitas seleccionar una fecha para el cliente";
        return;
    }

    if(!address.value){
        message_text.value = "Necesitas una dirección para el cliente";
        return;
    }

    if(!ubigeo_region.value){
        message_text.value = "Necesitas una región para el cliente";
        return;
    }
    if(!ubigeo_provincia.value){
        message_text.value = "Necesitas una provincia para el cliente";
        return;
    }
    if(!ubigeo_distrito.value){
        message_text.value = "Necesitas un distrito para el cliente";
        return;
    }

    let REGION_SELECTED = REGIONES_L.find((region) => region.id == ubigeo_region.value);
    if(REGION_SELECTED){
        region.value = REGION_SELECTED.name;
    }
    let PROVINCIA_SELECTED = PROVINCIAS_L.find((provincia) => provincia.id == ubigeo_provincia.value);
    if(PROVINCIA_SELECTED){
        provincia.value = PROVINCIA_SELECTED.name;
    }
    let DISTRITO_SELECTED = DISTRITOS_L.find((distrito) => distrito.id == ubigeo_distrito.value);
    if(DISTRITO_SELECTED){
        distrito.value = DISTRITO_SELECTED.name;
    }

    let data = {
        razon_social: razon_social.value,
        razon_social_comercial: razon_social_comercial.value,
        email: email.value,
        phone: phone.value,
        type_document: type_document.value,
        n_document: n_document.value,
        address: address.value,
        birth_date: birth_date.value,
        ubigeo_region: ubigeo_region.value,
        ubigeo_provincia: ubigeo_provincia.value,
        ubigeo_distrito: ubigeo_distrito.value,
        region: region.value,
        provincia: provincia.value,
        distrito: distrito.value,
        urbanizacion:urbanizacion.value,
        cod_local:cod_local.value,
    }

    try {

      const res: AxiosResponse<any> = await HttpClient.post(
        "company",
        data,
      );
      
      console.log(res);
      if (res.data.message == 403) {
        message_text.value = res.data.message_text;
      }else{
        success_alert.value = true;
      }
    } catch (e: any) {
      console.log(e);
      if (e.response?.data?.error) {
        if (error.value.length == 0) error.value = e.response?.data?.error;
      }
    }
}

onMounted(() => {
    show();
})
</script>