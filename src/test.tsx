import { computed, defineComponent } from "vue";
import { ElDialog, ElButton } from "element-plus";
import style11 from './index.module.css'
export default defineComponent({
  emits: ["update:visible", "cancel",'confirm'],
  props: {
    visible: Boolean,
    title: String,
    
  },
  setup(props, { emit }) {
    const dialogVisible = computed<boolean>({
      get() {
        return props.visible;
      },
      set(visible) {
        console.log('assss',props,visible,);
        emit("update:visible", visible);
        if (!visible) {
       
          emit("cancel");
       
        }
      },
    });
    const suus = () => {
      console.log('confirm')
      emit('confirm')
    }
    return () => (
      <div class={[style11['dialog-overlay']]} >
         <div class={[style11['container']]}  >
        <div class={[style11.title]}>
        { props.title}
        </div>
        <span>This is a message</span>
        <div style='display:flex;'>
            <button onClick={() => {
              console.log('cancelcancel')
              emit('cancel')
            }}>取消</button>
            <button onClick={suus}>确认</button>
        </div>
      </div>
      </div>
     
    );
    // return () => (
    //   <ElDialog
    //     modelValue={dialogVisible.value}
    //     onUpdate:modelValue={val => (dialogVisible.value = val)}
    //     title={props.title}
    //     width="30%"
    //   >
    //     {{
    //       default: () => <span>This is a message</span>,
    //       footer: () => (
    //         <div>
    //           <ElButton onClick={() => (dialogVisible.value = false)}>
    //             Cancel
    //           </ElButton>
    //           <ElButton
    //             type="primary"
    //             onClick={() => (dialogVisible.value = false)}
    //           >
    //             Confirm
    //           </ElButton>
    //         </div>
    //       ),
    //     }}
    //   </ElDialog>
    // );
  },
});
