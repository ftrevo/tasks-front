/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ChangeTaskStatusInboundSchema {
  /** @exclusiveMin 0 */
  id: number
  status: boolean
  field: 'frozen' | 'done'
}

export interface ChangeTaskStatusOutboundSchema {
  /** @exclusiveMin 0 */
  id: number
  status: boolean
  field: 'frozen' | 'done'
}

export interface CreateSubTaskInboundSchema {
  /** @minLength 1 */
  name: string
  /**
   * @min 0
   * @max 2147483647
   */
  price?: number
  /** @min 0 */
  taskId: number
}

export interface CreateSubTaskOutboundSchema {
  /** @exclusiveMin 0 */
  id: number
  /** @minLength 1 */
  name: string
  /** @min 0 */
  price?: number | null
  createdAt: string
  updatedAt: string
  user: {
    /** @minLength 1 */
    name: string
    /** @exclusiveMin 0 */
    id: number
  }
  /** @min 0 */
  taskId: number
}

export interface CreateTaskInboundSchema {
  /** @minLength 1 */
  name: string
  /**
   * @min 0
   * @max 2147483647
   */
  price?: number
}

export interface CreateTaskOutboundSchema {
  /** @exclusiveMin 0 */
  id: number
  done: boolean
  frozen: boolean
  /** @minLength 1 */
  name: string
  /** @min 0 */
  price?: number | null
  createdAt: string
  updatedAt: string
  user: {
    /** @minLength 1 */
    name: string
    /** @exclusiveMin 0 */
    id: number
  }
}

export type JoinRoomInboundSchema = string

export interface JoinTaskDetailsRoomOutboundSchema {
  /** @exclusiveMin 0 */
  id: number
  /** @minLength 1 */
  name: string
  /** @min 0 */
  price?: number | null
  updatedAt: string
  user: {
    /** @minLength 1 */
    name: string
    /** @exclusiveMin 0 */
    id: number
  }
  frozen: boolean
  done: boolean
  subTasks: {
    /** @exclusiveMin 0 */
    id: number
    /** @minLength 1 */
    name: string
    /** @min 0 */
    price?: number | null
    updatedAt: string
    user: {
      /** @minLength 1 */
      name: string
      /** @exclusiveMin 0 */
      id: number
    }
  }[]
}

export type JoinTasksRoomOutboundSchema = Record<
  string,
  {
    /** @exclusiveMin 0 */
    id: number
    /** @minLength 1 */
    name: string
    /** @min 0 */
    price?: number | null
    updatedAt: string
    user: {
      /** @minLength 1 */
      name: string
      /** @exclusiveMin 0 */
      id: number
    }
    done: boolean
    frozen: boolean
    subTasksPrice?: number | null
  }
>

export interface ListTasksInboundSchema {
  text?: string
}

export type ListTasksOutboundSchema = Record<
  string,
  {
    /** @exclusiveMin 0 */
    id: number
    /** @minLength 1 */
    name: string
    /** @min 0 */
    price?: number | null
    updatedAt: string
    user: {
      /** @minLength 1 */
      name: string
    }
    done: boolean
    frozen: boolean
    subTasksPrice?: number | null
  }
>

export interface LoginCreatePayload {
  /** @format email */
  email: string
  /** @minLength 5 */
  password: string
}

export interface LoginCreateData {
  token: string
  /** @min 0 */
  id: number
  /** @minLength 1 */
  name: string
}

export interface GetRootData {
  status: 'ok'
}

export interface UserCreatePayload {
  /** @minLength 1 */
  name: string
  /** @format email */
  email: string
  /** @minLength 5 */
  password: string
}

export interface UserCreateData {
  token: string
  /** @min 0 */
  id: number
  /** @minLength 1 */
  name: string
}

export interface ResetPasswordPartialUpdatePayload {
  /** @format email */
  email: string
}

export type ResetPasswordPartialUpdateData = any

export interface ChangePasswordPartialUpdatePayload {
  /** @format email */
  email: string
  resetCode: string
  /** @minLength 5 */
  password: string
}

export interface ChangePasswordPartialUpdateData {
  token: string
  /** @min 0 */
  id: number
  /** @minLength 1 */
  name: string
}
