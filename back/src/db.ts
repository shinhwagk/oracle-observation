import * as oracledb from 'oracledb';

interface DatabaseConnectInfo {
  ip: string
  port: number
  service: string
  user: string
  password: string
}

function genConnecString(dci: DatabaseConnectInfo): string {
  return `${dci.ip}:${dci.port}/${dci.service}`
}
export async function genConnection(dci: DatabaseConnectInfo): Promise<oracledb.IConnection> {
  return oracledb.getConnection(
    {
      user: dci.user,
      password: dci.password,
      connectString: genConnecString(dci)
    })
}

export async function fff(dci: DatabaseConnectInfo, sql: string) {
  const conn: oracledb.IConnection = await genConnection(dci)
  const result: oracledb.IExecuteReturn = await conn.execute(sql)
  const colname: string[] = result.metaData.map(e => e.name)
  const rows = result.rows
  const close = await conn.close()
  return [rows].concat([result.rows])
}