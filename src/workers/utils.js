function defHandle(port) {
  return ({ data }) => {
    port.postMessage(`${data}`)
  }
}

export function initWorkerMessagePort(scope, tmp, getHandle=defHandle) {
  scope.onmessage = ({ports}) => {
    if (!tmp.messagePort) {
      tmp.messagePort = ports[0]
      scope.onmessage = null
      tmp.messagePort.onmessage = getHandle(tmp.messagePort)
    }
  }
}

export function getMessagePort(worker) {
  const channel = new MessageChannel
  worker.postMessage(null, [channel.port1])
  return channel
}
