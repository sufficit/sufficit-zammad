// Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

import { ref } from 'vue'

const useSelectDialog = () => {
  const isOpen = ref(false)

  const setIsOpen = (value: boolean) => {
    isOpen.value = value
  }

  return {
    isOpen,
    setIsOpen,
  }
}

export default useSelectDialog
