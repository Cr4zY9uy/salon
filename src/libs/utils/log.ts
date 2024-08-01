import { format } from 'date-fns'
import * as fs from 'fs/promises'
import * as path from 'path'
import { v4 as uuidv4 } from 'uuid'

const fileLog = path.join(process.cwd(), 'src/libs/logs', 'logs.log')

export const logger = async (message: string) => {
  const dateTimeError = `${format(new Date(), 'yyyy/MM/dd HH:mm:ss')}`
  const idError = uuidv4()
  const formatMessage = `${dateTimeError}-------${idError}-------${message}\n`

  try {
    await fs.mkdir(path.dirname(fileLog), { recursive: true })
    await fs.appendFile(fileLog, formatMessage)
  } catch (error) {
    console.error('Error writing to log file:', error)
  }
}
