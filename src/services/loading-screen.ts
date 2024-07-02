import { ElLoading } from 'element-plus'

let loadingInstance = null

export const ShowLoadingScreen = () => {
  loadingInstance = ElLoading.service({
    lock: true,
    background: 'rgba(255, 255, 255, 0.5)'
  })
}

export const CloseLoadingScreen = () => {
  if (loadingInstance) {
    loadingInstance.close()
    loadingInstance = null
  }
}
