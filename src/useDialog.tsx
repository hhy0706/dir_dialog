// https://blog.csdn.net/guizi0809/article/details/136026095
// https://juejin.cn/post/7253062314306322491
import { type AppContext, type Component, type ComponentPublicInstance, createApp, createVNode, getCurrentInstance, h, render, type VNode } from 'vue';

export interface Options {
  visible?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
  appendTo?: HTMLElement | string;
  [key: string]: unknown;
}

export interface CommandComponent {
  (options: Options): VNode;
  close: () => void;
}

const getAppendToElement = (props: Options): HTMLElement => {
  let appendTo: HTMLElement | null = document.body;
  if (props.appendTo) {
    if (typeof props.appendTo === 'string') {
      appendTo = document.querySelector<HTMLElement>(props.appendTo);
    }
    if (props.appendTo instanceof HTMLElement) {
      appendTo = props.appendTo;
    }
    if (!(appendTo instanceof HTMLElement)) {
      appendTo = document.body;
    }
  }
  return appendTo;
};

const initInstance = <T extends Component>(
  Component: T,
  props: Options,
  container: HTMLElement,
  appContext: AppContext | null = null
) => {
  const closeModal = () => {
    render(null, container);
    container.parentNode?.removeChild(container);
  };
    // 确定
    const onConfirm = async () => {
      await props.onConfirm?.()
      closeModal()
     
  }
  
  // 取消
  const onCancel = async () => {
      await props.onCancel?.()
      closeModal()
     
  }
  const vNode = h(Component, {...props,onConfirm,onCancel});
  console.log(11111111,props)
  vNode.appContext = appContext;
  render(vNode, container);

  getAppendToElement(props).appendChild(container);
  return vNode;
};

export const useCommandComponent = <T extends Component>(Component: T): CommandComponent => {
  const appContext = getCurrentInstance()?.appContext;
  // 补丁：Component中获取当前组件树的provides
  if (appContext) {
    const currentProvides = (getCurrentInstance() as any)?.provides;
    Reflect.set(appContext, 'provides', {...appContext.provides, ...currentProvides});
  }

  const container = document.createElement('div');


  const CommandComponent = (options: Options): VNode => {
    if (!Reflect.has(options, 'visible')) {
      options.visible = true;
    }
    // if (typeof options.onClose !== 'function') {
    //   options.onClose = close;
    // } else {
    //   const originOnClose = options.onClose;
    //   options.onClose = () => {
    //     originOnClose();
    //     close();
    //   };
    // }
    const vNode = initInstance<T>(Component, options, container, appContext);
    // const vm = vNode.component?.proxy as ComponentPublicInstance<Options>;
    // for (const prop in options) {
    //   if (Reflect.has(options, prop) && !Reflect.has(vm.$props, prop)) {
      
    //     vm[prop as keyof ComponentPublicInstance] = options[prop];
       
    //   }
    // }
    return vNode;
  };

  CommandComponent.close = close;

  return CommandComponent;
};
export const useMyDialog =(t: Component,option:any) => {
  const divDom = document.createElement('div');
  document.body.appendChild(divDom);
  return new Promise((resolve,reject) => {
    const closeModal = () => {
      render(null, divDom)
      document.body.removeChild(divDom)
  }
  
  // 确定
  const onConfirm = async () => {
      await option.onConfirm?.()
      closeModal()
      resolve(undefined)
  }
  
  // 取消
  const onCancel = async () => {
      await option.onCancel?.()
      closeModal()
      resolve(undefined)
  }
  const vNode = h(t, {
    ...option,
    onConfirm,
    onCancel,
})
render(vNode, divDom)
    // const app = createApp(divDom);
    // console.log(1111111111,app)
    // app.mount(divDom);
  })
}
export default useCommandComponent;
