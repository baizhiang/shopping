<template>
    <div>
        <div class="container">
            <ul>
                <li v-for="item in carList" :key="item.id">
                    <!-- <van-checkbox-group v-model="result"  ref="checkboxGroup"> -->
                    <van-cell-group>
                            <van-cell>
                                <!-- 用标题插槽自定义 -->
                                <template #title>
                                    <!-- checkbox @change监听checkbox的状态改变 回调参数为checked -->
                                    <van-checkbox v-model="item.isChecked" shape="square" @change="checkedChange($event, item.id)">
                                        <span class="custom-title">{{ item.title }}{{ item.price }}</span>
                                    </van-checkbox>
                                </template>
                                <van-stepper v-model="item.num" min="0" :max="item.storage" @minus="decrease(item.id)" 
                                @plus="increase(item.id)" @change="changeNum($event, item.id)"/>
                            </van-cell>
                    
                    </van-cell-group>
                    <!-- </van-checkbox-group> -->
                </li>
            </ul>
        </div>
    
        <van-cell-group class="bottom-cellgroup">
            <van-cell>
                <template #title>
                    <van-checkbox shape="square" v-model="allChecked">
                        <span class="custom-title">全选</span>
                    </van-checkbox>
                </template>
                <!-- 自定义单元格右侧内容 -->
                <template #default>
                    <span>总价:{{ totalPrice }}</span>
                </template>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';
    export default {
        data() {
            return {
                // result: [],
            }
        },
        computed: {
            ...mapState(['carList']),
            ...mapGetters(['totalPrice']),

            //设置全选
            allChecked: {
                get() {
                    //不加这个if有bug 一打开页面全选是勾选上的
                    if (this.carList.length == 0) {
                        return false;
                    }
                    return this.carList.every(el => el.isChecked);
                },
                set(val) {
                    this.carList.forEach(el => el.isChecked = val);
                }
            }
            // ...mapGetters(['allChecked'])
        },
        methods: {
            //当checked状态改变时 carList里相对应的item checked也跟着改变
            checkedChange(isTrue, id) {
                console.log(isTrue);
                var params = {
                    isTrue: isTrue,
                    id: id
                };
                this.$store.commit('checkedChange', params);
            },
            //点击减少按钮
            decrease(id) {
                this.$store.commit('decrease', id);
            },
            //点击增加按钮
            increase(id) {
                this.$store.commit("increase", id);
            },
            //当输入框数量改变时
            changeNum(value, id) {
                var params = {
                    value: value,
                    id: id
                }
                this.$store.commit('changeNum', params);
            }
        }

    }
</script>

<style lang="scss" scoped>
    .container{
        height: 566px;
    }
</style>