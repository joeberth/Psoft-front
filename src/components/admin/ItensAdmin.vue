<template>
    <div class="itens-admin">
        <b-form>
            <input id="produto-nome" type="hidden" v-model="produto.nome"/>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="produto-nome">
                        <b-form-input id="produto-nome" type="text" v-model="produto.nome" required :readonly="mode === 'remove'" 
                        placeholder="Informe o Nome do Produto..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="2">
                    <b-form-group label="Categoria:" label-for="produto-categoria">
                        <b-form-input id="produto-categoria" type="text" v-model="produto.categoria" required :readonly="mode === 'remove'" 
                        placeholder="Informe a Categoria do Produto..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="2">
                    <b-form-group label="Preço:" label-for="produto-preço">
                        <b-form-input id="produto-preco" type="text" v-model="produto.preco" required :readonly="mode === 'remove'" 
                        placeholder="Informe o Preço do Produto..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="2">
                    <b-form-group label="Situação:" label-for="produto-situacao">
                        <b-form-input id="produto-situacao" type="text" v-model="produto.situacao" required :readonly="mode === 'remove'" 
                        placeholder="Informe a Situação do Produto..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="2">
                    <b-form-group label="Codigo:" label-for="produto-codigo">
                        <b-form-input id="produto-codigo" type="text" v-model="produto.codigo" required :readonly="mode === 'remove'" 
                        placeholder="Informe o codigo do Produto..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="2">
                    <b-form-group label="fabricante:" label-for="produto-fabricante">
                        <b-form-input id="produto-fabricante" type="text" v-model="produto.fabricante" required :readonly="mode === 'remove'" 
                        placeholder="Informe o Fabricante do Produto..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        <b-table hover striped :items="produtos" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadProduto(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadProduto(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'

export default {
    nome:'ItensAdmin',
    data: function() {
        return {
            mode: 'save',
            produto: {},
            // produtos: [{nome: "pasta", codigo: "110", fabricante: "jj", situacao: "tem", categoria: "higiene", preco: "5,30"},
            //         {nome: "dorflex", codigo: "111", fabricante: "jj", situacao: "tem", categoria: "medicamento", preco: "66,30"},
            //         {nome: "cheetos", codigo: "112", fabricante: "jj", situacao: "tem", categoria: "alimentos" , preco: "0,30"}],
            fields: [
                { key: 'nome', label: 'Nome', sortable: true},
                { key: 'categoria', label: 'Categoria', sortable: true},
                { key: 'preco', label: 'Preço', sortable: true},
                { key: 'situacao', label: 'Situação', sortable: true},
                { key: 'actions', label: 'Ações'}

            ]
        }
    },
    methods: {
        getItens() {
            fetch('/prosutos2.json')
                .then(resp => resp.json())
                .then(data => this.produtos = data)
            // return this.produtos;

        },

        loadItens() {
            return this.produtos;
        },

        reset() {
            
            this.mode = 'save'
            this.produto = {}
            this.loadItens()
        },

        save() {
            var existe = false;
            Array.prototype.insert = function ( index, item ) {
                this.splice( index, 0, item );
            };

            var a = Number;
            this.produtos.forEach(element => { 
                if(element.codigo == this.produto.codigo){
                    existe = true;
                    a = this.produtos.indexOf(element);
                    this.produtos.splice(a, 1);
                }
            });
            if(!existe) {
                this.produtos.push(this.produto);
            } else {
               this.produtos.insert(a, this.produto)
            }
        
            this.reset();
        },

        remove() {
            this.produtos.forEach(element => { 
                if(element.codigo == this.produto.codigo){
                    this.produtos.splice(this.produtos.indexOf(element), 1);
                }
             });
            this.reset();

        },
        loadProduto(produto, mode = 'save') {
            this.mode = mode
            this.produto = { ...produto }
        }

    },
    mounted() {
        this.getItens()
        this.loadItens()
    }
}
</script>

<style>

</style>
