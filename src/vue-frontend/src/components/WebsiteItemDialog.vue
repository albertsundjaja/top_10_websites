<template>
    <v-dialog
        v-model="open"
        scrollable>
        <v-card class="pa-5">
            <div class="d-flex justify-end">
                <v-btn plain @click="close">Close</v-btn>
            </div>
            <v-card-title>{{item.title}}</v-card-title>
            <v-card-text>
                <p>{{item.description}}</p>
            </v-card-text>
            <div class="d-flex justify-center">
                <youtube v-if="item.asset && item.asset.type == 'youtube'" class="text-center" :video-id="getVideoId(item.asset.url)"></youtube>
                <v-img max-width="70%" v-if="item.asset && item.asset.type == 'image'" :lazy-src="item.asset.url"></v-img>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
import { getIdFromURL } from 'vue-youtube-embed';

export default {
    props: {
        open: Boolean,
        item: Object
    },
    methods: {
        getVideoId(url) {
            return getIdFromURL(url);
        },
        close() {
            this.$emit('update:open', false);
        }
    }
}
</script>

<style scoped>

</style>