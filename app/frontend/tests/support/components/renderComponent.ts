// Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

import { isRef, nextTick, Plugin, Ref, ref, watchEffect, unref } from 'vue'
import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from 'vue-router'
import { MountingOptions } from '@vue/test-utils'
import { Matcher, render, RenderResult } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { merge, cloneDeep } from 'lodash-es'
import { createTestingPinia } from '@pinia/testing'
import { plugin as formPlugin } from '@formkit/vue'
import { buildFormKitPluginConfig } from '@shared/form'
import CommonIcon from '@shared/components/CommonIcon/CommonIcon.vue'
import CommonLink from '@shared/components/CommonLink/CommonLink.vue'
import CommonDateTime from '@shared/components/CommonDateTime/CommonDateTime.vue'
import { i18n } from '@shared/i18n'
import buildIconsQueries from './iconQueries'
import buildLinksQueries from './linkQueries'
import { waitForNextTick } from '../utils'

// TODO: some things can be handled differently: https://test-utils.vuejs.org/api/#config-global

export interface ExtendedMountingOptions<Props> extends MountingOptions<Props> {
  router?: boolean
  routerRoutes?: RouteRecordRaw[]
  store?: boolean
  form?: boolean
  formField?: boolean
  unmount?: boolean
  vModel?: {
    [prop: string]: unknown
  }
}

type UserEvent = ReturnType<typeof userEvent['setup']>

interface PageEvents extends UserEvent {
  debounced(fn: () => unknown, ms?: number): Promise<void>
}

export interface ExtendedRenderResult extends RenderResult {
  events: PageEvents
  queryAllIconsByName(matcher: Matcher): SVGElement[]
  queryIconByName(matcher: Matcher): SVGElement | null
  getAllIconsByName(matcher: Matcher): SVGElement[]
  getIconByName(matcher: Matcher): SVGElement
  findAllIconsByName(matcher: Matcher): Promise<SVGElement[]>
  findIconByName(matcher: Matcher): Promise<SVGElement>
  getLinkFromElement(element: HTMLElement): HTMLAnchorElement
}

const plugins: (Plugin | [Plugin, ...unknown[]])[] = []

const defaultWrapperOptions: ExtendedMountingOptions<unknown> = {
  global: {
    components: {
      CommonIcon,
      CommonLink,
      CommonDateTime,
    },
    mocks: {
      i18n,
      $t: i18n.t.bind(i18n),
      __: (source: string) => source,
    },
    stubs: {},
    plugins,
  },
}

let routerInitialized = false
let router: Router

export const getRouter = () => router

const initializeRouter = (routes?: RouteRecordRaw[]) => {
  let localRoutes: RouteRecordRaw[] = [
    {
      name: 'Dashboard',
      path: '/',
      component: {
        template: 'Welcome to zammad.',
      },
    },
    {
      name: 'Example',
      path: '/example',
      component: {
        template: 'This is a example page.',
      },
    },
    {
      name: 'Error',
      path: '/:pathMatch(.*)*',
      component: {
        template: 'Error page',
      },
    },
  ]

  // Use only the default routes, if nothing was given.
  if (routes) {
    localRoutes = routes
  }

  router = createRouter({
    history: createWebHistory(),
    routes: localRoutes,
  })

  plugins.push(router)

  defaultWrapperOptions.global ||= {}
  defaultWrapperOptions.global.stubs ||= {}
  Object.assign(defaultWrapperOptions.global.stubs, {
    RouterLink: false,
  })

  routerInitialized = true
}

let storeInitialized = false

export const initializeStore = () => {
  if (storeInitialized) return
  plugins.push(createTestingPinia({ createSpy: vi.fn, stubActions: false }))
  storeInitialized = true
}

let formInitialized = false

const initializeForm = () => {
  // TODO: needs to be extended, when we have app specific plugins/fields
  plugins.push([formPlugin, buildFormKitPluginConfig()])
  defaultWrapperOptions.shallow = false

  formInitialized = true
}

const wrappers = new Set<[ExtendedMountingOptions<any>, ExtendedRenderResult]>()

afterEach(() => {
  wrappers.forEach((wrapper) => {
    const [{ unmount = true }, view] = wrapper

    if (unmount) {
      view.unmount()
      wrappers.delete(wrapper)
    }
  })
})

const renderComponent = <Props>(
  component: any,
  wrapperOptions: ExtendedMountingOptions<Props> = {},
): ExtendedRenderResult => {
  // Store and Router needs only to be initalized once for a test suit.
  if (wrapperOptions?.router && !routerInitialized) {
    initializeRouter(wrapperOptions?.routerRoutes)
  }
  if (wrapperOptions?.store && !storeInitialized) {
    initializeStore()
  }
  if (wrapperOptions?.form && !formInitialized) {
    initializeForm()
  }

  if (wrapperOptions?.form && wrapperOptions?.formField) {
    defaultWrapperOptions.props ||= {}

    // Reset the defult of 20ms for testing.
    defaultWrapperOptions.props.delay = 0
  }

  const vModelProps: [string, Ref][] = []
  const vModelOptions = Object.entries(wrapperOptions?.vModel || {})

  for (const [prop, propDefault] of vModelOptions) {
    const reactiveValue = isRef(propDefault) ? propDefault : ref(propDefault)
    const props = (wrapperOptions.props ?? {}) as Record<string, unknown>
    props[prop] = unref(propDefault)
    props[`onUpdate:${prop}`] = (value: unknown) => {
      reactiveValue.value = value
    }

    vModelProps.push([prop, reactiveValue])

    wrapperOptions.props = props as Props
  }

  const localWrapperOptions: ExtendedMountingOptions<Props> = merge(
    cloneDeep(defaultWrapperOptions),
    wrapperOptions,
  )

  // @testing-library consoles a warning, if these options are present
  delete localWrapperOptions.router
  delete localWrapperOptions.store

  const view = render(component, localWrapperOptions) as ExtendedRenderResult

  const events = userEvent.setup({
    advanceTimers(delay) {
      try {
        vi.advanceTimersByTime(delay)
        // eslint-disable-next-line no-empty
      } catch {}
    },
  })

  view.events = {
    ...events,
    async debounced(cb, ms) {
      vi.useFakeTimers()

      await cb()

      if (ms) {
        vi.advanceTimersByTime(ms)
      } else {
        vi.runAllTimers()
      }

      vi.useRealTimers()

      await waitForNextTick()
      await nextTick()
    },
  }

  Object.assign(view, buildIconsQueries(view.container as HTMLElement))
  Object.assign(view, buildLinksQueries(view.container as HTMLElement))

  wrappers.add([localWrapperOptions, view])

  if (vModelProps.length) {
    watchEffect(() => {
      const propsValues = vModelProps.reduce((acc, [prop, reactiveValue]) => {
        acc[prop] = reactiveValue.value
        return acc
      }, {} as Record<string, unknown>)

      view.rerender(propsValues)
    })
  }

  return view
}

export default renderComponent
