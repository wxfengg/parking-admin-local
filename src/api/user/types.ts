/** 登录请求参数 */
export interface LoginDto {
  /** 账号 */
  account: string
  /** 密码 */
  password: string
  /** 验证码 */
  code: string
}

/** 登录信息接口数据 */
export interface UserProfileVo {
  id?: string
  /** 账号 */
  accountName?: string
  /** 姓名 */
  nickname?: string
  /** 性别 */
  sex?: string
  /** 电子邮箱 */
  email?: string
  /** 手机号 */
  phone?: string
  /** 头像附件ID */
  portraitAttachmentId?: string
  /** 头像URL */
  portraitUrl?: string
  /** 账号状态 */
  state?: string
  /** 创建时间 */
  createTime?: string
  /** 创建人ID */
  creatorId?: string
  /** 更新时间 */
  updateTime?: string
  /** 更新人ID */
  updaterId?: string
  /** 最后登录时间 */
  lastLoginTime?: string
  /** 角色ID列表 */
  roles?: string[]
  /** 角色详细信息列表 */
  userRoles?: userRole[]
  /** 权限标识列表 */
  perms?: string[]
}
interface userRole {
  /** 用户ID */
  userId: string
  /** 角色ID */
  roleId: string
  /** 角色名称 */
  roleName: string
}
