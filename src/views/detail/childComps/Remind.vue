<template>
  <div class="remind" >
      <div class="container">
            <div class="header">
                {{ title }}
            </div>
            <div class="main">
                <slot></slot>
            </div>
            <div class="footer">
                <button @click="hideModal">取消</button>
                <button @click="submit">确认</button>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    name:'Remind',
    props: {
        show: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
    },
    methods: {
        hideModal() {
            this.$emit('hideModal')
        },

        submit() {
            this.$emit('submit')
        },
    }
}
</script>

<style scoped>
.remind {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 10;
}
.container {
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.header {
    height: 56px;
    background: #409EFF;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: move;
}
.footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 57px;
    border-top: 1px solid #ddd;
}
.footer button {
    width: 100px;
}
.main {
    padding: 15px 40px;
}
</style>