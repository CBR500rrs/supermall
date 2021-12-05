<template>
    <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
        <table v-for="(item , index) in paramInfo.sizes" :key="index" class="info-size">
            <tr v-for="(tr, rindex) in item" :key="rindex">
                <td v-for="(td ,dindex) in tr" :key="dindex" class="info-item">
                    {{td}}
                </td>
            </tr>
        </table>
        <table class="info-param">
            <tr v-for="(info, findex) in paramInfo.infos" :key="findex">
                <td class="param-key">{{info.key}}</td>
                <td class="param-value">{{info.value}}</td>
            </tr>
        </table>
        <div class="info-img" v-if="paramInfo.image.length !==0">
            <img :src="paramInfo.image" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name:'DetailParamInfo',
    props:{
        paramInfo:{
            type: Object,
            default(){
                return {}
            }
        }    
    }
}
</script>

<style scoped>
.param-info{
    padding: 20px  15px;
    font-size: 15px;
    border-bottom: 5px solid #f2f5f8;
}
.param-info table{
    /* padding: 5px 0; */
    width: 100%;
    border-collapse: collapse;
}
.param-info table tr{
    height: 42px;
}
.param-info table tr td{
    border-bottom:1px solid rgba(100, 100, 100, .1) ;
    /* text-align: center; */
}
.param-info .info-size tr td{
     width: 50px;
}

.param-key{
    width: 80px;
}
.info-param{
    border-top: 1px solid rgba(0,0,0,.1);
}
.param-value{
    color: #eb4868;
}
.info-img img{
    width: 100%;
}
</style>