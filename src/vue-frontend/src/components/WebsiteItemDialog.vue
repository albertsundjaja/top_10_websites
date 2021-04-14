<template>
    <v-dialog
        v-model="openDialog"
        scrollable>
        <v-card class="pa-5">
            <div class="d-flex justify-end">
                <v-btn plain @click="close">Close</v-btn>
            </div>
            <v-card-title>{{item.title}}</v-card-title>
            <v-card-text>
                <p>{{item.description}}</p>
                <div class="d-flex justify-center">
                    <youtube v-if="item.asset && item.asset.type == 'youtube'" class="text-center" :video-id="getVideoId(item.asset.url)"></youtube>
                    <v-img v-if="item.asset && item.asset.type == 'image'" max-width="70%"  :src="item.asset.url" />
                </div>
                <div v-if="similarItems.length > 0" class="d-flex flex-column">
                    <h4>Recommended for you</h4>
                    <div class="d-flex justify-space-between">
                        <div class="ma-2 w-30" v-for="sItem in similarItems" :key="sItem.id">
                            <WebsiteItem class="h-100" :item="sItem" @itemClick="propagateItemClick(sItem)"/>
                        </div>
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import WebsiteItem from "./WebsiteItem";
import { getIdFromURL } from 'vue-youtube-embed';
import endpoints from '../config/endpoints';
import axios from 'axios';

export default {
    data: () => ({
        similarItems: []
    }),
    props: {
        open: Boolean,
        item: Object
    },
    computed: {
        openDialog: {
            get: function() { return this.open },
            set: function(val) { this.$emit("update:open", val) }
        }
    },
    components: {
        WebsiteItem
    },
    methods: {
        getVideoId(url) {
            return getIdFromURL(url);
        },
        close() {
            console.log(this.item);
            this.$emit('update:open', false);
        },
        getSimilarItems() {
            axios.get(`${endpoints.similarItem}?id=${this.item.id}`)
            .then((res) => {
                this.similarItems = res.data.items;
            })
            .catch(() => {
                // on error display nothing
                this.similarItems = [];
            })
        },
        propagateItemClick(item) {
            this.$emit("update:item", item);
        }
    },
    watch: {
        item: {
            deep: true,
            handler() {
                this.getSimilarItems();
            }
        }
    }
}
</script>

<style scoped>
.w-30 {
    width: 30%;
}

.h-100 {
    height: 100%;
}
</style>