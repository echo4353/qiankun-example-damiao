// 注册全局数据 子应用
export default (store, props) => {
    // 如果 全局数据对象store不存在
    if(!store || !store.hasModule){
        return;
    }

    // 初始化state
    const initState = ( props && props.getGlobalState && props.getGlobalState() ) || { user: { name: '' } };

    // 将主应用的数据存储到子应用中，命名空间固定为 global
    if(!store.hasModule('global')){
        //定义一个全局VUEX模块 global
        const globalModule = {
            namespaced: true,
            state: initState,
            actions: {
                // 子应用 改变state 并且 改变 主应用的 数据 (通知)
                setGlobalState({ commit }, payload){
                    commit('setGlobalState',payload) // 修改子应用数据
                    commit('emitGlobalState',payload) // 同时通知主应用修改数据
                },
                // 初始化 用于mount 同步父应用的数据
                initGlobalState({ commit }, payload){
                    commit('setGlobalState',payload)
                }
            },
            mutations: {
                setGlobalState(state, payload){
                    state = Object.assign(state,payload);
                },
                // 通知主应用
                emitGlobalState(state){
                    if(props&&props.setGlobalState){
                        props.setGlobalState(state)
                    }
                }
            }
        }
        store.registerModule('global',globalModule); // 注册global
    }else{
        // 每次mount的时候 都需要同步一次主应用数据到本地vuex
        store.dispatch('global/initGlobalState',initState)
    }

}