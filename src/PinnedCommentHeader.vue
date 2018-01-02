<template>
  <transition name="fade">
    <div v-if="pinnedCommentId" class="pinned-comment-header" :style="{backgroundColor}">
      <span>{{i18next.t('WfPinnedComment.pinned_comment')}}</span>
      <img src="https://image.flaticon.com/icons/svg/545/545330.svg">
    </div>
  </transition>
</template>
<script>
export default {
  name: 'pinned-comment-header',
  props: ['bus'],
  data () {
    return {
      pinnedCommentId: null
    }
  },
  computed: {
    i18next () { return this.bus.i18next },
    backgroundColor () { return this.bus.pluginOptions.WfPinnedComment.backgroundColor || 'rgba(0, 0, 0, 0.03)' }
  },
  created () {
    this.bus.listenTo('WfPinnedComment.pinnedCommentId', pinnedCommentId => {
      this.pinnedCommentId = pinnedCommentId
    }, this._uid)
  },
  beforeDestroy () {
    this.bus.enough('WfPinnedComment.pinnedCommentId', null, this._uid)
  }
}
</script>
<style scoped>
.pinned-comment-header { display: flex; justify-content: flex-end; padding: 4px 0 0 0; height: 22px; width: 100%; color: #9ea7b4; font-size: 14px; font-weight: 500; }
.pinned-comment-header span { margin-right: 8px; }
.pinned-comment-header img { width: 18px; height: 18px; }
.fade-enter-active, .fade-leave-active { transition: opacity .5s }
.fade-enter { opacity: 0 }
.fade-enter-to { opacity: 1 }
</style>
