<template>
    <v-container>
        <WebsiteItemDialog :open.sync="openDetailDialog" :item="selectedItem"/>
        <v-row class="mt-5">
            <v-col cols="12">
                <v-text-field outlined placeholder="Enter keyword to search" v-model="searchKeyword" @input="debounceSearchItem" :loading="searchLoading"/>
                <small v-if="showError" class="red--text">There is an error with getting data from server.</small>
            </v-col>
        </v-row>
        <v-row v-if="websites.length < 1">
            <v-col cols="12">
                <h2>No item found</h2>
            </v-col>
        </v-row>
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
import _ from 'lodash';

export default {
    data: () => ({
        openDetailDialog: false,
        selectedItem: {},
        websites: [],
        searchKeyword: '',
        searchLoading: false,
        showError: false
    }),
    components: {
        WebsiteItem,
        WebsiteItemDialog
    },
    methods: {
        handleItemClick(item) {
            // handle on click item to open detail dialog
            this.selectedItem = item;
            this.openDetailDialog = true;
        },
        debounceSearchItem: _.debounce(function() {
            // debouncer to search for item
            this.searchItem();
        }, 500),
        searchItem() {
            // search for item, if keyword is blank get the top 10 instead
            if (this.searchKeyword) {
                this.searchLoading = true;
                this.showError = false;

                axios.get(`${endpoints.searchItem}?keyword=${this.searchKeyword}`)
                .then((res) => {
                    this.websites = res.data.items;
                })
                .catch(() => {
                    this.showError = true;
                })
                .finally(() => {
                    this.searchLoading = false;
                })
            }
            else {
                this.getItemList();
            }
        },
        getItemList() {
            // get top 10 websites
            this.searchLoading = true;
            this.showError = false;

            axios.get(endpoints.itemList)
            .then((res) => {
                this.websites = res.data.items;
            })
            .catch(() => {
                this.showError = true;
            })
            .finally(() => {
                this.searchLoading = false;
            });
        }
    },
    mounted() {
        this.getItemList();
    }
}
</script>

<style scoped>

</style>