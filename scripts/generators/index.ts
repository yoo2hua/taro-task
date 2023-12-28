import path from 'path'
import { Plop, run } from 'plop'

// 创建 Plop 实例
Plop.prepare(
  {
    configPath: path.join(__dirname, './configs/index.ts'),
  },
  (env) => {
    return run(env, undefined, true)
  },
)
