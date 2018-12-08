<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
            sub="Cadastros & Cia" />
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Itens" active>
                        <ItensAdmin/>
                    </b-tab>
                    <b-tab title="Lotes">
                        <LotesAdmin/>
                    </b-tab>
                    <b-tab title="Vendas">
                        <VendasAdmin/>
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


export default {
    name: 'AdminPages',
    components: { PageTitle, ItensAdmin, LotesAdmin, VendasAdmin }
}
</script>

<style>

</style>
