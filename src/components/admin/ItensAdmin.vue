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
                    <b-form-group label="Preço:" label-for="produto-preço">
                        <b-form-input id="produto-preco" type="text" v-model="produto.preco" required :readonly="mode === 'remove'" 
                        placeholder="Informe o Preço do Produto..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="2">
                    <b-form-group label="Descrição:" label-for="produto-descricao">
                        <b-form-input id="produto-descricao" type="text" v-model="produto.descricao" required :readonly="mode === 'remove'" 
                        placeholder="Informe a Descrição do Produto..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="2">
                    <b-form-group label="Codigo:" label-for="produto-codigo">
                        <b-form-input id="produto-codigo" type="text" v-model="produto.codBarra" required :readonly="mode === 'remove'" 
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
            <b-row>
                <b-col md="3" sm="2">
                    <b-form-group label="Categoria:" label-for="produto-categoria">
                        <select id="tipos-produto" type="Dropdown Button" v-model="produto.tipo" required :readonly="mode === 'remove'">
                            <option v-for="option in tiposProduto" :key="option.text">{{option.text}}</option>
                        </select>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
            <b-button class="ml-2" @click.stop="avisaLote">Adicionar Lote</b-button>
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

const axios = require("axios");

function _isNew(produto, produtos){
    for (let x in produtos){
        if (x.codBarra == produto.codBarra){
            return true;
        }
    }
    return false; 
}

export default {
    nome:'ItensAdmin',
    data: function() {
        return {
            mode: 'save',
            produto: {},
            produtos: [],
            tiposProduto: [{text: "medicamento", id:1}, {text: "alimento", id:2}, {text: "higiene", id:3}, {text: "cosmetico", id:4}],
            fields: [
                { key: 'nome', label: 'Nome', sortable: true},
                { key: 'tipo', label: 'Categoria', sortable: true},
                { key: 'preco', label: 'Preço', sortable: true},
                { key: 'descricao', label: 'Descrição', sortable: true},
                { key: 'actions', label: 'Ações'}
            ]
        }
    },


    created(){
    },

    methods: {

        loadItens() {

            this.produtos = [];
            axios.get("https://farmacia-cg.herokuapp.com/produtos").then(res => {
                res.data.forEach((data) => {
                    this.produtos.push(data.produto);
                })
            });
        },

        reset() {
            
            this.mode = 'save'
            this.produto = {}
            this.produtos = []
            setTimeout(this.loadItens(), 1000)
        },

        avisaLote() {
             this.$emit('changeLote');
        },



        save() {
            if (_isNew(this.produto, this.produtos)){
                axios({
                    method: "put",
                    url: "https://farmacia-cg.herokuapp.com/produtos",
                    data: this.produto
                 }).then(() => {
                     alert("Cadastro realizado com sucesso")
                     this.reset();
                     });
            } else {
                axios({
                    method: "post",
                    url: "https://farmacia-cg.herokuapp.com/produtos/" + this.produto.codBarra,
                    data: this.produto
                 }).then(() => {
                         alert("Alteração realizada!")
                         this.reset();
                 });
            }
        },

        remove() {
            axios({
                method: 'DELETE',
                url: "https://farmacia-cg.herokuapp.com/produtos/" + this.produto.codBarra
            }).then(() => {
                         alert("Remoção realizada!")
                         this.reset();
                 });
        },
        
        loadProduto(produto, mode = 'save') {
            this.mode = mode
            this.produto = { ...produto }
        }

    },
    mounted() {
        this.loadItens()
    }
}
</script>

<style>

</style>
