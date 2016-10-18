import { flatten } from './common'
import { readFile } from './tools'
import { CheckStatus } from './store'

function readNodeConf(): Promise<string> { return readFile('./conf/nodes.json') }

function readMonitorConf(): Promise<string> { return readFile('./confi/monitors.json') }

export function readMonitorCode(monitor: Monitor): Promise<string> {
  if (monitor.category === 'oracle') {
    return readFile(`./conf/monitors/${name}.sql`)
  } else if (monitor.category === 'shell') {
    return readFile(`./conf/monitor/${name}.sh`)
  }
}

export interface Monitor {
  name: string
  category: string
  alert?: string
  title: string[]
}

export async function getMonitorConf(): Promise<Monitor[]> {
  const gmc = await readMonitorConf()
  return JSON.parse(gmc)
}

export interface Node {
  ip: string
  port: number
  title: string
  status: boolean
  databases: Database[]
}

export interface Database {
  ip?: string
  title?: string
  port: number
  status: boolean
  user?: string
  password?: string
  service: string
}

export async function getNodeConf(): Promise<Node[]> {
  let nodeConfStr: string = await readNodeConf()
  return JSON.parse(nodeConfStr)
}

export async function getDatabaseConf(): Promise<Database[]> {
  const nodeConfs: Node[] = await getNodeConf()
  const genDatabaseConf = function (node, db) {
    if (node.status) {
      return { ip: node.ip, port: db.port, service: db.service, status: db.status }
    } else {
      return { ip: node.ip, port: db.port, service: db.service, status: false }
    }
  }
  return flatten(nodeConfs.map(node => node.databases.map(db => genDatabaseConf(node, db))))
}