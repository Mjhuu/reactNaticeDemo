export interface kindInterface {
  title: string
  svg: Document
  path: string
}

export type kindListType = Array<kindInterface>

export interface StateInterface {
  userInfo: object,
  tabBarShow: boolean
}
