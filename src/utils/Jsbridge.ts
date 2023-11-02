const $ua = navigator.userAgent
export const isAndroid = $ua.indexOf('Android') > -1 && $ua.indexOf('AgentWeb') > -1
export const isiOS = /(iPhone|iPad|iPod|iOS)/i.test($ua)
export const JsBridge = (
  method: string | number,
  params?: any,
  callback?: () => any
): string | void => {
  if (isAndroid) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.zhiu[method]) {
      if (params) {
        const { isBool } = params
        // 单个参数
        const $param = Object.values(params)

        const _param = isBool ? params.bool : $param[0]
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.zhiu[method](_param)
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return window.zhiu[method]()
      }
    }
  } else if (isiOS) {
    // handlerInterface由iOS addScriptMessageHandler与andorid addJavascriptInterface 代码注入而来。
    // var dic = {'handlerInterface':handlerInterface,'function':handlerMethod,'parameters': parameters};
    // window.webkit.messageHandlers[method].postMessage('')
    // return window.webkit.messageHandlers.reloadIosData.postMessage({})
    if (window.webkit?.messageHandlers.iosZhiu) {
      const iosMethod = { methodName: method, data: params }
      window.webkit.messageHandlers.iosZhiu.postMessage(JSON.stringify(iosMethod))
    }
  } else {
    // 否则是H5页面
    callback && callback()
  }
}
// js调APP方法 多个参数
export const callHandler = (method: string | number, params?: any, callback?: () => any): any => {
  if (isAndroid) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.zhiu[method]) {
      if (params) {
        const $param = Object.values(params)
        // console.warn('$param==============>', $param.length, $param)
        switch ($param.length) {
          case 1:
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.zhiu[method]($param[0])
            break
          case 2:
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.zhiu[method]($param[0], $param[1])
            break
          case 3:
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.zhiu[method]($param[0], $param[1], $param[2])
            break
          case 6:
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.zhiu[method]($param[0], $param[1], $param[2], $param[3], $param[4], $param[5])
            break
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.zhiu[method]()
      }
    }
  } else if (isiOS) {
    if (window.webkit?.messageHandlers.iosZhiu) {
      const iosMethod = { methodName: method, data: params }
      window.webkit.messageHandlers.iosZhiu.postMessage(JSON.stringify(iosMethod))
    }
  } else {
    // 否则是H5页面
    callback && callback()
  }
}

// export default {
// // js调APP方法 （参数分别为:app提供的方法名  传给app的数据  回调）
// callHandler (name, data, callback) {
//   setupWebViewJavascriptBridge((bridge) => {
//     bridge.callHandler(name, data, callback)
//   })
// },
// // APP调js方法 （参数分别为:js提供的方法名 回调）
// registerHandler (name, callback) {
//   setupWebViewJavascriptBridge((bridge) => {
//     bridge.registerHandler(name, (data, responseCallback) => {
//       callback(data, responseCallback)
//     })
//   })
// }
// }
