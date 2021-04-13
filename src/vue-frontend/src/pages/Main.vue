<template>
    <v-container>
        <WebsiteItemDialog :open.sync="openDetailDialog" :item="selectedItem"/>
        <v-row v-for="website in websites" :key="website.id">
            <v-col cols="12">
                <WebsiteItem @itemClick="handleItemClick" :item="website" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import WebsiteItem from '../components/WebsiteItem';
import WebsiteItemDialog from '../components/WebsiteItemDialog';
import endpoints from '../config/endpoints';
import axios from 'axios';

export default {
    data: () => ({
        openDetailDialog: false,
        selectedItem: {},
        websites: []
    }),
    components: {
        WebsiteItem,
        WebsiteItemDialog
    },
    methods: {
        handleItemClick(item) {
            this.selectedItem = item;
            this.openDetailDialog = true;
        }
    },
    mounted() {
        axios.get(endpoints.itemList)
        .then((res) => {
            this.websites = res.data.items;
        });
    }
}
</script>

<style scoped>

</style>