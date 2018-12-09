<template>
    <div class="promocoes-admin">
        <b-form>
            <input id="promocao-nome" type="hidden" v-model="promocao.categoria"/>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Categoria:" label-for="promocao-categoria">
                        <b-form-input id="promocao-categoria" type="text" v-model="promocao.categoria" required :readonly="mode === 'remove'" 
                        placeholder="Informe a categoria do produto..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="2">
                    <b-form-group label="Data início:" label-for="promocao-di">
                        <b-form-input id="promocao-di" type="text" v-model="promocao.di" required :readonly="mode === 'remove'" 
                        placeholder="Informe a data inicial da promocao..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="2">
                    <b-form-group label="Data Final:" label-for="promocao-df">
                        <b-form-input id="promocao-df" type="text" v-model="promocao.df" required :readonly="mode === 'remove'" 
                        placeholder="Informe a data final da promocao..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="2">
                    <b-form-group label="Tipo de desconto" label-for="promocao-tipos">
                        <select id="promocao-tipos" type="Dropdown Button" v-model="tipo" required :readonly="mode === 'remove'">
                            <option v-for="option in tipos" :key="option.text">{{option.text}}</option>
                        </select>
                    </b-form-group>
                </b-col>


            </b-row>
            <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        <b-table hover striped :items="promocoes" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadPromocao(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadPromocao(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'



export default {
    nome:'PromocoesAdmin',
    
    data: function() {
        return {
            mode: 'save',
            tipo: "Sem desconto",
            tipos:[{text: "Sem desconto", id:1}, {text: "Bom desconto", id:2}, {text: "Ótimo desconto", id:3}, {text: "Super Desconto", id:4}],
            promocao: {},
            promocoes: [{categoria: "medicamentos", di: "01/02/2019", df: "01/02/2019", tipos: "Sem Desconto"},
                    {categoria: "medicamentos", di: "01/02/2019", df: "01/02/2019", tipos: "Sem Desconto"},
                    {categoria: "medicamentos", di: "01/02/2019", df: "01/02/2019", tipos: "Sem Desconto"}],
            fields: [
                { key: 'categoria', label: 'Categoria', sortable: true},
                { key: 'di', label: 'Data Inicial', sortable: true},
                { key: 'df', label: 'Data Final', sortable: true},
                { key: 'tipos', label: 'Tipo de desconto', sortable: true},
                { key: 'actions', label: 'Ações'}

            ]
        }
    },
    methods: {
        loadPromocoes() {
            return this.promocoes;

        },

        reset() {
            this.mode = 'save'
            this.promocao = {}
            this.loadPromocoes()
        },

        save() {
            var existe = false;
            Array.prototype.insert = function ( index, item ) {
                this.splice( index, 0, item );
            };

            var a = Number;
            this.promocoes.forEach(element => { 
                if(element.categoria == this.promocao.categoria){
                    existe = true;
                    a = this.promocoes.indexOf(element);
                    this.promocoes.splice(a, 1);
                }
            });
            if(!existe) {
                this.promocoes.push(this.promocao);
            } else {
               this.promocoes.insert(a, this.promocao)
            }
        
            this.reset();
        },

        remove() {
            this.promocoes.forEach(element => { 
                if(element.categoria == this.promocao.categoria){
                    this.promocoes.splice(this.promocoes.indexOf(element), 1);
                }
             });
            this.reset();

        },
        loadPromocao(promocao, mode = 'save') {
            this.mode = mode
            this.promocao = { ...promocao }
        }

    },
    mounted() {
        this.loadPromocoes()
    }
}
</script>

<style>

</style>
