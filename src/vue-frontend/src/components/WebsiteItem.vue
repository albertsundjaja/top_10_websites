<template>
    <v-card @click="onClickItem(item)">
        <v-card-title>{{item.title}}</v-card-title>
        <v-card-text>
            <p>{{item.description}}</p>
        </v-card-text>
    </v-card>
</template>

<script>

export default {
    props: {
        item: Object
    },
    methods: {
        onClickItem(item) {
            this.$emit("itemClick", item);
        }
    }
}
</script>

<style scoped>

</style>