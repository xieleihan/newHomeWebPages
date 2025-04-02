<template>
    <div class="userFeedback">
        <div class="left"></div>
        <div class="right"></div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.userFeedback{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    .left,
    .right{
        height: 100%;
    }
    .left{
        width: 18%;
        border-right: 1px solid #ccc;
    }
    .right{
        width: 82%;
    }
}
</style>