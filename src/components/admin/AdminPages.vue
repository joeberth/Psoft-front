<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
            sub="Cadastros & Cia" />
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card v-model="tabIndex">
                    <b-tab class="itens" title="Itens" active>            
                    </b-tab>
                    <ItensAdmin @changeLote="changeLote"></ItensAdmin>
                    
                    
                    <b-tab  class="lotes" title="Lotes">
                        <LotesAdmin/>
                    </b-tab>
                    <b-tab title="Vendas">
                        <VendasAdmin/>
                    </b-tab>
                    <b-tab title="Promoçoes">
                        <promocoesAdmin/>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import ItensAdmin from './ItensAdmin'
import LotesAdmin from './LotesAdmin'
import VendasAdmin from './VendasAdmin'
import PromocoesAdmin from './PromocoesAdmin'


export default {
    name: 'AdminPages',
    data: function() {
       return {tabIndex: 0};
    },

    components: { PageTitle, ItensAdmin, LotesAdmin, VendasAdmin, PromocoesAdmin },
    methods: {
        changeLote() {
            this.tabIndex = 1;
           
        }
    }
}
</script>

<style>

</style>
