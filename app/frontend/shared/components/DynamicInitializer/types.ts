// Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

import { Component } from 'vue'

export interface PushComponentData {
  name: string
  id: string
  cmp: Component
  props: Record<string, unknown>
}

export interface DestroyComponentData {
  name: string
  id?: string
}
