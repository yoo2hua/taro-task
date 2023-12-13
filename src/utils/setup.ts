import store from '@/store'
import { userThunks } from '@/store/modules/user'

export default async function setup() {
  store.dispatch(userThunks.login()).then(() => {

  })
}
