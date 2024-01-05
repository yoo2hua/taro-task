/**
 * 创建任务页面
 */
import to from 'await-to-js'

import Spin from '@/components/spin'

import useBoolean from '@/hooks/utils/useBoolean'

import { showToast } from '@/utils/index'

import { TaskCreate } from '@/api/task'
import { TaskCreateRequest } from '@/api/task/type'

import { naviBack } from '@/routes/navigator.provider'
import { Button, Field, Form, FormItem, Stepper } from '@antmjs/vantui'

import styles from './index.module.less'

const CreateTask = () => {
  const formIt = Form.useForm()
  const [loading, { setTrue, setFalse }] = useBoolean(false)

  const submit = () => {
    console.log('提交')

    formIt.validateFields(async (errorMessage, fieldValues) => {
      if (errorMessage?.length) return
      const params = fieldValues as TaskCreateRequest
      setTrue()
      const [err, res] = await to(TaskCreate(params))
      setFalse()
      if (err) {
        console.log('🌊 ~ file: index.tsx:34 ~ formIt.validateFields ~ err:', err)
        showToast(err.message)
        return
      }
      showToast('创建成功')
      naviBack()
    })
  }

  return (
    <Spin spin={loading}>
      <div className={styles['create-task__page']}>
        <div className={styles['card']}>
          <Form form={formIt} className={styles['form']} initialValues={{}}>
            <FormItem
              name="title"
              required
              layout="vertical"
              label="标题"
              valueFormat={(e) => {
                return e.detail
              }}
              // trigger="onAfterRead"
              // validateTrigger="onAfterRead"
              trigger="onInput"
              validateTrigger="onBlur"
            >
              <Field clearable />
            </FormItem>
            <FormItem
              name="content"
              required
              layout="vertical"
              label="任务内容"
              valueFormat={(e) => e.detail}
              trigger="onInput"
              validateTrigger="onBlur"
            >
              <Field type="textarea" maxlength={500} clearable />
            </FormItem>
            <FormItem
              name="task_points"
              layout="vertical"
              label="任务积分"
              valueFormat={(e) => e.detail}
              trigger="onChange"
              validateTrigger="onChange"
            >
              <Stepper className={styles['stepper']} min={0} max={9999} value={1} step="1" />
            </FormItem>
          </Form>
          <Button className={styles['submit-button']} onClick={submit}>
            创建任务
          </Button>
        </div>
      </div>
    </Spin>
  )
}

export default CreateTask
