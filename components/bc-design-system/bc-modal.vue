<script setup lang="ts">
const $emit = defineEmits([ 'close' ]);
const props = defineProps({
  open: Boolean,
  hasHeader: { type: Boolean, default: true },
  hasFooter: { type: Boolean, default: true },
});

const enum ModalClickEl {
  OVERLAY = 1,
  MODAL = 2,
};

const onClick = (el: ModalClickEl) => {
  if (el === ModalClickEl.OVERLAY) $emit('close');
};
</script>

<template>
  <div
    v-if="props.open"
    class="fixed top-0 left-0 h-full w-full opacity-60 bg-black"
    data-bcId="modal-overlay"
  />
  <div
    v-if="open"
    class="fixed top-0 left-0 h-full w-full flex justify-center align-center"
    @click="onClick(ModalClickEl.OVERLAY)"
  >
    <div class="relative h-4/5 lg:h-3/5 w-4/5 lg:w-1/2 m-auto bg-slate-200 text-slate-900 opacity-100" @click.stop="onClick(ModalClickEl.MODAL)">
      <div
        v-if="props.hasHeader"
        class="h-12 bg-sky-900 text-slate-200 text-2xl font-semibold px-4 py-2 w-full absolute top-0 flex justify-between align-center"
      >
        <slot name="header">
          Header
        </slot>
        <button @click="$emit('close')" class="cursor-pointer flex-shrink-0 flex-grow-0">X</button>
      </div>
      <div class="px-4 py-14 max-h-full overflow-y-auto">
        <slot name="body">
          Body
        </slot>
      </div>
      <div v-if="props.hasFooter" class="h-12 bg-slate-600 px-4 py-2 w-full absolute bottom-0">
        <slot name="foot">
          Foot
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>