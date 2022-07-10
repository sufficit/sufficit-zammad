// Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

import type { App } from 'vue'
import type { Router, RouteRecordRaw } from 'vue-router'

export type InitializeAppRouter = (app: App) => Router

export interface RoutesModule {
  isMainRoute: boolean
  default: Array<RouteRecordRaw> | RouteRecordRaw
}

export interface RouteRecordMeta {
  title?: string
  requiresAuth: boolean
  requiredPermission: Maybe<Array<string>>
  hasBottomNavigation?: boolean
  hasHeader?: boolean
  level?: number
}

export type Link = string | Partial<RouteRecordRaw>
