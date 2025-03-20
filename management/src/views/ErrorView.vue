<template>
    <div class="error">
        <div class="container">
            <div class="topLeft">
                <img loading="lazy" src="../assets/icon/404.svg" alt="Error">
            </div>
            <div class="bottomRight">
                <div class="box">
                    <p class="title">网络错误</p>
                    <p class="desc">你来到无人问津的荒漠</p>
                </div>
                <el-button size="large" type="primary">返回首页</el-button>
            </div>
        </div>
        <div class="copyright">
            Copyright© 2025 SouthAki, All Rights Reserved. | 
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.error{
    width: 100dvw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'zk';
    position: relative;
    .copyright{
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        font-size: .1rem;

    }
    .container{
        width: 60%;
        height: 60%;
        display: flex;

        .topLeft{
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .bottomRight{
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            flex-direction: column;
            .box{
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                .title{
                    font-size: .3rem;
                    font-weight: bold;
                }
                .desc{
                    font-size: .1rem;
                    letter-spacing: .1rem;
                    color: #ccc;
                    margin-top: .1rem;
                }
            }
        }
    }
}
</style>